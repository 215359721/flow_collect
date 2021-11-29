<template>
  <div class="main-page">
    <div class="opt-div">
      <!-- 布局切换 -->
      <el-button
        style="width:60px;"
        size="mini"
        type="danger"
        @click="reloadPage"
      >刷新</el-button>
      <el-dropdown
        size="mini"
        split-button
        type="primary"
        class="mt5"
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
      <!-- 精简模式切换 -->
      <el-radio-group
        v-model="showType"
        size="mini"
        class="mt5"
        @change="showTypeChange"
      >
        <el-radio-button label="all">详细</el-radio-button>
        <el-radio-button label="normal">概要</el-radio-button>
        <el-radio-button label="simple">精简</el-radio-button>
      </el-radio-group>
      <!-- 数据源切换 -->
      <el-radio-group
        v-model="curDataSource"
        size="mini"
        class="mt5"
        @change="dataSourceChange"
      >
        <el-radio-button label="mock">测试数据</el-radio-button>
        <el-radio-button label="real">真实数据</el-radio-button>
      </el-radio-group>
    </div>
    <div
      class="cur-num"
      style="width:200px;"
      v-if="graph"
    >
      <div class="mr5">zoom：{{curZoom}}</div>
      <div>layout：{{curLayout}}</div>
    </div>
    <div id="canvasDiv"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import G6 from "@antv/g6";
import insertCss from "insert-css";
import loading from "../utils/loading";
import getTipHTML from "../data/toolTipNew"
import getTooTipHTML from "../data/tooTip";
// eslint-disable-next-line no-unused-vars
import realData from "../mock/realData";
// eslint-disable-next-line no-unused-vars
import outerData from "../mock/mainData";
// eslint-disable-next-line no-unused-vars
import cData from "../mock/c/line";
// eslint-disable-next-line no-unused-vars
import custData from "../mock/custData";
// eslint-disable-next-line no-unused-vars
import layoutCfg from "../data/layoutConfig";
import taskNode from "../data/task_node";
import meetNode from "../data/meet_node";
import chatNode from "../data/chat_node";
import dataNode from "../data/data_node";
import nodeNewUI from '../data/newNode/layout_node_newUI'
import innerCss from "../data/insertCss";
import { getDataById } from "../api/api";
import { useMockData, isNewUI } from "../config/index";
import { debounce } from "../utils/common";
import mock_detailData from "../mock/FinishData/detailData";
insertCss(innerCss);
let _that = null;

