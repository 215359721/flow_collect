<template>
  <div class="main-page">
    <div class="opt-div" :style="{zoom:zoom,top:(showInfo?55:10)+'px'}">
      <!-- 布局切换 -->
      <el-button style="width:60px;" size="mini" type="warning" @click="reloadPage">刷新</el-button>
      <el-dropdown v-if="false" size="mini" split-button type="primary" class="mt5" @command="changeLayout">
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
      <el-radio-group v-if="false" v-model="showType" size="mini" class="mt5" @change="showTypeChange">
        <el-radio-button label="all">详细</el-radio-button>
        <el-radio-button label="normal">概要</el-radio-button>
        <el-radio-button label="simple">精简</el-radio-button>
      </el-radio-group>
      <!-- 数据源切换 -->
      <el-radio-group v-if="false" v-model="curDataSource" size="mini" class="mt5" @change="dataSourceChange">
        <el-radio-button label="mock">测试数据</el-radio-button>
        <el-radio-button label="real">真实数据</el-radio-button>
      </el-radio-group>
      <el-button type="info" style="width:100px;margin-top:5px;" size="mini" @click="setConf">参数配置</el-button>
      <el-button type="danger" style="width:100px;margin-top:5px;" size="mini" @click="commitChanges">保存更改</el-button>
    </div>

    <div class="cur-num" :style="{zoom:zoom,width:180+'px'}" v-if="showInfo && graph">
      <div class="mr5">zoom：{{zoom.toFixed(2)}}</div>
      <!-- <div>layout：{{curLayout}}</div> -->
      <div>【{{useLocalPostion?'手动布局':'自动布局'}}】</div>
    </div>
    <div id="canvasDiv"></div>
    <config-s :isShow="showConf" :zoom="zoom" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import G6 from "@antv/g6";
import insertCss from "insert-css";
import loading from "../utils/loading";
import getTipHTML from "../data/toolTipNew"
import { getRightMenuHTML, jumpDetailInfo } from '../data/rightMenu'
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
import { getDataById, modifyRelationPos } from "../api/api";
import { useMockData, isNewUI } from "../config/index";
import { ChatService, saView } from '../utils/service'
import { debounce, midyfyClassWithZoom } from "../utils/common";
import mock_layoutData from "../mock/FinishData/layoutData";
import commonMixins from '../mixins/commonMixin'
import configS from '../components/config.vue'
// eslint-disable-next-line no-unused-vars
import mock_detailData from "../mock/FinishData/detailData";
import nodeSt5 from '../data/newNode/cust_node_5'
import nodeDataSt2 from '../data/newNode/cust_node_data2'
import { getWinZoom } from "../utils/device"
insertCss(innerCss);
let _that = null;

