<template>
  <div class="main-page">
    <div class="opt-div">
      <el-dropdown
        size="mini"
        split-button
        type="primary"
        @command="changeLayout"
      >
        布局切换
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dagre">dagre层次</el-dropdown-item>
          <el-dropdown-item command="force">force力导向</el-dropdown-item>
          <el-dropdown-item command="fruchterman">fruchterman</el-dropdown-item>
          <el-dropdown-item command="grid">grid网格</el-dropdown-item>
          <el-dropdown-item command="circular">circular环形</el-dropdown-item>
          <el-dropdown-item command="concentric">concentric同心圆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div
      class="cur-num"
      v-if="graph"
    >
      <div>zoom：{{graph.getZoom().toFixed(2)}}</div>
      <div>layout：{{curLayout}}</div>
    </div>
    <div id="canvasDiv"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import G6 from '@antv/g6'
import insertCss from 'insert-css'
import loading from '../utils/loading'
// eslint-disable-next-line no-unused-vars
import outerData from '../mock/mainData'
// eslint-disable-next-line no-unused-vars
import cData from '../mock/c/line'
// eslint-disable-next-line no-unused-vars
import custData from '../mock/custData'
// eslint-disable-next-line no-unused-vars
import layoutCfg from '../data/layoutConfig'
import custNode from '../data/custNode'
import innerCss from '../data/insertCss'
insertCss(innerCss)
let _that = null

