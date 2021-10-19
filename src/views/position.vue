<template>
  <div class="main-page">
    <div class="opt-div">
      <!-- 功能按钮 -->
      <div class="move-group">
        <el-button
          type="primary"
          icon="el-icon-back"
          size="mini"
          @click="goWeek('prv')"
        >上一周</el-button>
        <el-button
          type="primary"
          icon="el-icon-right"
          size="mini"
          @click="goWeek('next')"
        >下一周</el-button>
        <el-button
          style="width:60px;"
          size="mini"
          type="danger"
          @click="reloadPage"
        >刷新</el-button>
      </div>
      <div class="btn-group">
        <el-input-number
          v-model="animSec"
          :min="1"
          :max="99"
          size="mini"
          style="width:100px;margin-top:5px;"
        ></el-input-number>
        <el-button
          type="primary"
          style="width:100px;margin-top:5px;"
          size="mini"
          @click="goWeek('start')"
        >回起点</el-button>
        <el-button
          type="primary"
          style="width:100px;margin-top:5px;"
          size="mini"
          @click="goWeek('point')"
        >去指定周</el-button>
        <el-button
          type="primary"
          style="width:100px;margin-top:5px;"
          size="mini"
          :disabled="saveDisabled"
          @click="commitChanges"
        >保存更改</el-button>
      </div>
      <el-radio-group
        v-model="dataType"
        size="mini"
        style="margin-top:5px;"
        @change="changeDataType"
      >
        <el-radio-button label="mock">mock数据</el-radio-button>
        <el-radio-button label="real">动态数据</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 分辨率 -->
    <div class="cur-num cur-resolving">
      <div class="mr5">screen：{{win.width}} * {{win.height}}</div>
    </div>
    <!-- 网格信息 -->
    <div class="cur-num cur-grid">
      <div class="mr5">gird：{{gird.width}} * {{Math.floor(gird.height)}}</div>
    </div>
    <!-- 指示器 -->
    <div
      class="cur-num"
      v-if="graph"
    >
      <div class="mr5">zoom：{{graph.getZoom().toFixed(2)}}</div>
      <div>当前周：{{curWeek}}</div>
    </div>
    <!-- 部门竖线 -->
    <div
      class="dep-line"
      :style="{height:canvas.height+'px'}"
    />
    <!-- 泳道横线 -->
    <div
      v-for="(item,index) in dep_num"
      :key="'yd_'+index"
      class="line"
      :style="{top:((canvas.height/dep_num)*(index+1))+'px'}"
    />
    <!-- 部门名称 -->
    <div
      v-for="(item,index) in dep_num"
      :key="index"
      class="dep-name"
      :style="{height:(canvas.height/dep_num)+'px',top:(canvas.height/dep_num * index)+'px'}"
      @click="depClick(index+1)"
    >部门:{{index+1}}</div>
    <!-- 时间轴 -->
    <div
      class="timeBar-area"
      :style="{height:timeBarHei+'px',top:(win.height-timeBarHei)+'px'}"
    >
      <el-slider
        v-model="curTime"
        :min="1"
        :max="200"
        :step="1"
        :format-tooltip="formatTooltip"
        :marks="timeBarMarks"
        :show-stops="false"
        class="time-bar"
        @change="changeSilder"
      />
    </div>
    <!-- 画布 -->
    <div id="canvasDiv"></div>
    <!-- 弹框 -->
    <el-dialog
      title="添加批注"
      :visible.sync="addMarkShow"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="mark-main">
        <div class="each-line">
          <div class="title">批注内容1：</div>
          <div class="content">
            <el-input
              size="mini"
              v-model="markObj.con1"
              placeholder="请输入批注内容"
            ></el-input>
          </div>
        </div>
        <div class="each-line">
          <div class="title">批注内容2：</div>
          <div class="content">
            <el-input
              size="mini"
              v-model="markObj.con2"
              placeholder="请输入批注内容"
            ></el-input>
          </div>
        </div>
        <div class="each-line">
          <div class="title">批注内容3：</div>
          <div class="content">
            <el-input
              size="mini"
              v-model="markObj.con3"
              placeholder="请输入批注内容"
            ></el-input>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="addMarkShow = false"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="commitMark"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import G6 from '@antv/g6'