export default {
  components: { configS },
  mixins: [commonMixins],
  data () {
    return {
      //window对象
      win: {
        height: 0,
        width: 0
      },
      queryData: {},//query数据
      sourceData: {}, //数据源
      graph: null, //graph全局对象
      showType: "simple", //显示模式（all、normal、simple）
      curDataSource: "real", //当前数据源
      rankDir: "LR", //当前布局方式（LR-从左至右；TB-从上到下）
      canvasCenter: [0, 0], //画布中心
      align: undefined, //当前对齐方式
      lineType: "polyline", //线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: "#888888", //线条颜色
      lineThick: 4, //线条粗细
      curOptNode: null, //当前操作的节点
      toolTip: "", //提示框内容
      toolBar: null, //工具栏
      minimap: null, //小地图
      rightMenu: null, //右键菜单
      curLayout: "dagre", //当前布局
      zoom: 1.0, //当前缩放率
      showConf: false,//配置
      showInfo: false,//显示详情信息标识
      //-------
      useLocalPostion: false,//是否使用本地坐标or采用自动布局
      nodePositionList: [],//全量节点坐标集合
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
        this.queryData = this.$route.query
        console.log("queryData:", this.queryData);
        if (!this.queryData.nodeId) {
          alert('没有对应的初始节点！')
          return
        }
        let responseData = {}
        if (useMockData) {
          // responseData = mock_detailData
          responseData = mock_layoutData
        } else {
          responseData = await getDataById(this.queryData.nodeId);
        }
        console.log("全量数据:", responseData.data);
        this.useLocalPostion = Boolean(responseData.data.nodes[0].x)
        console.log('【useLocalPostion】', this.useLocalPostion)
        console.log(`当前布局采用:【${this.useLocalPostion ? '手动布局' : '自动布局'}】`);
        this.sourceData = this.initData(responseData.data);
        // this.sourceData.edges.forEach(data => {
        //   console.log('label:' + data.label)
        // })
      }
      this.initMenu();
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
      let currentLayout = {
        type: "dagre", //dagre
        rankdir: this.rankDir,
        align: this.align,
        sortByCombo: true,
        nodesepFunc: () => 50,//纵向间距
        ranksepFunc: () => 30,//横向间距
      }
      if (this.useLocalPostion) { currentLayout = {} }
      this.graph = new G6.Graph({
        container: "canvasDiv",
        width: this.win.width,
        height: this.win.height,
        // groupByTypes: true,
        // fitView: false,
        // fitViewPadding: 0,
        fitCenter: true,
        // linkCenter: false,
        animate: true,
        enabledStack: true,
        minZoom: 0.05,
        maxZoom: 10.0,
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
        plugins: [this.toolTip, this.minimap, this.toolBar, this.rightMenu],
        layout: currentLayout,
        //默认节点设置
        defaultNode: {
          size: [200, 60],
          color: "#000",
          // anchorPoints: [0.3, 0.3],
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
            endArrow: true,
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
              fontWeight: "900"
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
            lineWidth: this.lineThick,
            stroke: "#ff3300"
          }
        }
      });
      //-------测试数据start-------
      // this.sourceData.nodes.forEach(node => {
      //   node.size = 10
      // });
      //--------测试数据end--------
      this.graph.data(this.sourceData);
      this.graph.render();
      this.graph.zoomTo(this.zoom);
      // this.graph.fitCenter();
      // this.graph.zoom(this.zoom, {
      //   x: this.graph.getWidth() / 1.7,
      //   y: this.graph.getHeight() / 1.7
      // });


      //聚焦到指定节点
      // setTimeout(() => {
      //   const item = _that.graph.findById(this.queryData.nodeId);
      //   _that.graph.focusItem(item);
      // }, 100);
      loading.hide();

      //监听：节点单击
      this.graph.on("node:click", function (e) {
        const item = e.item;
        console.log(e.item._cfg.model);
        // console.log(
        //   "点击node:{" +
        //   item._cfg.model.id +
        //   " , " +
        //   item._cfg.model.label +
        //   "|" +
        //   item._cfg.model.x +
        //   "," +
        //   item._cfg.model.y +
        //   "}"
        // );
        //聚焦item
        // _that.graph.focusItem(item);
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
      //监听：tooltip点击
      this.graph.on("tooltipchange", item => {
        if (item.action === "show") {
          const dom = document.getElementsByClassName('single-file')
          if (dom.length) {
            for (let i = 0; i < dom.length; i++) {
              dom[i].onclick = async (e) => {
                const fileId = e.target.id
                const fileName = e.target.innerText
                console.log("[" + fileId + "]:[" + fileName + "]")
                ChatService.downloadFile(fileId, fileName).then(res => {
                  let filePath = res.body
                  console.log('res:', res)
                  console.log("filePath:" + filePath)
                  console.log('saView:', saView)
                  saView.shell.openItem(filePath)
                })
              }
            }
          }
        }
      })
      //更新class
      midyfyClassWithZoom('g6-minimap', this.zoom)
      midyfyClassWithZoom('g6-component-toolbar', this.zoom)
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
     * 提交修改节点信息
     */
    async commitChanges () {
      this.nodePositionList = []
      this.graph.cfg.nodes.forEach(item => {
        const model = item._cfg.model
        console.log(model.id + ":  " + model.x + "," + model.y)
        const obj = {
          nodeClassId: model.icon,
          nodeId: model.id,
          nodeX: model.x,
          nodeY: model.y,
          startNodeClassId: this.queryData.icon,
          startNodeId: this.queryData.nodeId,
        }
        this.nodePositionList.push(obj)
      })
      console.log('修改节点上送:', this.nodePositionList);
      if (this.nodePositionList.length) {
        const responseData = await modifyRelationPos(this.nodePositionList);
        console.log(responseData);
        if (responseData.data.code === 200) {
          this.$message.success("关系保存成功");
        } else {
          this.$message.error("关系保存失败");
        }
      } else {
        this.$message.warning("您未做任何更改");
      }
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
        getContent (e) {
          const item = e.item.getModel();
          return getRightMenuHTML(item, 'auto', _that.zoom)
        },
        handleMenuClick: (target, item) => {
          _that.curOptNode = item;
          const cur = this.curOptNode._cfg.model;
          const page = _that.$router.resolve({
            path: "/auto",
            query: { nodeId: cur.id }
          });
          console.log("curOptNode:", _that.curOptNode);
          const openWindowOption = `top=0,left=0,toolbar=no,menubar=no,width=${window.screen.availWidth - 10},height=${window.screen.availHeight - 30}`
          switch (target.getAttribute("fnname")) {
            case "copynode":
              alert("节点ID:" + cur.id)
              break;
            case "addMark":
              _that.addMarkShow = true;
              break;
            case "showMark":
              _that.showMarkVisiable = true;
              _that.markObj.content = "";
              break;
            case "showNodeRelation":
              window.open(page.href, cur.label, openWindowOption);
              break;
            case "jumpInfo":
              jumpDetailInfo(cur)
              break;
            default:
              break;
          }
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
        // fixToNode: [1, 0.5],
        trigger: "click",
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node"],
        // shouldBegin: e => {
        //   const model = e.item.getModel();
        //   if ((model.icon === "document") || (model.icon === "DataPacket")) {
        //     return false;
        //   }
        //   return true;
        // },
        // 自定义 tooltip 内容
        getContent: e => {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          outDiv.style.height = "fit-content";
          const model = e.item.getModel();
          // const pos = e.item.getBBox()
          if (e.item.getType() === "node") {
            outDiv.innerHTML = getTipHTML(model, this.zoom);
          }
          if ((e.item.getType() === "edge") && (model.label !== '')) {
            outDiv.innerHTML = model.label
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
      this.zoom = getWinZoom()
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10;
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10;
      this.canvasCenter = [this.win.width / 2, this.win.height / 2];
      console.log("winWid:" + this.win.width + ",winHei:" + this.win.height + ",zoom:" + this.zoom);
      //监听窗口改变
      window.addEventListener('resize', debounce(() => {
        _that.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10;
        _that.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10;
        console.log('窗口大小改变:' + _that.win.width + '*' + _that.win.height)
        _that.graph.changeSize(_that.win.width, _that.win.height)
      }, 500))
      this.showInfo = this.__CONFIG.show_info
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
        switch (this.showType) {
          case "all":
            element.size = isNewUI ? [280, 335] : [250, 390];
            break;
          case "normal":
            element.size = isNewUI ? [280, 125] : [250, 310];
            break;
          case "simple":
            // element.size = isNewUI ? [200, 60] : [250, 50];
            element.size = [200, 60]
            break;
          default:
            break;
        }
        switch (element.icon) {
          case "data":
          case "document"://数据
            element.type = "custNode_data_style2"
            element.size = [60, 60]
            break;
          case "DataPacket"://数据包
            element.type = "custNode_data_group_style2";
            element.size = [60, 60]
            break;
          case "chat":
          case "im"://即时通讯
            element.type = (Number(element.prominent)) ? ("custNode_lg_chat_style5") : ("custNode_chat_style5")
            break;
          case "task"://任务
            element.type = (Number(element.prominent)) ? ("custNode_lg_task_style5") : ("custNode_task_style5")
            break;
          case "MeetingInfo"://会议
            element.type = (Number(element.prominent)) ? ("custNode_lg_meet_style5") : ("custNode_meet_style5")
            break;
          case "App"://工具
            element.type = (Number(element.prominent)) ? ("custNode_lg_tool_style5") : ("custNode_tool_style5")
            break;
          default:
            element.type = "custNode_data_style2"
            element.size = [60, 60]
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
      //数据节点
      G6.registerNode("data_node_simple", {
        jsx: nodeNewUI.data_simple
      });
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
      //新UI节点-样式5
      G6.registerNode("custNode_task_style5", {
        jsx: nodeSt5.task_node_style5
      });
      G6.registerNode("custNode_lg_task_style5", {
        jsx: nodeSt5.task_lg_node_style5
      });
      G6.registerNode("custNode_chat_style5", {
        jsx: nodeSt5.chat_node_style5
      });
      G6.registerNode("custNode_lg_chat_style5", {
        jsx: nodeSt5.chat_lg_node_style5
      });
      G6.registerNode("custNode_meet_style5", {
        jsx: nodeSt5.meet_node_style5
      });
      G6.registerNode("custNode_lg_meet_style5", {
        jsx: nodeSt5.meet_lg_node_style5
      });
      G6.registerNode("custNode_tool_style5", {
        jsx: nodeSt5.tool_node_style5
      });
      G6.registerNode("custNode_lg_tool_style5", {
        jsx: nodeSt5.tool_lg_node_style5
      });
      G6.registerNode("custNode_data_style2", {
        jsx: nodeDataSt2.data_node_style2
      });
      G6.registerNode("custNode_data_group_style2", {
        jsx: nodeDataSt2.data_group_node_style2
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
     * 参数配置
     */
    setConf () {
      this.showConf = new Boolean(true)
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
@import "../assets/css/btn.css";
</style>
<style>
.g6-component-tooltip {
  background-color: transparent;
  border: none;
  padding: 5px;
  box-shadow: none;
}
</style>