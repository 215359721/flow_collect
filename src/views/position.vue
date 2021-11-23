/* eslint-disable no-unused-vars */
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
          v-if="false"
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
          type="danger"
          style="width:100px;margin-top:5px;"
          size="mini"
          :disabled="saveDisabled"
          @click="commitChanges"
        >保存更改</el-button>
      </div>
      <el-radio-group
        v-if="false"
        v-model="dataType"
        size="mini"
        style="margin-top:5px;"
        @change="changeDataType"
      >
        <el-radio-button label="mock">mock数据</el-radio-button>
        <el-radio-button label="real">动态数据</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 分辨率信息 -->
    <div class="cur-num cur-resolving un-sel">
      <div class="mr5">screen：{{win.width}} * {{win.height}}</div>
    </div>
    <!-- 网格信息 -->
    <div class="cur-num cur-grid un-sel">
      <div class="mr5">gird：{{gird.width}} * {{Math.floor(gird.height)}}</div>
    </div>
    <!-- 指示器 -->
    <div
      class="cur-num un-sel"
      v-if="graph"
    >
      <!-- <div class="mr5">zoom：{{graph.getZoom().toFixed(2)}}</div> -->
      <div class="mr5">V:11_23_B</div>
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
      :hei="Math.floor((canvas.height/dep_num))*(index+1)"
      :style="{top:(Math.floor((canvas.height/dep_num))*(index+1)-2)+'px'}"
    />
    <!-- 部门名称 -->
    <div
      v-for="(item,index) in depData"
      :key="index"
      class="dep-name un-sel"
      :style="{height:Math.floor(canvas.height/dep_num-2)+'px',top:(Math.floor(canvas.height/dep_num) * index)+'px'}"
      @click="depClick(item.name)"
    >{{item.name}}</div>
    <div
      class="dep-bottom"
      :style="{height:canvas.offset_hei+'px',top:canvas.height+'px'}"
    ></div>
    <!-- 时间轴 -->
    <div
      class="timeBar-area un-sel"
      v-if="timeBarData.length"
      :style="{height:timeBarHei+'px',top:(win.height-timeBarHei)+'px'}"
    >
      <el-slider
        v-model="curWeek"
        :min="1"
        :max="timeBarData.length"
        :step="1"
        :format-tooltip="formatTooltip"
        :marks="timeBarMarks"
        :show-stops="false"
        :range="false"
        class="time-bar"
        @change="changeSilder"
      />
    </div>
    <!-- 画布 -->
    <div id="canvasDiv"></div>
    <!-- 添加批注弹框 -->
    <el-dialog
      title="添加批注"
      :visible.sync="addMarkShow"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="mark-main">
        <div class="each-line">
          <div class="title">批注内容</div>
          <div class="content">
            <el-input
              size="mini"
              type="textarea"
              :rows="3"
              v-model="markObj.content"
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
    <!-- 查看批注 -->
    <el-drawer
      title="查看批注"
      :visible.sync="showMarkVisiable"
      direction="rtl"
    >
      <div
        class="show-mark-div"
        :style="{height:canvas.height-150+'px'}"
        v-if="curOptNode"
      >
        <div
          class="each"
          v-for="(item,index) in curOptNode._cfg.model.notes"
          :key="index"
        >
          <div style="display:flex;">
            <div class="time">{{item.createDate}}</div>
            <div class="creator">（{{item.creatorId}}）提到 ：</div>
          </div>
          <div class="note">{{item.note}}</div>
        </div>
      </div>
      <div class="add-mark-div">
        <el-input
          size="mini"
          type="textarea"
          :rows="3"
          v-model="markObj.content"
          placeholder="请输入批注内容"
        ></el-input>
        <el-button
          type="primary"
          class="mt5"
          size="mini"
          @click="commitMark"
        >追加批注</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import G6 from "@antv/g6";