export default {
  components: {},
  data () {
    return {
      //window对象
      win: {
        height: 0,
        width: 0
      },
      sourceData: {}, //数据源
      graph: null, //graph全局对象
      showType: "simple", //显示模式（all、normal、simple）
      curDataSource: "real", //当前数据源
      rankDir: "LR", //当前布局方式（LR-从左至右；TB-从上到下）
      canvasCenter: [0, 0], //画布中心
      align: undefined, //当前对齐方式
      lineType: "polyline", //线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: "#bababa", //线条颜色
      lineThick: 2, //线条粗细
      toolTip: "", //提示框内容
      toolBar: null, //工具栏
      minimap: null, //小地图
      rightMenu: null, //右键菜单
      curLayout: "dagre", //当前布局
      curZoom: 1.0 //当前缩放率
    };
  },
  computed: {},
  mounted () {
    this.getMainData();
  },
  methods: {
    /**
     * 获得数据
     */
    async getMainData () {
      this.initWindow();
      if (this.curDataSource === "mock") {
        //mock数据
        this.sourceData = this.initData(outerData);
      } else {
        //真实数据
        const queryData = this.$route.query
        if (!queryData.nodeId) {
          queryData.nodeId = "c99b3dae-a520-4460-8474-122418792110"
        }
        console.log("queryData:", queryData);
        let responseData = {}
        if (useMockData) {
          responseData = mock_detailData
        } else {
          responseData = await getDataById(queryData.nodeId);
        }

        console.log("全量数据:", responseData.data);
        this.sourceData = this.initData(responseData.data);
      }
      // this.initMenu();
      this.initToolBar();
      this.initMiniMap();
      this.initToolTip();
      this.initJsxNode();
      this.initG6();
    },
    /**
     * 初始化G6
     */
    async initG6 () {
      loading.show();
      G6.Util.processParallelEdges(
        this.sourceData.edges,
        20,
        "quadratic",
        "polyline",
        "loop"
      );
      this.graph = new G6.Graph({
        container: "canvasDiv",
        width: this.win.width,
        height: this.win.height,
        groupByTypes: true,
        fitView: false,
        fitViewPadding: 0,
        fitCenter: true,
        linkCenter: false,
        animate: true,
        enabledStack: true,
        minZoom: 0.05,
        maxZoom: 1.5,
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            "shortcuts-call",
            "drag-combo",
            "collapse-expand-combo"
          ] //'drag-canvas', 'zoom-canvas', 'drag-node'
        },
        plugins: [this.toolTip, this.minimap, this.toolBar],
        layout: {
          type: "dagre", //dagre
          rankdir: this.rankDir,
          align: this.align,
          sortByCombo: true,
          nodesepFunc: () => 10,
          ranksepFunc: () => 70
        },
        //默认节点设置
        defaultNode: {
          size: [280, 335],
          color: "#000",
          style: {
            cursor: "pointer",
            lineWidth: 3
          }
        },
        //默认连线设置
        defaultEdge: {
          color: this.lineColor,
          type: this.lineType, //（quadratic-二阶贝塞尔曲线；cubic-三阶贝塞尔曲线）
          labelCfg: {
            refY: -10
          },
          style: {
            cursor: "pointer",
            lineWidth: this.lineThick,
            color: this.lineColor,
            endArrow: true
          }
        },
        //默认分组设置
        defaultCombo: {
          type: "cRect",
          // padding: 50,
          style: {
            fill: "#deffff",
            stroke: "#000099",
            lineWidth: 3,
            radius: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10
          },
          labelCfg: {
            position: "top",
            refY: -35,
            style: {
              fontSize: 25,
              fontWeight: "bold"
            }
          }
        },
        comboStateStyles: {
          hover: {
            lineWidth: 4,
            fill: "#FE9797",
            stroke: "#FE9797"
          }
        },
        nodeStateStyles: {
          highlight: {
            opacity: 1.0
          },
          dark: {
            opacity: 0.2
          }
        },
        edgeStateStyles: {
          highlight: {
            lineWidth: 3,
            stroke: "#ff3300"
          }
        }
      });
      //-------测试数据start-------
      this.sourceData.nodes.forEach(node => {
        if (node.type === "image") {
          node.size = 60
        }
      });
      //--------测试数据end--------
      this.graph.data(this.sourceData);
      this.graph.render();
      this.curZoom = this.graph.getZoom().toFixed(2);

      //聚焦到指定节点
      // setTimeout(() => {
      //   const item = _that.graph.findById("2");
      //   _that.graph.focusItem(item);
      // }, 1000);
      loading.hide();

      //监听：节点单击
      this.graph.on("node:click", function (e) {
        const item = e.item;
        console.log(e);
        console.log(
          "点击node:{" +
          item._cfg.model.id +
          " , " +
          item._cfg.model.label +
          "|" +
          item._cfg.model.x +
          "," +
          item._cfg.model.y +
          "}"
        );
        //聚焦item
        _that.graph.focusItem(item);
        //---高亮---
        _that.graph.setAutoPaint(false);
        _that.graph.getNodes().forEach(function (node) {
          _that.graph.clearItemStates(node);
          _that.graph.setItemState(node, "dark", true);
        });
        _that.graph.setItemState(item, "dark", false);
        _that.graph.setItemState(item, "highlight", true);
        //递归节点
        _that.filtNodeAndEdge(_that.graph, item);
        _that.graph.paint();
        _that.graph.setAutoPaint(true);
      });
      //监听：canvas点击
      this.graph.on("canvas:click", () => {
        _that.clearAllStats();
      });
      //监听：分组点击
      this.graph.on("combo:click", e => {
        _that.clearAllStats();
        if (e.target.get("name") === "combo-marker-shape") {
          _that.graph.collapseExpandCombo(e.item);
        }
      });
    },
    filtNodeAndEdge (graph, item) {
      graph.getEdges().forEach(function (edge) {
        if (edge.getSource() === item) {
          graph.setItemState(edge.getTarget(), "dark", false);
          graph.setItemState(edge.getTarget(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else if (edge.getTarget() === item) {
          graph.setItemState(edge.getSource(), "dark", false);
          graph.setItemState(edge.getSource(), "highlight", true);
          graph.setItemState(edge, "highlight", true);
          edge.toFront();
        } else {
          graph.setItemState(edge, "highlight", false);
        }
      });
    },
    /**
     * 切换布局
     */
    changeLayout (type) {
      loading.show();
      this.curLayout = type;
      const option = {
        rankDir: this.rankDir,
        canvasCenter: this.canvasCenter
      };
      const cfg = layoutCfg[this.curLayout](option);
      this.graph.destroyLayout();
      console.log(`切换布局-${this.curLayout}:`, cfg);
      this.graph.updateLayout(cfg);
      setTimeout(() => {
        _that.graph.fitView(10);
        loading.hide();
      }, 1000);
    },
    initCombo () {
      const collapseIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y]
        ];
      };
      const expandIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
          ["M", x - r + r, y - r + 4],
          ["L", x, y + r - 4]
        ];
      };
      G6.registerCombo(
        "cRect",
        {
          drawShape: function drawShape (cfg, group) {
            const self = this;
            cfg.padding = cfg.padding || [20, 50, 20, 50];
            const style = self.getShapeStyle(cfg);
            style.radius = 10;
            // console.log('ceactStyle:', style)
            const rect = group.addShape("rect", {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height
              },
              draggable: true,
              name: "combo-keyShape"
            });
            style.cursor = "pointer";
            group.addShape("marker", {
              attrs: {
                ...style,
                fill: "#fff",
                opacity: 1,
                x: cfg.style.width / 2 + cfg.padding[1],
                y: 0 - cfg.padding[0],
                // y: (cfg.padding[2] - cfg.padding[0]) / 2,
                r: 10,
                symbol: collapseIcon
              },
              draggable: true,
              name: "combo-marker-shape"
            });
            return rect;
          },
          afterUpdate: function afterUpdate (cfg, combo) {
            const group = combo.get("group");
            const marker = group.find(
              ele => ele.get("name") === "combo-marker-shape"
            );
            marker.attr({
              x: cfg.style.width / 2 + cfg.padding[1],
              y: 0 - cfg.padding[0],
              // y: (cfg.padding[2] - cfg.padding[0]) / 2,
              symbol: cfg.collapsed ? expandIcon : collapseIcon
            });
          }
        },
        "rect"
      );
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
        itemTypes: ["node"]
      });
    },
    /**
     * 初始化小地图
     */
    initMiniMap () {
      this.minimap = new G6.Minimap({
        size: [250, 150]
      });
    },
    /**
     * 初始化工具栏
     */
    initToolBar () {
      this.toolBar = new G6.ToolBar({
        position: { x: 10, y: 10 }
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
        itemTypes: ["node", "edge"],
        // 自定义 tooltip 内容
        getContent: e => {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          outDiv.style.height = "fit-content";
          const model = e.item.getModel();
          // const pos = e.item.getBBox()
          if (e.item.getType() === "node") {
            outDiv.innerHTML = isNewUI ? getTipHTML(model) : getTooTipHTML(model);
          } else {
            const source = e.item.getSource();
            const target = e.item.getTarget();
            outDiv.innerHTML = `来源：${source.getModel().label}<br/>去向：${target.getModel().label
              }`;
          }
          return outDiv;
        }
      });
    },
    /**
     * 初始化窗口
     */
    initWindow () {
      _that = this;
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10;
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10;
      this.canvasCenter = [this.win.width / 2, this.win.height / 2];
      console.log("winWid:" + this.win.width + ",winHei:" + this.win.height);
      //监听窗口改变
      window.addEventListener('resize', debounce(() => {
        _that.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10;
        _that.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10;
        console.log('窗口大小改变:' + _that.win.width + '*' + _that.win.height)
        _that.graph.changeSize(_that.win.width, _that.win.height)
      }, 500))
    },
    /**
     * 清空焦点高亮
     */
    clearAllStats () {
      const that = this;
      that.graph.setAutoPaint(false);
      that.graph.getNodes().forEach(function (node) {
        that.graph.clearItemStates(node);
      });
      that.graph.getEdges().forEach(function (edge) {
        that.graph.clearItemStates(edge);
      });
      that.graph.paint();
      that.graph.setAutoPaint(true);
    },
    /**
     * 初始化节点
     */
    initData (data) {
      if (data.nodes.length <= 0) { this.$message.error("没有与之关联的节点数据"); }
      data.nodes.forEach(element => {
        // element.type = 'image'
        const defaultImg = require('../assets/icon/data.png')
        element.img = require("../assets/icon/" +
          element.icon.toLowerCase() +
          ".png") || defaultImg;
        element.obj = {
          userHead: require("../assets/image/logo.png"),
          status: require("../assets/image/task.png"),
          level: require("../assets/image/dot.png"),
          inList: ["会议申请单.doc", "会议参会人员名单.excl"],
          outList: ["会议纪要1.doc"]
        };
        switch (this.showType) {
          case "all":
            element.size = isNewUI ? [280, 335] : [250, 390];
            break;
          case "normal":
            element.size = isNewUI ? [280, 125] : [250, 310];
            break;
          case "simple":
            element.size = isNewUI ? [160, 60] : [250, 50];
            break;
          default:
            break;
        }
        switch (element.icon) {
          case "data":
          case "document":
            if (isNewUI) {
              element.type = "image"
              element.size = 60
              element.img = require('../assets/image/newUI/data.png')
            } else {
              element.type = "data_node";
            }
            break;
          case "DataPacket":
            element.type = "datagroup_node";
            break;
          case "chat":
          case "im":
            element.type = isNewUI ? `chat_${this.showType}_newUI` : `chat_node_${this.showType}`
            break;
          case "task":
            element.type = isNewUI ? `task_${this.showType}_newUI` : `task_node_${this.showType}`
            break;
          case "MeetingInfo":
            element.type = isNewUI ? `meet_${this.showType}_newUI` : `meet_node_${this.showType}`
            break;
          case "App":
            element.type = isNewUI ? `tool_${this.showType}_newUI` : 'data_node'
            break;
          default:
            if (isNewUI) {
              element.type = "image"
              element.size = 60
              element.img = require('../assets/image/newUI/data.png')
            } else {
              element.type = "data_node";
            }
            break;
        }
      });
      console.log("【当前数据】", data);
      return data;
    },
    /**
     * 初始化自定义节点
     */
    initJsxNode () {
      //任务自定义节点
      G6.registerNode("task_node_all", {
        jsx: taskNode.task_jsx4All
      });
      G6.registerNode("task_node_normal", {
        jsx: taskNode.task_jsx4Normal
      });
      G6.registerNode("task_node_simple", {
        jsx: taskNode.task_jsx4Simple
      });
      //会议自定义节点
      G6.registerNode("meet_node_all", {
        jsx: meetNode.meet_jsx4All
      });
      G6.registerNode("meet_node_normal", {
        jsx: meetNode.meet_jsx4Normal
      });
      G6.registerNode("meet_node_simple", {
        jsx: meetNode.meet_jsx4Simple
      });
      //即时通讯自定义节点
      G6.registerNode("chat_node_all", {
        jsx: chatNode.chat_jsx4All
      });
      G6.registerNode("chat_node_normal", {
        jsx: chatNode.chat_jsx4Normal
      });
      G6.registerNode("chat_node_simple", {
        jsx: chatNode.chat_jsx4Simple
      });
      //数据自定义节点
      G6.registerNode("data_node", {
        jsx: dataNode.data_jsx
      });
      G6.registerNode("datagroup_node", {
        jsx: dataNode.datagroup_jsx
      });
      //新UI节点
      G6.registerNode("task_all_newUI", {
        jsx: nodeNewUI.task_detail
      });
      G6.registerNode("meet_all_newUI", {
        jsx: nodeNewUI.meet_detail
      });
      G6.registerNode("chat_all_newUI", {
        jsx: nodeNewUI.chat_detail
      });
      G6.registerNode("tool_all_newUI", {
        jsx: nodeNewUI.tool_detail
      });
      G6.registerNode("task_normal_newUI", {
        jsx: nodeNewUI.task_general
      });
      G6.registerNode("meet_normal_newUI", {
        jsx: nodeNewUI.meet_general
      });
      G6.registerNode("chat_normal_newUI", {
        jsx: nodeNewUI.chat_general
      });
      G6.registerNode("tool_normal_newUI", {
        jsx: nodeNewUI.tool_general
      });
      G6.registerNode("task_simple_newUI", {
        jsx: nodeNewUI.task_simple
      });
      G6.registerNode("meet_simple_newUI", {
        jsx: nodeNewUI.meet_simple
      });
      G6.registerNode("chat_simple_newUI", {
        jsx: nodeNewUI.chat_simple
      });
      G6.registerNode("tool_simple_newUI", {
        jsx: nodeNewUI.tool_simple
      });
    },
    /**
     * 显示模式切换
     */
    showTypeChange (val) {
      this.showType = val;
      if (this.graph) {
        this.graph.clear();
        this.graph.destroy();
      }
      this.getMainData();
      loading.hide();
    },
    /**
     * 数据源切换
     */
    dataSourceChange (val) {
      this.curDataSource = val;
      if (this.graph) {
        this.graph.clear();
        this.graph.destroy();
      }
      this.getMainData();
      loading.hide();
    },
    /**
     * 刷新页面
     */
    reloadPage () {
      location.reload();
    }
  }
};
</script>
<style lang='less'>
@import "./main.less";
@import "./toolTip/tooltip.less";
@import "./toolTip/color.less";
</style>
<style>
.g6-component-tooltip {
  background-color: transparent;
  border: none;
  padding: 5px;
  box-shadow: none;
}
</style>