<template>
  <div class="main-page">
    <div class="opt-div">
      <!-- 功能按钮 -->
      <div class="move-group">
        <el-button
          type="primary"
          icon="el-icon-back"
          size="mini"
          @click="moveCanvas('left')"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-right"
          size="mini"
          @click="moveCanvas('right')"
        ></el-button>
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
          style="width:100px;"
        ></el-input-number>
        <el-button
          type="primary"
          style="width:100px;margin-top:5px;"
          size="mini"
          @click="moveCanvas('start')"
        >回起点</el-button>
        <el-button
          type="primary"
          style="width:100px;margin-top:5px;"
          size="mini"
          @click="moveCanvas('point')"
        >去指定点</el-button>
      </div>
    </div>
    <div
      class="cur-num"
      v-if="graph"
    >
      <div>zoom：{{graph.getZoom().toFixed(2)}}</div>
    </div>
    <!-- 部门竖线 -->
    <div
      class="dep-line"
      :style="{height:win.height+'px'}"
    />
    <!-- 泳道横线 -->
    <div
      v-for="(item,index) in dep_num"
      :key="'yd_'+index"
      class="line"
      :style="{top:((win.height/dep_num)*(index+1))+'px'}"
    />
    <!-- 部门名称 -->
    <div
      v-for="(item,index) in dep_num"
      :key="index"
      class="dep-name"
      :style="{height:(win.height/dep_num)+'px',top:(win.height/dep_num * index)+'px'}"
      @click="depClick(index+1)"
    >部门:{{index+1}}</div>
    <!-- 时间轴 -->
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
    <!-- 画布 -->
    <div id="canvasDiv"></div>
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
insertCss(innerCss)
let _that = null

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {},
  data () {
    return {
      //window对象
      win: { height: 0, width: 0 },
      sourceData: {},//数据源
      graph: null,//graph全局对象
      lineType: 'polyline',//线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: '#bababa',//线条颜色
      lineThick: 2,//线条粗细
      toolTip: '',//提示框内容
      toolBar: null,//工具栏
      minimap: null,//小地图
      rightMenu: null,//右键菜单
      timeBar: null,//时间轴
      timeBarData: [],//时间轴数据
      dep_num: 7,//部门数量
      curTime: 10,//时间轴当前时间
      timeBarMarks: { 10: '', },//时间轴标注
      animSec: 1,//移动动画时长
    }
  },
  computed: {},
  mounted () {
    this.initWindow()
    this.sourceData = this.initData(testData({ height: this.win.height, width: this.win.height, way: this.dep_num }))
    this.initG6()
  },
  methods: {
    /**
     * 初始化G6
     */
    async initG6 () {
      G6.Util.processParallelEdges(this.sourceData.edges, 80, 'quadratic', 'polyline', 'loop')
      this.graph = new G6.Graph({
        container: 'canvasDiv',
        width: this.win.width,
        height: this.win.height,
        groupByTypes: true,
        fitView: false,
        fitViewPadding: 0,
        fitCenter: false,
        linkCenter: false,
        animate: true,
        enabledStack: true,
        modes: {
          default: ['shortcuts-call', 'drag-node', 'create-edge', { type: 'drag-canvas', direction: 'x', }, { type: 'scroll-canvas', direction: 'x', }],//'drag-canvas', 'drag-node','zoom-canvas', 'drag-node'
        },
        plugins: [this.toolTip, this.rightMenu, this.toolBar],
        //默认节点设置
        defaultNode: {
          size: [250, 310],
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
      //监听：增加连线
      this.graph.on('aftercreateedge', (e) => {
        const curEdge = {
          source: e.edge._cfg.source._cfg.model.id,
          target: e.edge._cfg.target._cfg.model.id
        }
        console.log('增加连线:', curEdge)
        const edges = _that.graph.save().edges;
        G6.Util.processParallelEdges(edges, 80, 'quadratic', 'polyline', 'loop');
        _that.graph.getEdges().forEach((edge, i) => {
          _that.graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition,
          });
        });
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
            <button class="menu-btn">功能1</button>
            <button class="menu-btn">功能2</button>
            <button class="menu-btn">功能3</button>
            <button class="menu-btn">功能4</button>
          </div>`;
        },
        handleMenuClick: (target, item) => {
          console.log(target, item);
        },
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: -10,
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
        position: { x: _that.win.width - 224, y: 10 },
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
          // const model = e.item.getModel()
          // const pos = e.item.getBBox()
          if (e.item.getType() === 'node') {
            outDiv.innerHTML = tooTipHTML
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
     * 初始化时间轴
     */
    initTimeBar () {
      for (let i = 0; i < 100; i++) {
        _that.timeBarData.push({
          date: `2020${i}`,
          value: Math.round(Math.random() * 300),
        });
      }
      this.timeBar = new G6.TimeBar({
        x: 0,
        y: 0,
        width: 450,
        height: 150,
        padding: 10,
        type: 'simple',
        trend: {
          data: _that.timeBarData,
        },
      });
    },
    /**
     * 初始化窗口
     */
    initWindow () {
      _that = this
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10
      console.log('winWid:' + this.win.width + ',winHei:' + this.win.height)
      this.initMenu()
      this.initToolBar()
      // this.initTimeBar()
      this.initMiniMap()
      this.initToolTip()
      this.initJsxNode()
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
     * 初始化节点
     */
    initData (data) {
      data.nodes.forEach((element) => {
        if (element.id <= 20) {
          element.type = 'custNode_task'
        }
        if ((element.id > 20) && (element.id <= 25)) {
          element.type = 'custNode_chat'
        }
        if ((element.id > 25) && (element.id <= 30)) {
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
      console.log(val)
      const x_pos = 2550
      this.graph.moveTo(0 - (x_pos - 170), 0, true, {
        duration: (_that.animSec * 1000)
      })
    },
    /**
     * 左右移动
     */
    moveCanvas (pos) {
      const dx = 100
      const dy = 0
      switch (pos) {
        case 'left'://左移
          this.graph.translate(dx, dy)
          break
        case 'right'://右移
          this.graph.translate(-dx, dy)
          break
        case 'start'://回起点
          this.graph.moveTo(0 - (100 - 170), 0, true, {
            duration: (_that.animSec * 1000)
          })
          break
        case 'point'://去指定点
          this.changeSilder(1)
          break
        default:
          break;
      }
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
     * 刷新页面
     */
    reloadPage () {
      location.reload()
    }
  }
}
</script>
<style lang='less'>
@import "./main.less";
</style>