import insertCss from "insert-css";
// eslint-disable-next-line no-unused-vars
import getTooTipHTML from "../data/tooTip";
import getTipHTML from "../data/toolTipNew"
import nodeNewUI from '../data/newNode/cust_node_newUI'
import custNode from "../data/newNode/cust_node";
import testData from "../mock/testData";
import innerCss from "../data/insertCss";
import mock_mainData from "../mock/FinishData/mainData";
import mock_xyData from "../mock/FinishData/xyData";
import { useMockData, useExColor, isNewUI } from "../config/index";
import { getUpdateNodesPositionList, getNewEdgesList, splitStr, debounce, isDuringDate } from "../utils/common";
import { getXYdata, getMainData, modifyNodesPosition, addMark, addLink, } from "../api/api";
insertCss(innerCss);
let _that = null;
const CONFIG = window._SERVERCONF

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {},
  data () {
    return {
      win: { height: 0, width: 0 }, //window对象
      canvas: { height: 0, width: 0, offset_hei: 40 }, //画布对象
      sourceData: {}, //数据源
      graph: null, //graph全局对象
      lineType: "polyline", //线条样式(line,polyline,quadratic,cubic,arc)
      lineColor: "#cccccc", //线条颜色
      lineThick: 2, //线条粗细
      toolTip: "", //提示框内容
      toolBar: null, //工具栏
      minimap: null, //小地图
      rightMenu: null, //右键菜单
      //-------------------
      start_x: 100, //起始点X
      node_wid: 150, //单个节点宽度
      node_hei: 50, //单个节点高度
      curOptNode: null, //当前操作的节点
      dataType: "real", //数据形式
      configId: 1, //配置id（1-内网台式机，2-会议室大屏）
      //部门
      depData: [
        { name: "部门1" },
        { name: "部门2" },
        { name: "部门3" },
        { name: "部门4" },
        { name: "部门5" }
      ], //部门数据
      dep_num: 5, //部门数量
      //网格信息
      gird: {},
      //配置
      config: { type: 1, lineBrokenOffset: 20 },
      //时间轴
      timeBar: null, //时间轴
      timeBarData: [
        { weekNo: 1, end: "2021-01-01", begin: "2021-01-11" },
        { weekNo: 2, end: "2021-01-24", begin: "2021-01-18" },
        { weekNo: 3, end: "2021-01-31", begin: "2021-01-25" },
        { weekNo: 4, end: "2021-01-07", begin: "2021-01-01" },
        { weekNo: 5, end: "2021-01-14", begin: "2021-01-08" },
        { weekNo: 6, end: "2021-01-21", begin: "2021-01-15" },
        { weekNo: 7, end: "2021-01-28", begin: "2021-01-22" },
        { weekNo: 8, end: "2021-01-05", begin: "2021-01-29" },
        { weekNo: 9, end: "2021-01-12", begin: "2021-01-06" },
        { weekNo: 10, end: "2021-01-19", begin: "2021-01-13" }
      ], //时间轴数据
      timeBarHei: 40, //时间轴高度
      timeBarMarks: { 1: "" }, //时间轴标注
      animSec: 1, //移动动画时长
      curWeek: 1, //当前显示周
      //批注
      showSingleMark: false, //是否单独显示批注节点
      markNodes: [], //批注节点集合
      addMarkShow: false, //添加批注弹框显示标识
      markObj: { content: "" }, //批注内容对象
      showMarkVisiable: false, //查看批注弹框显示标识
      //节点移动、连线
      img: require("../assets/image/logo.png"),
      saveDisabled: true, //保存标识
      nodeMoveList: [], //节点移动数据集
      addEdgesList: [] //新增连线数据集
    };
  },
  computed: {},
  mounted () {
    this.initConfig()
    if (this.dataType === "mock") {
      this.initWindow();
      this.sourceData = this.initData(
        testData({
          height: this.canvas.height,
          width: this.canvas.height,
          way: this.dep_num
        })
      );
      this.initG6();
      this.printGrid();
    } else {
      this.requestXYData();
    }
  },
  methods: {
    /**
     * 请求部门记时间轴数据
     */
    async requestXYData () {
      let responseData = {};
      console.log("useMockData", useMockData);
      if (useMockData) {
        responseData = mock_xyData;
      } else {
        responseData = await getXYdata();
      }
      this.depData = responseData.data.Y;
      this.timeBarData = responseData.data.X;
      this.dep_num = this.depData.length;
      console.log(`部门数据(${this.dep_num}):`, this.depData);
      console.log(`时间轴数据(${this.timeBarData.length}):`, this.timeBarData);
      this.requestMainData();
    },
    /**
     * 请求全局节点数据
     */
    async requestMainData () {
      let responseData = {};
      if (useMockData) {
        responseData = mock_mainData;
      } else {
        responseData = await getMainData(this.config.type);
      }

      console.log("请求全局节点数据:", responseData);
      //开始初始化
      this.initWindow();
      this.sourceData = this.initData(responseData.data);
      this.initG6();
      this.printGrid();
      // this.goToCurWeek()
    },
    /**
     * 初始化G6
     */
    async initG6 () {
      // const snapLine = new G6.SnapLine();
      // const gird = new G6.Grid({
      //   img: this.img
      // });
      G6.Util.processParallelEdges(
        this.sourceData.edges,
        80,
        "quadratic",
        "polyline",
        "loop"
      );
      this.graph = new G6.Graph({
        container: "canvasDiv",
        width: this.canvas.width,
        height: this.canvas.height + this.canvas.offset_hei,
        groupByTypes: false,
        fitView: false,
        fitViewPadding: 0,
        fitCenter: false,
        linkCenter: false,
        animate: true,
        enabledStack: true,
        renderer: "canvas",
        modes: {
          default: [
            "brush-select",
            "shortcuts-call",
            {
              type: "drag-node",
              shouldBegin: e => {
                const model = e.item.getModel();
                if (model.method === "block" || model.method === "line") {
                  return false;
                }
                return true;
              }
            },
            { type: "create-edge", trigger: "click", key: "shift" },
            {
              type: "drag-canvas",
              direction: "x",
              allowDragOnItem: true
            },
            { type: "scroll-canvas", direction: "x" },
          ] //'drag-canvas', 'drag-node','zoom-canvas', 'drag-node'
        },
        plugins: [this.toolTip, this.rightMenu],
        //默认节点设置
        defaultNode: {
          size: [150, 50],
          color: "#000",
          style: {
            cursor: "pointer",
            lineWidth: 2
          }
        },
        //默认连线设置
        defaultEdge: {
          color: this.lineColor,
          type: this.lineType, //（quadratic-二阶贝塞尔曲线；cubic-三阶贝塞尔曲线）
          controlPoints: [],
          labelCfg: {
            autoRotate: true,
            refY: -10
          },
          style: {
            lineWidth: this.lineThick,
            color: this.lineColor,
            endArrow: true,
            radius: 0,
            offset: this.config.lineBrokenOffset
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
        },
      });
      //-------测试数据start-------
      this.sourceData.nodes.forEach(node => {
        if (node.method === "line") {
          // node.color = 'blue'
          node.color = '#e6e6e6'
          // node.height = _that.canvas.height + _that.canvas.offset_hei
        }
      });
      //--------测试数据end--------
      this.graph.data(this.sourceData);
      this.graph.render();
      this.graph.zoomTo(1.0);

      this.graph.getNodes().forEach(node => {
        if (node._cfg.model.method === "block") {
          node.toBack();
        }
      });

      //监听：节点单击
      this.graph.on("node:click", function (e) {
        const item = e.item;
        // console.log(e);
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
        if (
          item._cfg.model.method === "line" ||
          item._cfg.model.method === "block"
        ) {
          _that.clearAllStats();
          return;
        }
        //---高亮---
        _that.graph.setAutoPaint(false);
        _that.graph.getNodes().forEach(function (node) {
          _that.graph.clearItemStates(node);
          if (!node._cfg.model.method) {
            _that.graph.setItemState(node, "dark", true);
          }
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
      //监听：节点拖拽
      // eslint-disable-next-line no-unused-vars
      this.graph.on("node:drag", e => {
        if (!e.item._cfg.model.method) {
          _that.graph.updateBehavior(
            "drag-canvas",
            { allowDragOnItem: false },
            "default"
          );
        }
        if (e.item._cfg.model.method === "block") {
          _that.graph.updateBehavior(
            "drag-canvas",
            { allowDragOnItem: true },
            "default"
          );
        }
      });
      //监听：画布拖拽完成
      this.graph.on("canvas:dragend", e => {
        const of_x = e.x - e.canvasX
        const moveWeek = Math.floor(of_x / _that.gird.width) + 1
        // console.log(`of_x:${of_x},week:${moveWeek}`)
        if (_that.curWeek !== moveWeek) {
          //周改变
          _that.curWeek = moveWeek
          const weekObj = this.timeBarData.filter(item => {
            return (item.weekNo === _that.curWeek)
          })
          // console.log('weekObj', weekObj)
          if (_that.curWeek && weekObj.length) {
            this.$message({ message: `第${_that.curWeek}周，${weekObj[0].begin} 至 ${weekObj[0].end}`, });
          }
        }
      });
      //监听：节点拖拽完成
      this.graph.on("node:dragend", e => {
        if (e.item._cfg.model.method === 'block') return;
        const modelItem = {
          configId: this.configId,
          nodeId: e.item._cfg.model.id,
          nodeX: e.item._cfg.model.x,
          nodeY: e.item._cfg.model.y
        };
        console.log("node拖拽完成:", modelItem);
        _that.graph.updateBehavior(
          "drag-canvas",
          { allowDragOnItem: true },
          "default"
        );
        _that.nodeMoveList = getUpdateNodesPositionList(
          _that.nodeMoveList,
          modelItem
        );
        console.log("nodeMoveList内容:", _that.nodeMoveList);
        _that.saveDisabled =
          _that.addEdgesList.length === 0 && _that.nodeMoveList.length === 0;
      });
      //监听：增加连线
      this.graph.on("aftercreateedge", e => {
        const curEdge = {
          fromNodeClassId: e.edge._cfg.source._cfg.model.icon,
          fromNodeId: e.edge._cfg.source._cfg.model.id,
          toNodeClassId: e.edge._cfg.target._cfg.model.icon,
          toNodeId: e.edge._cfg.target._cfg.model.id
        };
        console.log("增加连线:", curEdge);
        _that.addEdgesList = getNewEdgesList(_that.addEdgesList, curEdge);
        const edges = _that.graph.save().edges;
        G6.Util.processParallelEdges(
          edges,
          80,
          "quadratic",
          "polyline",
          "loop"
        );
        _that.graph.getEdges().forEach((edge, i) => {
          _that.graph.updateItem(edge, {
            curveOffset: edges[i].curveOffset,
            curvePosition: edges[i].curvePosition
          });
        });
        _that.saveDisabled =
          _that.addEdgesList.length === 0 && _that.nodeMoveList.length === 0;
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
     * 初始化右键菜单
     */
    initMenu () {
      this.rightMenu = new G6.Menu({
        getContent (e) {
          const item = e.item.getModel();
          let con = ``;
          if (item.method === "block") {
            //背景节点无右键菜单
            con = ``;
          } else if (item.notes !== "") {
            con = `
            <div class="left-menu">
              <button class="btn btn-small submit bounce-left" fnname="showMark">查看批注</button>
              <button class="btn btn-small submit bounce-left" fnname="showNodeRelation">查看关系详情</button>
            </div>`;
          } else {
            con = `
            <div class="left-menu">
              <button class="btn btn-small submit bounce-left" fnname="addMark">添加批注</button>
              <button class="btn btn-small submit bounce-left" fnname="showNodeRelation">查看关系详情</button>
            </div>`;
          }
          return con;
        },
        handleMenuClick: (target, item) => {
          // console.log(target, item)
          _that.curOptNode = item;
          const cur = this.curOptNode._cfg.model;
          const page = _that.$router.resolve({
            path: "/auto",
            query: { nodeId: cur.id }
          });
          console.log("curOptNode:", _that.curOptNode);
          switch (target.getAttribute("fnname")) {
            case "addMark":
              _that.addMarkShow = true;
              break;
            case "showMark":
              _that.showMarkVisiable = true;
              _that.markObj.content = "";
              break;
            case "showNodeRelation":
              window.open(page.href, "_blank");
              break;
            default:
              break;
          }
        },
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: -30,
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
        position: { x: _that.win.width - 84, y: 10 }
      });
    },
    /**
     * 初始化tooltip
     */
    initToolTip () {
      this.toolTip = new G6.Tooltip({
        offsetX: 50,
        offsetY: 0,
        // fixToNode: [1, 0.5],
        trigger: "click",
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node", "edge"],
        shouldBegin: e => {
          const model = e.item.getModel();
          if ((model.method === "block") || (model.method === "line")) {
            return false;
          }
          return true;
        },
        // 自定义 tooltip 内容
        getContent: e => {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          outDiv.style.height = "fit-content";
          const model = e.item.getModel();
          if (e.item.getType() === "node") {
            if (model.method === "line") {
              //标示线节点
              outDiv.innerHTML = model.label + `(${model.x},${model.y})`;
            } else {
              //普通节点
              outDiv.innerHTML = isNewUI ? getTipHTML(model) : getTooTipHTML(model)
            }
          }
          // else {
          //   const source = e.item.getSource();
          //   const target = e.item.getTarget();
          //   outDiv.innerHTML = `来源：${source.getModel().label}<br/>去向：${target.getModel().label
          //     }`;
          // }
          return outDiv;
        }
      });
    },
    /**
     * 清空焦点高亮
     */
    clearAllStats () {
      const that = this;
      that.graph.setAutoPaint(false);
      that.graph.getEdges().forEach(function (edge) {
        that.graph.clearItemStates(edge);
        edge.toBack();
      });
      that.graph.getNodes().forEach(function (node) {
        that.graph.clearItemStates(node);
        if (node._cfg.model.method === "block") {
          node.toBack();
        }
      });
      that.graph.paint();
      that.graph.setAutoPaint(true);
    },
    /**
     * 数据形式改变
     */
    async changeDataType (val) {
      this.dataType = val;
      if (this.dataType === "mock") {
        this.sourceData = this.initData(
          testData({
            height: this.canvas.height,
            width: this.canvas.height,
            way: this.dep_num
          })
        );
      } else {
        let xyRsp = {};
        if (useMockData) {
          xyRsp = mock_xyData;
        } else {
          xyRsp = await getXYdata();
        }
        this.depData = xyRsp.data.Y;
        this.timeBarData = xyRsp.data.X;
        this.dep_num = this.depData.length;
        console.log(`部门数据(${this.dep_num}):`, this.depData);
        console.log(
          `时间轴数据(${this.timeBarData.length}):`,
          this.timeBarData
        );
        let mainRsp = {};
        if (useMockData) {
          mainRsp = mock_mainData;
        } else {
          mainRsp = await getMainData(this.config.type);
        }
        console.log("请求全局节点数据:", mainRsp.data);
        this.sourceData = this.initData(mainRsp.data);
      }
      this.graph.changeData(this.sourceData);
    },

    /**
     * 初始化节点
     */
    initData (data) {
      //加入周节点
      // const lineData = lineNode({ height: this.canvas.height, width: this.canvas.height, way: this.dep_num })
      // console.log('lineData:', lineData)
      // lineData.nodes.forEach(element => {
      //   data.nodes.push(element)
      // })
      this.timeBarData.forEach((element, index) => {
        const weekObj = {
          id: "week_" + element.weekNo,
          label:
            "第" + element.weekNo + "周，" + element.begin + "至" + element.end,
          method: "line",
          begin: element.begin,
          end: element.end,
          // x: 100 + _that.gird.gap * (4 * index) + _that.node_wid * (4 * index),
          x: 100 + index * this.gird.width,
          y: 0,
          width: 1,
          height: _that.canvas.height + _that.canvas.offset_hei,
          color: this.timeBarData.length === index + 1 ? "red" : "#e6e6e6",
          dotline: this.timeBarData.length !== index + 1
        };
        const blockObj = {
          id: "block_" + element.weekNo,
          index: index,
          label: `第${element.weekNo}周，${element.begin}至${element.end}`,
          method: "block",
          begin: element.begin,
          end: element.end,
          // x: 100 + _that.gird.gap * (4 * index) + _that.node_wid * (4 * index),
          x: 100 + index * this.gird.width,
          y: 0,
          width: _that.gird.width,
          height: _that.canvas.height + _that.canvas.offset_hei
        };
        data.nodes.push(weekObj);
        if (useExColor) {
          data.nodes.unshift(blockObj);
        }
      });
      //遍历节点
      this.markNodes = [];
      data.nodes.forEach(element => {
        //节点样式
        if (element.id <= 20 || element.icon === "task") {
          element.type = isNewUI ? "custNode_task_new" : "custNode_task";
        } else if (
          (element.id > 20 && element.id <= 99) ||
          element.icon === "MeetingInfo"
        ) {
          element.type = isNewUI ? "custNode_meet_new" : "custNode_meet";
        } else if (element.icon === "im" || element.icon === "Im") {
          element.type = isNewUI ? "custNode_chat_new" : "custNode_chat";
        } else if (element.method === "line") {
          element.type = isNewUI ? "custNode_line_new" : "custNode_line";
        } else if (element.method === "block") {
          element.type = isNewUI ? "custNode_block_new" : "custNode_block";
        } else if (element.method === "mark") {
          element.type = "custNode_mark";
        } else {
          element.type = isNewUI ? "custNode_tool_new" : "custNode_chat";
        }
        //节点坐标微调
        if (element.y > 0) {
          element.y += 0;
        }
        //完成标识
        if (element.endDate === "") {
          element.unfinish = false;
        } else {
          element.unfinish = false;
        }
        //批注节点收集
        if (element.notes) {
          const markItem = element.notes[0];
          let content = "";
          element.notes.forEach(each => {
            content += `${each.note}，`;
          });
          const mark_node = {
            id: markItem.innerId,
            label: "批注",
            method: "mark",
            x: markItem.noteX,
            y: markItem.noteY,
            content: splitStr(content, 13),
            type: "custNode_mark"
          };
          this.markNodes.push(mark_node);
        }
      });
      if (this.showSingleMark) {
        this.markNodes.forEach(item => {
          data.nodes.push(item);
        });
      }
      //初始化silder-mark
      _that.timeBarData.forEach((element, i) => {
        _that.timeBarMarks[i + 1] = element.begin;
      });
      console.log("【批注数据】", this.markNodes);
      console.log("【all节点数据】", data);
      return data;
    },
    /**
     * 初始化自定义节点
     */
    initJsxNode () {
      //自定义节点
      G6.registerNode("custNode_task", {
        jsx: custNode.task_node
      });
      G6.registerNode("custNode_chat", {
        jsx: custNode.chat_node
      });
      G6.registerNode("custNode_meet", {
        jsx: custNode.meet_node
      });
      G6.registerNode("custNode_mark", {
        jsx: custNode.mark_node
      });
      G6.registerNode("custNode_line", {
        jsx: custNode.line_node
      });
      G6.registerNode("custNode_block", {
        jsx: custNode.block_node
      });
      //新UI节点
      G6.registerNode("custNode_task_new", {
        jsx: nodeNewUI.task_node
      });
      G6.registerNode("custNode_meet_new", {
        jsx: nodeNewUI.meet_node
      });
      G6.registerNode("custNode_chat_new", {
        jsx: nodeNewUI.chat_node
      });
      G6.registerNode("custNode_tool_new", {
        jsx: nodeNewUI.tool_node
      });
      G6.registerNode("custNode_line_new", {
        jsx: nodeNewUI.line_node
      });
      G6.registerNode("custNode_block_new", {
        jsx: nodeNewUI.block_node
      });
    },
    /**
     * 部门点击过滤
     */
    depClick (depName) {
      this.graph.setAutoPaint(false);
      this.graph.getNodes().forEach(function (node) {
        _that.graph.clearItemStates(node);
        _that.graph.setItemState(node, "dark", true);
        const name = node._cfg.model.deptName;
        if (name === depName) {
          //部门高亮
          _that.graph.setItemState(node, "highlight", true);
        }
      });
      this.graph.paint();
      this.graph.setAutoPaint(true);
    },
    /**
     * 立即跳转至当前周
     */
    goToCurWeek () {
      const nowWeek = this.timeBarData.filter(item => {
        return (isDuringDate(item.begin, item.end) === true)
      })
      if (nowWeek.length) {
        this.curWeek = nowWeek[0].weekNo
        const descNode = this.graph.findById("week_" + this.curWeek);
        if (descNode) {
          const nodeInfo = descNode._cfg.model;
          this.moveTo(nodeInfo.x, 0);
        }
      }

    },
    /**
     * 切换周
     */
    changeSilder (val) {
      const descNode = this.graph.findById("week_" + val);
      console.log('descNode:', descNode)
      if (descNode) {
        const nodeInfo = descNode._cfg.model;
        this.$message({
          message: `第${val}周，${nodeInfo.begin} 至 ${nodeInfo.end}`,
        });
        this.moveTo(nodeInfo.x);
      } else {
        this.$message.warning("无更多数据");
      }
    },
    /**
     * 周移动
     */
    goWeek (pos) {
      switch (pos) {
        case "prv": //上一周
          if (this.curWeek === 1) {
            this.$message.warning("没有更多上周数据");
            return;
          } else {
            this.curWeek = this.curWeek - 1;
          }
          break;
        case "next": //下一周
          this.curWeek = this.curWeek + 1;
          break;
        case "start": //回起点
          this.curWeek = 1;
          break;
        case "point": //去指定周
          this.curWeek = this.timeBarData.length;
          break;
        default:
          break;
      }
      this.changeSilder(this.curWeek);
    },
    /**
     * 移动到指定点(横坐标)
     */
    moveTo (x, sec = 1) {
      const offsetX = 28
      const offsetY = 10
      this.graph.moveTo(0 - (x - 197 + offsetX), 0 - offsetY, true, {
        duration: sec * 1000
      });
    },
    /**
     * 时间轴格式化提示
     */
    formatTooltip (val) {
      if (val) {
        return this.timeBarData[val - 1].begin;
      }
      return "";
    },
    /**
     * 添加批注提交
     */
    async commitMark () {
      if (this.markObj.content === "") {
        this.$message.warning("请输入批注内容");
        return;
      }
      const cur = this.curOptNode._cfg.model;
      const requestData = {
        configId: this.config.type,
        creatorId: "creatorId",
        departmentName: cur.deptName || "",
        nodeId: cur.id || "",
        note: this.markObj.content,
        noteX: cur.x + this.node_wid / 2,
        noteY: cur.y - this.node_hei / 2
      };
      const responseData = await addMark(requestData);
      if (responseData.data.code === 200) {
        this.$message.success("批注添加成功");
        const addData = responseData.data.data;
        if (this.curOptNode._cfg.model.notes === "") {
          this.curOptNode._cfg.model.notes = [];
        }
        this.curOptNode._cfg.model.notes.push(addData);
        console.log(this.curOptNode);
        this.addMarkShow = false;
        this.graph.refreshItem(cur.id);
        // this.reloadPage();
      } else {
        this.$message.error("批注添加失败");
      }
    },
    /**
     * 提交修改节点信息
     */
    async commitChanges () {
      console.log("节点移动数据集:", this.nodeMoveList);
      console.log("新增连线数据集:", this.addEdgesList);
      if (this.nodeMoveList.length) {
        const rsp_node = await modifyNodesPosition(this.nodeMoveList);
        console.log(rsp_node);
        if (rsp_node.data.code === 200) {
          this.$message.success("`节点信息保存成功");
          // this.reloadPage();
        } else {
          this.$message.error("`节点信息保存失败");
        }
      }
      if (this.addEdgesList.length) {
        const rsp_edge = await addLink(this.addEdgesList);
        console.log(rsp_edge);
        if (rsp_edge.data.code === 200) {
          this.$message.success("`关系保存成功");
          // this.reloadPage();
        } else {
          this.$message.error("关系保存失败");
        }
      }
    },
    /**
     * 初始化窗口
     */
    initWindow () {
      _that = this;
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 0;
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10;
      this.canvas.width = this.win.width;
      // this.canvas.height = this.win.height - this.timeBarHei
      this.canvas.height = this.dep_num * this.gird.height;
      console.log("winWid:" + this.win.width + ",winHei:" + this.win.height);
      console.log("CanvasWid:" + this.canvas.width + ",CanvasHei:" + this.canvas.height);
      this.initMenu();
      this.initToolBar();
      this.initMiniMap();
      this.initToolTip();
      this.initJsxNode();
      //监听窗口改变
      window.addEventListener('resize', debounce(() => {
        _that.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 10
        _that.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 10
        const newWidth = _that.win.width
        const newHeight = _that.dep_num * _that.gird.height
        console.log('窗口大小改变:' + newWidth + '*' + newHeight)
        _that.graph.changeSize(newWidth, newHeight)
      }, 500))
    },
    /**
     * 初始化配置
     */
    initConfig () {
      console.log('配置：', CONFIG)
      this.gird = {
        width: CONFIG.grid_width_flow,
        height: CONFIG.grid_height_flow,
        gap: CONFIG.grid_gap_flow,
      }
    },
    /**
     * 打印网格信息
     */
    printGrid () {
      const eachGridHei = Math.floor(this.canvas.height / this.dep_num);
      console.log(`【eahc：${eachGridHei}】`);
      for (let i = 0; i < this.dep_num; i++) {
        const result = eachGridHei * (i + 1);
        console.log(
          `泳道${i + 1}:(${this.canvas.height} / ${this.dep_num}) * ${i +
          1} = ${result}`
        );
      }
    },
    /**
     * 刷新页面
     */
    reloadPage () {
      setTimeout(() => {
        location.reload();
      }, 1000);
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