export default {
  components: {},
  data () {
    return {
      //window对象
      win: {
        height: 0,
        width: 0
      },
      sourceData: {},//数据源
      graph: null,//graph全局对象
      rankDir: 'LR',//当前布局方式
      canvasCenter: [0, 0],//画布中心
      align: undefined,//当前对齐方式
      lineType: 'polyline',//线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: '#bababa',//线条颜色
      lineThick: 2,//线条粗细
      toolTip: '',//提示框内容
      toolBar: null,//工具栏
      minimap: null,//小地图
      rightMenu: null,//右键菜单
      curLayout: 'dagre',//当前布局
    }
  },
  computed: {},
  mounted () {
    this.initWindow()
    // this.sourceData = this.initData(cData)
    this.sourceData = this.initData(outerData)
    // this.sourceData = this.initData(custData)
    this.initMenu()
    this.initToolBar()
    this.initMiniMap()
    this.initToolTip()
    this.initJsxNode()
    this.initCombo()
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
        fitView: true,
        fitViewPadding: 0,
        fitCenter: false,
        linkCenter: false,
        animate: true,
        enabledStack: true,
        minZoom: 0.05,
        maxZoom: 1.5,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'shortcuts-call', 'drag-combo', 'collapse-expand-combo'],//'drag-canvas', 'zoom-canvas', 'drag-node'
        },
        plugins: [this.toolTip, this.minimap, this.rightMenu, this.toolBar],
        layout: {
          type: 'dagre', //dagre
          rankdir: this.rankDir,
          align: this.align,
          sortByCombo: true,
          nodesepFunc: () => 20,
          ranksepFunc: () => 20,
        },
        //默认节点设置
        defaultNode: {
          size: [250, 360],
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
        //默认分组设置
        defaultCombo: {
          type: 'cRect',
          // padding: 50,
          style: {
            fill: '#ccffff',
            stroke: '#000099',
            lineWidth: 3,
            radius: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
          },
          labelCfg: {
            position: 'top',
            refY: -35,
            style: {
              fontSize: 25,
              fontWeight: 'bold',
            }
          },
        },
        comboStateStyles: {
          hover: {
            lineWidth: 4,
            fill: '#FE9797',
            stroke: '#FE9797',
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
            lineWidth: 6,
            stroke: '#999',
          },
        },
      })
      this.graph.data(this.sourceData)
      this.graph.render()

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
      //监听：分组点击
      this.graph.on('combo:click', (e) => {
        _that.clearAllStats()
        if (e.target.get('name') === 'combo-marker-shape') {
          _that.graph.collapseExpandCombo(e.item)
        }
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
     * 切换布局
     */
    changeLayout (type) {
      loading.show()
      this.curLayout = type
      const option = {
        rankDir: this.rankDir,
        canvasCenter: this.canvasCenter,
      }
      const cfg = layoutCfg[this.curLayout](option)
      this.graph.destroyLayout()
      console.log(`切换布局-${this.curLayout}:`, cfg)
      this.graph.updateLayout(cfg)
      setTimeout(() => {
        _that.graph.fitView(10)
        loading.hide()
      }, 1000)
    },
    initCombo () {
      const collapseIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
        ];
      };
      const expandIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
          ['M', x - r + r, y - r + 4],
          ['L', x, y + r - 4],
        ];
      };
      G6.registerCombo(
        'cRect',
        {
          drawShape: function drawShape (cfg, group) {
            const self = this;
            cfg.padding = cfg.padding || [20, 50, 20, 50];
            const style = self.getShapeStyle(cfg)
            style.radius = 10
            console.log('ceactStyle:', style)
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height,
              },
              draggable: true,
              name: 'combo-keyShape',
            })
            style.cursor = 'pointer'
            group.addShape('marker', {
              attrs: {
                ...style,
                fill: '#fff',
                opacity: 1,
                x: cfg.style.width / 2 + cfg.padding[1],
                y: 0 - cfg.padding[0],
                // y: (cfg.padding[2] - cfg.padding[0]) / 2,
                r: 10,
                symbol: collapseIcon,
              },
              draggable: true,
              name: 'combo-marker-shape',
            });
            return rect;
          },
          afterUpdate: function afterUpdate (cfg, combo) {
            const group = combo.get('group');
            const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
            marker.attr({
              x: cfg.style.width / 2 + cfg.padding[1],
              y: 0 - cfg.padding[0],
              // y: (cfg.padding[2] - cfg.padding[0]) / 2,
              symbol: cfg.collapsed ? expandIcon : collapseIcon,
            });
          },
        },
        'rect',
      )
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
     * 初始化自定义节点
     */
    initJsxNode () {
      G6.registerNode('cust_node_all', {
        jsx: custNode.jsx4All,
      })
      G6.registerNode('cust_node_normal', {
        jsx: custNode.jsx4Normal,
      })
      G6.registerNode('cust_node_simple', {
        jsx: custNode.jsx4Simple,
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
        position: { x: 10, y: 10 },
      });
    },
    /**
     * 初始化tooltip
     */
    initToolTip () {
      this.toolTip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        fixToNode: [1, 0.5],
        // 允许出现 tooltip 的 item 类型
        itemTypes: ['node', 'edge'],
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          outDiv.style.height = 'fit-content'
          const model = e.item.getModel()
          const pos = e.item.getBBox()
          if (e.item.getType() === 'node') {
            outDiv.innerHTML = `${model.label} | ${model.id}<br/>
              【centerX】${pos.centerX}<br/>
              【centerY】${pos.centerY}<br/>
              【height】${pos.height}<br/>
              【width】${pos.width}<br/>
              【maxX】${pos.maxX}<br/>
              【maxY】${pos.maxY}<br/>
              【minX】${pos.minX}<br/>
              【minY】${pos.minY}<br/>
              【x】${pos.x}<br/>
              【y】${pos.y}<br/>`
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
     * 初始化窗口
     */
    initWindow () {
      _that = this
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10
      this.canvasCenter = [this.win.width / 2, this.win.height / 2]
      console.log('winWid:' + this.win.width + ',winHei:' + this.win.height)
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
        // element.type = 'image'
        element.type = 'cust_node_all'
        if (Number(element.id) > 20 && Number(element.id) < 30) {
          element.type = 'cust_node_normal'
        }
        if (Number(element.id) > 60) {
          element.type = 'cust_node_simple'
        }
        element.img = require(`../assets/image/${element.icon}.png`)
        element.data = {
          userHead: require('../assets/image/logo.png'),
          status: require('../assets/image/task.png'),
          level: require('../assets/image/dot.png'),
          inList: ['会议申请单.doc', '会议参会人员名单.excl'],
          outList: ['会议纪要1.doc'],
        }
      })
      console.log('【当前数据】', data)
      return data
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