import insertCss from 'insert-css'
// eslint-disable-next-line no-unused-vars
import loading from '../utils/loading'
import tooTipHTML from '../data/tooTip'
import custNode from '../data/newNode/cust_node'
import testData from '../mock/testData'
import innerCss from '../data/insertCss'

import { getUpdateNodesPositionList, getNewEdgesList } from '../utils/common'
import { getMainData } from '../api/api'
insertCss(innerCss)
let _that = null

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {},
  data () {
    return {
      win: { height: 0, width: 0 },//window对象
      canvas: { height: 0, width: 0 },//画布对象
      sourceData: {},//数据源
      graph: null,//graph全局对象
      lineType: 'polyline',//线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: '#bababa',//线条颜色
      lineThick: 2,//线条粗细
      toolTip: '',//提示框内容
      toolBar: null,//工具栏
      minimap: null,//小地图
      rightMenu: null,//右键菜单
      //-------------------
      start_x: 100,//起始点X
      node_wid: 150,//单个节点宽度
      node_hei: 50,//单个节点高度
      node_pad: 5,//节点间隔
      node_eachLineNum: 4,//一行显示节点数量
      curOptNode: null,//当前操作的节点
      dataType: 'mock',//数据形式
      dep_num: 7,//部门数量
      //网格
      gird: { width: 0, height: 0 },//网格基本信息
      //时间轴
      timeBar: null,//时间轴
      timeBarData: [],//时间轴数据
      timeBarHei: 40,//时间轴高度
      curTime: 10,//时间轴当前时间
      timeBarMarks: { 10: '', },//时间轴标注
      animSec: 1,//移动动画时长
      curWeek: 1,//当前显示周
      //批注
      addMarkShow: false,//添加批注弹框显示标识
      markObj: { con1: '', con2: '', con3: '' },//批注内容对象
      //节点移动、连线
      saveDisabled: true,//保存标识
      nodeMoveList: [],//节点移动数据集
      addEdgesList: [],//新增连线数据集
    }
  },
  computed: {},
  mounted () {
    this.initWindow()
    this.sourceData = this.initData(testData({ height: this.canvas.height, width: this.canvas.height, way: this.dep_num }))
    this.initG6()
  },
  methods: {
    /**
     * 请求全局数据yarn 
     */
    async requestMainData () {
      const responseData = await getMainData()
      console.log(responseData)
    },
    /**
     * 初始化G6
     */
    async initG6 () {
      const snapLine = new G6.SnapLine()
      G6.Util.processParallelEdges(this.sourceData.edges, 80, 'quadratic', 'polyline', 'loop')
      this.graph = new G6.Graph({
        container: 'canvasDiv',
        width: this.canvas.width,
        height: this.canvas.height,
        groupByTypes: true,
        fitView: false,
        fitViewPadding: 0,
        fitCenter: false,
        linkCenter: false,
        animate: true,
        enabledStack: true,
        renderer: 'canvas',
        modes: {
          default: ['brush-select', 'shortcuts-call', 'drag-node',
            { type: 'create-edge', trigger: 'click', key: 'shift' },
            { type: 'drag-canvas', direction: 'x', },
            { type: 'scroll-canvas', direction: 'x', }
          ],//'drag-canvas', 'drag-node','zoom-canvas', 'drag-node'
        },
        plugins: [this.toolTip, this.rightMenu, this.toolBar, snapLine],
        //默认节点设置
        defaultNode: {
          size: [150, 50],
          color: '#000',
          style: {
            cursor: 'pointer',
            lineWidth: 3,
          }
        },
        //默认连线设置
        defaultEdge: {
          color: this.lineColor,
          type: this.lineType,//（quadratic-二阶贝塞尔曲线；cubic-三阶贝塞尔曲线）
          labelCfg: {
            autoRotate: true,
            refY: -10,
          },
          style: {
            cursor: 'pointer',
            lineWidth: this.lineThick,
            color: this.lineColor,
            endArrow: true
          },
        },
        nodeStateStyles: {
          highlight: {
            opacity: 1.0,
          },
          dark: {
            opacity: 0.2,
          },
        },
        edgeStateStyles: {
          highlight: {
            lineWidth: 3,
            stroke: '#999',
          },
        },
      })
      this.graph.data(this.sourceData)
      this.graph.render()
      this.graph.zoomTo(1.0)
      //监听：节点单击
      this.graph.on('node:click', function (e) {
        const item = e.item
        console.log(e)
        console.log('点击node:{' + item._cfg.model.id + ' , ' + item._cfg.model.label + '|' + item._cfg.model.x + ',' + item._cfg.model.y + '}')
        if (item._cfg.model.method === 'line') { return }
        //---高亮---
        _that.graph.setAutoPaint(false)
        _that.graph.getNodes().forEach(function (node) {
          _that.graph.clearItemStates(node)
          _that.graph.setItemState(node, 'dark', true)
        })
        _that.graph.setItemState(item, 'dark', false)
        _that.graph.setItemState(item, 'highlight', true)
        //递归节点
        _that.filtNodeAndEdge(_that.graph, item)
        _that.graph.paint()
        _that.graph.setAutoPaint(true)
      })
      //监听：canvas点击
      this.graph.on('canvas:click', () => {
        _that.clearAllStats()
      })
      //监听：节点拖拽完成
      this.graph.on('node:dragend', (e) => {
        const modelItem = {
          id: e.item._cfg.model.id,
          x: e.item._cfg.model.x,
          y: e.item._cfg.model.y,
        }
        console.log('node拖拽完成:', modelItem)
        _that.nodeMoveList = getUpdateNodesPositionList(_that.nodeMoveList, modelItem)
        _that.saveDisabled = ((_that.addEdgesList.length === 0) && (_that.nodeMoveList.length === 0))
      })
      //监听：增加连线
      this.graph.on('aftercreateedge', (e) => {
        const curEdge = {
          source: e.edge._cfg.source._cfg.model.id,
          target: e.edge._cfg.target._cfg.model.id
        }
        console.log('增加连线:', curEdge)
        _that.addEdgesList = getNewEdgesList(_that.addEdgesList, curEdge)
        const edges = _that.graph.save().edges;
        G6.Util.processParallelEdges(edges, 80, 'quadratic', 'polyline', 'loop');
        _that.graph.getEdges().forEach((edge, i) => {
          _that.graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition,
          })
        })
        _that.saveDisabled = ((_that.addEdgesList.length === 0) && (_that.nodeMoveList.length === 0))
      })
    },
    filtNodeAndEdge (graph, item) {
      graph.getEdges().forEach(function (edge) {
        if (edge.getSource() === item) {
          graph.setItemState(edge.getTarget(), 'dark', false)
          graph.setItemState(edge.getTarget(), 'highlight', true)
          graph.setItemState(edge, 'highlight', true)
          edge.toFront()
        } else if (edge.getTarget() === item) {
          graph.setItemState(edge.getSource(), 'dark', false)
          graph.setItemState(edge.getSource(), 'highlight', true)
          graph.setItemState(edge, 'highlight', true)
          edge.toFront()
        } else {
          graph.setItemState(edge, 'highlight', false)
        }
      })
    },
    /**
     * 初始化右键菜单
     */
    initMenu () {
      this.rightMenu = new G6.Menu({
        getContent () {
          return `
          <div class="left-menu">
            <button class="btn btn-small submit bounce-left" fnname="addMark">添加批注</button>
            <button class="btn btn-small submit bounce-left" fnname="method_2">功能2</button>
            <button class="btn btn-small submit bounce-left" fnname="method_3">功能3</button>
          </div>`;
        },
        handleMenuClick: (target, item) => {
          // console.log(target, item)
          _that.curOptNode = item
          console.log('curOptNode:', _that.curOptNode)
          switch (target.getAttribute('fnname')) {
            case 'addMark': //添加批注
              _that.addMarkShow = true
              break
            case 'method_2':
              break
            case 'method_3':
              break
            case 'method_4':
              break
            default:
              break
          }
        },
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: -30,
        // 在哪些类型的元素上响应
        itemTypes: ['node'],
      })
    },
    /**
     * 初始化小地图
     */
    initMiniMap () {
      this.minimap = new G6.Minimap({
        size: [250, 150],
      });
    },
    /**
     * 初始化工具栏
     */
    initToolBar () {
      this.toolBar = new G6.ToolBar({
        position: { x: _that.win.width - 84, y: 10 },
      });
    },
    /**
     * 初始化tooltip
     */
    initToolTip () {
      this.toolTip = new G6.Tooltip({
        offsetX: 0,
        offsetY: 0,
        fixToNode: [1, 0.5],
        // 允许出现 tooltip 的 item 类型
        itemTypes: ['node', 'edge'],
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          outDiv.style.height = 'fit-content'
          const model = e.item.getModel()
          if (e.item.getType() === 'node') {
            if (model.method === 'line') {
              //标示线节点
              outDiv.innerHTML = model.label
            } else {
              //普通节点
              outDiv.innerHTML = tooTipHTML
            }
          } else {
            const source = e.item.getSource()
            const target = e.item.getTarget()
            outDiv.innerHTML = `来源：${source.getModel().label}<br/>去向：${target.getModel().label}`
          }
          return outDiv
        },
      })
    },
    /**
     * 清空焦点高亮
     */
    clearAllStats () {
      const that = this
      that.graph.setAutoPaint(false)
      that.graph.getNodes().forEach(function (node) {
        that.graph.clearItemStates(node)
      })
      that.graph.getEdges().forEach(function (edge) {
        that.graph.clearItemStates(edge)
      })
      that.graph.paint()
      that.graph.setAutoPaint(true)
    },
    /**
     * 数据形式改变
     */
    changeDataType (val) {
      this.dataType = val
      if (this.dataType === 'mock') {
        this.sourceData = this.initData(testData({ height: this.canvas.height, width: this.canvas.height, way: this.dep_num }))
        this.graph.changeData(this.sourceData)
      } else {
        this.requestMainData()
      }
    },

    /**
     * 初始化节点
     */
    initData (data) {
      data.nodes.forEach((element) => {
        if (element.id <= 20) {
          element.type = 'custNode_task'
        }
        if ((element.id > 20) && (element.id <= 99)) {
          element.type = 'custNode_chat'
        }
        if (element.method === 'line') {
          element.type = 'custNode_line'
        }
        if (element.method === 'mark') {
          element.type = 'custNode_mark'
        }
      })
      console.log('【当前数据】', data)
      //初始化silder-mark
      for (let i = 1; i <= 200; i++) {
        if (i % 10 === 0) {
          _that.timeBarMarks[i] = '2020-' + i
        }
      }
      console.log('timeBarMarks:', _that.timeBarMarks)
      console.log('【当前数据】', data)
      return data
    },
    /**
     * 初始化自定义节点
     */
    initJsxNode () {
      //自定义节点
      G6.registerNode('custNode_task', {
        jsx: custNode.task_node,
      })
      G6.registerNode('custNode_chat', {
        jsx: custNode.chat_node,
      })
      G6.registerNode('custNode_mark', {
        jsx: custNode.mark_node,
      })
      G6.registerNode('custNode_line', {
        jsx: custNode.line_node,
      })
    },
    /**
     * 部门点击过滤
     */
    depClick (depId) {
      this.graph.setAutoPaint(false)
      this.graph.getNodes().forEach(function (node) {
        _that.graph.clearItemStates(node)
        _that.graph.setItemState(node, 'dark', true)
        const depid = node._cfg.model.dep
        if (depid === depId) {
          //部门高亮
          _that.graph.setItemState(node, 'highlight', true)
        }
      })
      this.graph.paint()
      this.graph.setAutoPaint(true)
    },
    /**
     * 切换周
     */
    changeSilder (val) {
      if ((val > 10) && (val <= 20)) {
        this.moveTo(720)
      } else if ((val > 20) && (val <= 30)) {
        this.moveTo(1320)
      } else if ((val > 30) && (val <= 40)) {
        this.moveTo(1920)
      } else if ((val > 40) && (val <= 50)) {
        this.moveTo(2520)
      } else if ((val > 50) && (val <= 60)) {
        this.moveTo(3120)
      } else if ((val > 60) && (val <= 70)) {
        this.moveTo(3720)
      } else if ((val > 70) && (val <= 80)) {
        this.moveTo(4320)
      } else {
        this.moveTo(4920)
      }
    },
    /**
     * 周移动
     */
    goWeek (pos) {
      switch (pos) {
        case 'prv'://上一周
          if (this.curWeek === 1) {
            this.$message({
              message: '没有更多上周数据',
              type: 'warning'
            })
          } else {
            this.curWeek = this.curWeek - 1
            if (this.curWeek === 1) {
              this.moveTo(95)
            } else {
              this.moveTo(100 + 20 + (150 * ((this.curWeek - 1) * 4)) - 5)
            }
            this.$message({ message: `第${this.curWeek}周`, })
          }
          break
        case 'next'://下一周
          this.curWeek = this.curWeek + 1
          this.moveTo(100 + 20 + (150 * ((this.curWeek - 1) * 4)) - 2)
          this.$message({ message: `第${this.curWeek}周` })
          break
        case 'start'://回起点
          this.moveTo(95)
          break
        case 'point'://去指定周
          this.moveTo(2515)
          break
        default:
          break;
      }
    },
    /**
     * 移动到指定点(横坐标)
     */
    moveTo (x) {
      this.graph.moveTo(0 - (x - 170), 0, true, {
        duration: (_that.animSec * 1000)
      })
    },
    /**
     * 时间轴格式化提示
     */
    formatTooltip (val) {
      let str = ''
      if (val) {
        str = '2020年第' + val + '周'
      }
      return str
    },
    /**
     * 添加批注提交
     */
    commitMark () {
      const cur = this.curOptNode._cfg.model
      const model = {
        id: '902' + (Math.floor(Math.random() * (99999 - 1)) + 1),
        label: '批注',
        method: 'mark',
        x: cur.x + this.node_wid + 5,
        y: cur.y + this.node_hei / 2,
        type: 'custNode_mark',
      }
      this.graph.addItem('node', model)
      this.addMarkShow = false
    },
    /**
     * 提交修改节点信息
     */
    commitChanges () {
      console.log('节点移动数据集:', this.nodeMoveList)
      console.log('新增连线数据集:', this.addEdgesList)
    },
    /**
     * 初始化窗口
     */
    initWindow () {
      _that = this
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10

      // this.win.height = this.win.height + (this.win.height)

      this.canvas.width = this.win.width
      this.canvas.height = this.win.height - this.timeBarHei
      console.log('winWid:' + this.win.width + ',winHei:' + this.win.height)
      console.log('CanvasWid:' + this.canvas.width + ',CanvasHei:' + this.canvas.height)
      this.initMenu()
      this.initToolBar()
      this.initMiniMap()
      this.initToolTip()
      this.initJsxNode()
      this.gird.width = this.start_x + this.node_wid * this.node_eachLineNum + this.node_pad * (this.node_eachLineNum + 1)
      this.gird.height = this.canvas.height / this.dep_num
    },
    /**
     * 刷新页面
     */
    reloadPage () { location.reload() }
  }
}
</script>
<style lang='less'>
@import "./main.less";
@import "../assets/css/btn.css";
</style>
