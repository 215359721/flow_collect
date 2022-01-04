<template>
  <div class="main-page">
    <div class="opt-level" :style="{zoom:zoom}">
      <el-form :model="form" ref="form" inline label-width="120px">
        <el-form-item id="keyWord" prop="keyWord">
          <el-select size="mini" v-model="form.keyWord" filterable clearable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in keyWordOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="level" v-if="false">
          <el-select size="mini" v-model="form.level" placeholder="请选择">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="layout">
          <el-select
            size="mini"
            v-model="form.layout"
            placeholder="请选择"
          >
            <el-option
              v-for="item in layoutOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
          <el-button type="info" style="width:100px;margin-top:5px;" size="mini" @click="setConf">参数配置</el-button>
          <el-button type="primary" size="mini" @click="areaShow = !areaShow">{{areaShow?'隐藏详情':'显示详情'}}</el-button>
          <el-dropdown size="mini" v-if="false" split-button type="primary" @command="changeLayout" :style="{marginLeft:'10px'}">
            布局切换
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="radiation">语义网辐射树</el-dropdown-item>
              <el-dropdown-item command="mind">语义网脑图树</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </div>
    <div id="graphemeDiv" v-if="isShow"></div>
    <div v-else :style="{zoom:zoom}" class="el-empty">
      <img src="../assets/image/single.png">
      <label>暂无数据</label>
    </div>
    <!-- 左侧区域 -->
    <div v-show="areaShow" class="left-area" :style="{width:boxWidth+'px',top:70*zoom+'px'}">
      <div class="left-box" :style="{height:boxHeight*2 +'px'}">
        <span :style="{zoom:zoom}">高频搜索词汇排行</span>
        <rank-l :zoom="zoom" ref="rank" />
      </div>
    </div>
    <!-- 右侧区域 -->
    <div v-show="areaShow" class="right-area" :style="{height:win.height+20+'px',width:boxWidth+'px',top:50*zoom+'px'}">
      <div class="right-box" :style="{height:boxHeight*2 +'px',overflowY:'auto'}">
        <span :style="{zoom:zoom}">{{curWord}} 相关文章Top10</span>
        <table-s :data="articleData" :zoom="zoom" />
      </div>
      <div class="right-box" :style="{height: boxHeight+'px'}">
        <span :style="{zoom:zoom}">相关度</span>
        <bar-r :zoom="zoom" ref="bar" />
      </div>
    </div>
    <config-s :isShow="showConf" :zoom="zoom" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import G6 from "@antv/g6";
import insertCss from "insert-css";
import loading from "../utils/loading";
// eslint-disable-next-line no-unused-vars
// import graphemeTreeData from "../mock/grapheme-tree";
import { showTooltip } from "../data/tree-tooltip";
import innerCss from "../data/insertCss";
import { getchartDataWithArticle } from "../api/api.js";
import { getTreeNode, getKeywordsList } from "../api/api.js";
import { createUuid } from "../utils/common.js";
import custNode from "../data/task_node";
import { getWinZoom } from "../utils/device"
import { debounce, midyfyClassWithZoom } from "../utils/common";
import commonMixins from '../mixins/commonMixin'
import configS from '../components/config.vue'
// eslint-disable-next-line no-unused-vars
import { useMockData, isNewUI } from "../config/index";
import mock_treeData from "../mock/FinishData/treeData";
import nodeNewUI from '../data/newNode/tree_node_newUI'
import tableS from '../components/charts/table.vue'
import rankL from '../components/charts/rank.vue'
import barR from '../components/charts/bar.vue'
insertCss(innerCss);


export default {
  components: { tableS, rankL, barR, configS },
  mixins: [commonMixins],
  data () {
    return {
      //window对象
      win: {
        height: 0,
        width: 0
      },
      sourceData: {}, //数据源
      graph: null, //graph全局对象
      zoom: 1.0,
      rankDir: "LR", //当前布局方式
      canvasCenter: [0, 0], //画布中心
      toolBar: null, //工具栏
      minimap: null, //小地图
      toolTip: "", //提示框内容
      rightMenu: null, //右键菜单
      showConf: false,//配置
      isShow: false,
      childNodes: [],
      isRender: false,
      selectNode: undefined,
      curWord: '',
      form: {
        level: 2,
        keyWord: "",
        layout: "mind"
      },
      levelOptions: [
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        }
      ],
      layoutOptions: [
        {
          value: "radiation",
          label: "语义网辐射树"
        },
        {
          value: "mind",
          label: "语义网脑图树"
        }
      ],
      centerNode: undefined,
      keyWordOptions: [],
      list: [],
      loading: false,
      firstLoading: true,
      //左侧图表
      pieData: [],
      barData: [],
      //右侧图表
      articleData: [],
      topData: [],
      xgdData: [],
      lineData: [],
      areaShow: false,
      boxWidth: 0,
      boxHeight: 0,
      //已经存在的列表
      hasShowList: '',
    };
  },
  computed: {},
  created () {
    this.zoom = getWinZoom()
    this.getParams();
  },
  mounted () {
    this.form.keyWord = this.__CONFIG.yyw_defword
  },
  methods: {
    //获得相关度图表数据
    getXgdList (data) {
      this.xgdData = []
      if (data.children.length) {
        data.children.forEach(edge => {
          const xgd = edge.xgd
          if (edge.children.length) {
            edge.children.forEach(node => {
              const item = {
                name: node.name,
                value: xgd,
              }
              this.xgdData.push(item)
            })
          }
        });
      }
      console.log('相关度数据:', this.xgdData)
      this.$refs.bar.initChart(this.boxWidth - 50 * this.zoom, this.boxHeight - 30 * this.zoom, this.xgdData)
    },
    //拉取右侧图表数据
    getRightData () {
      this.requestArticleData()
    },
    //根据关键词搜索相关文章
    async requestArticleData () {
      if (!useMockData) {
        // console.log('文章关键词:',this.curWord)
        const rspArt = await getchartDataWithArticle(this.curWord)
        const arcList = JSON.parse(rspArt.data.msg)
        this.articleData = []
        arcList.hits.forEach((item, index) => {
          const obj = {
            index: (index + 1),
            id: item._source.docid,
            name: item._source.docname
          }
          this.articleData.push(obj)
        })
      }
      console.log('文章:', this.articleData)
    },
    // 获取初始树节点
    async getTreeNode () {
      if (!this.selectNode) {
        const params = {
          layer: this.form.level,
          type: this.form.keyWord,
          hasShowList: this.hasShowList,
        };
        this.curWord = this.form.keyWord
        console.log("获取初始树节点-搜索节点", params);
        let res = '', resData = ''
        if (useMockData) {
          resData = mock_treeData
        } else {
          res = await getTreeNode(params);
          resData = res.data
        }
        this.hasShowList = resData.shown || ''
        this.sourceData = this.initData(resData);
        this.centerNode = this.sourceData;
      } else {
        const params = {
          layer: this.form.level,
          type: this.selectNode.getModel().name,
          hasShowList: this.hasShowList,
        };
        this.curWord = this.selectNode.getModel().name
        console.log("获取初始树节点-点击节点", params);
        const res = await getTreeNode(params);
        this.hasShowList = res.data.shown || ''
        this.childNodes = res.data;
        if (this.childNodes && this.childNodes.children.length) {
          await this.recursionConcat(this.sourceData);
        }
      }
      this.getRightData()
    },
    // 递归拼接children
    recursionConcat (data) {
      let processedData;
      if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
        processedData = [data];
      } else if (
        Object.prototype.toString.call(data).slice(8, -1) === "Array"
      ) {
        processedData = data;
      }
      processedData.map(async item => {
        if (item.type === "custTree_rela_newUI") {
          if (item.name === '范畴') {
            item.xgd = 0.9
          }
          if (item.name === 'F') {
            item.xgd = 0.8
          }
          if (item.name === 'D') {
            item.xgd = 0.7
          }
          if (item.name === 'Z') {
            item.xgd = 0.6
          }
          if (item.name === 'S') {
            item.xgd = 0.5
          }
          if (item.name === 'C') {
            item.xgd = 0.4
          }
        }
        if (item.id === this.selectNode.getModel().id) {
          const formateData = await this.initData(this.childNodes);
          item.children = formateData.children;
          this.isRender = true;

        } else {
          if (item.children && item.children.length) {
            if (item.type === "custTree_rela_newUI") { console.log(item.name) }
            this.recursionConcat(item.children);
          }
        }
      });
    },
    // 脑图树node点击事件
    async handleMindNodeClick (event) {
      loading.show();
      this.isRender = false;
      this.selectNode = event.item;
      if (
        this.selectNode.getModel().type === "custTree_node" &&
        !this.selectNode.getModel().children.length
      ) {
        console.log('拉取新数据')
        await this.getTreeNode(this.selectNode);
      }
      if (this.isRender && !this.selectNode.getModel().collapsed) {
        console.log('折叠数据')
        this.graph.changeData(this.sourceData);
        this.graph.fitCenter();
        this.graph.zoom(1.2, {
          x: this.win.width / 2,
          y: this.win.height / 2
        });
      }
      console.log("聚焦节点：", this.selectNode.getModel());
      this.getXgdList(this.selectNode.getModel())
      this.curWord = this.selectNode.getModel().name
      this.graph.focusItem(this.selectNode.getModel().id, true, {
        duration: 400
      });
      this.graph.getNodes().forEach(node => {
        this.graph.clearItemStates(node);
        this.graph.setItemState(node, "dark", true);
      });
      this.graph.setItemState(this.selectNode._cfg.id, "dark", false);
      this.graph.setItemState(this.selectNode._cfg.id, "highlight", true);
      loading.hide();
      this.getRightData()
    },
    // 辐射树node点击事件
    async handleRadiaNodeClick (event) {
      loading.show();
      this.isRender = false;
      this.selectNode = event.item;
      if (
        this.selectNode.getModel().type === "custTree_node" &&
        !this.selectNode.getModel().children.length
      ) {
        await this.getTreeNode(this.selectNode);
      }
      if (this.isRender && !this.selectNode.getModel().collapsed) {
        this.graph.changeData(this.sourceData);
        this.graph.fitCenter();
        this.graph.zoom(1.2, {
          x: this.win.width / 2,
          y: this.win.height / 2
        });
      }
      this.graph.focusItem(this.selectNode.getModel().id);
      this.graph.getNodes().forEach(node => {
        this.graph.clearItemStates(node);
        this.graph.setItemState(node, "dark", true);
      });
      this.graph.setItemState(this.selectNode._cfg.id, "dark", false);
      this.graph.setItemState(this.selectNode._cfg.id, "highlight", true);
      loading.hide();
    },
    // 初始化辐射树G6
    async initG6 () {
      const container = document.getElementById("graphemeDiv");
      this.graph = new G6.TreeGraph({
        container: container,
        width: this.win.width,
        height: this.win.height,
        linkCenter: true,
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange (item, collapsed) {
                const data = item.get("model");
                data.collapsed = collapsed;
                return true;
              }
              // 关系节点不发生折叠
              // shouldBegin: (e) => {
              //   // 若当前操作的节点 type 不为 'custTree_node'，则不发生 collapse-expand
              //   if (e.item && e.item.getModel().type !== "custTree_node") return false;
              //   return true;
              // },
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        plugins: [this.toolBar, this.toolTip, this.minimap, this.rightMenu],
        nodeStateStyles: {
          highlight: {
            stroke: "#eaff8f",
            lineWidth: 5
          },
          dark: {
            opacity: 0.5
          }
        },
        defaultNode: {
          style: {
            cursor: "pointer"
          },
          labelCfg: {
            position: "bottom",
            offset: 10,
            style: {
              // ... 文本样式的配置
            }
          }
        },
        layout: {
          type: "dendrogram",
          direction: "LR",
          nodeSep: 20,
          rankSep: 100,
          radial: true
        }
      });
      this.graph.node(node => {
        if (node.type === "node" || node.type === "custTree_node") {
          if (node.name.length > 10) {
            return {
              label: node.name.substring(0, 10) + "..."
            };
          } else {
            return {
              label: node.name
            };
          }
        } else {
          return {
            label: ""
          };
        }
      });
      this.graph.data(this.sourceData);
      this.graph.render();
      this.graph.fitCenter();
      this.graph.zoom(1.2, {
        x: this.win.width / 2,
        y: this.win.height / 2
      });
      this.graph.on("node:click", this.handleRadiaNodeClick);
      //监听：canvas点击
      this.graph.on("canvas:click", () => {
        this.clearAllStats();
      });
    },
    // 初始化脑图树G6
    initMindG6 () {
      const container = document.getElementById("graphemeDiv");
      this.graph = new G6.TreeGraph({
        container: container,
        width: this.win.width,
        height: this.win.height,
        linkCenter: true,
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange (item, collapsed) {
                const data = item.get("model");
                data.collapsed = collapsed;
                return true;
              }
              // 关系节点不发生折叠
              // shouldBegin: (e) => {
              //   // 若当前操作的节点 type 不为 'custTree_node'，则不发生 collapse-expand
              //   if (e.item && e.item.getModel().type !== "custTree_node") return false;
              //   return true;
              // },
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        plugins: [this.toolBar, this.toolTip, this.minimap, this.rightMenu],
        nodeStateStyles: {
          highlight: {
            stroke: "#eaff8f",
            lineWidth: 5
          },
          dark: {
            opacity: 0.5
          }
        },
        defaultNode: {
          style: {
            cursor: "pointer",
            lineWidth: 3
          },
          anchorPoints: [[0, 0.5], [1, 0.5]]
        },
        defaultEdge: {
          type: "cubic-horizontal",
          color: "#888",
          style: {
            lineWidth: 3
          }
        },
        layout: {
          type: ((this.__CONFIG.yyw_pos === "hor") ? "mindmap" : "compactBox"),//mindmap,compactBox
          direction: "TB",//（H\V）
          getHeight: () => {
            return 90;
          },
          getWidth: () => {
            return 50;
          },
          getVGap: () => {
            return 40;
          },
          getHGap: node => {
            if (node.type === "edge") {
              return 10;
            }
            return 60;
          },
          getSide: () => {
            return "right";
          }
        }
      });
      let centerX = 0;
      this.graph.node(node => {
        if (node.id === this.centerNode.id) {
          centerX = node.x;
        }
        if (node.type === "node" || node.type === "custTree_node") {
          let showLabel = "";
          if (node.name.length > 10) {
            showLabel = node.name.substring(0, 10) + "...";
          } else {
            showLabel = node.name;
          }
          return {
            label: showLabel,
            labelCfg: {
              position:
                node.children && node.children.length > 0
                  ? "right"
                  : node.x > centerX
                    ? "right"
                    : "left",
              offset: 5
            }
          };
        } else {
          return {
            label: "",
            labelCfg: {
              position: "",
              offset: 5
            }
          };
        }
      });
      this.graph.data(this.sourceData);
      this.graph.render();
      this.graph.fitCenter();
      // this.graph.layout(true);
      this.graph.zoom(this.zoom * 1.2, {
        x: this.win.width / 2,
        y: this.win.height / 2
      });
      console.log("初始化G6脑图树【完成】", this.sourceData);
      this.getXgdList(this.sourceData)
      this.graph.on("node:click", this.handleMindNodeClick);
      // 监听：canvas点击
      this.graph.on("canvas:click", () => {
        this.clearAllStats();
      });
      this.graph.on("canvas:drag", () => {
        // this.areaShow = false
      });
      //更新class
      midyfyClassWithZoom('g6-component-toolbar', this.zoom)
    },
    // 切换布局
    changeLayout (val) {
      if (Object.keys(this.sourceData).length) {
        loading.show();
        this.graph.clear();
        this.graph.destroy();
        this.initMenu();
        this.initToolBar();
        this.initMiniMap();
        this.initToolTip();
        if (val === "mind") {
          this.initMindG6();
        } else {
          this.changeStyle(this.sourceData);
          this.initG6();
          this.graph.focusItem(this.selectNode.getModel().id);
        }
        // 切换布局后保持选中节点高亮及位于中心位置
        if (this.selectNode && Object.keys(this.selectNode).length) {
          this.graph.getNodes().forEach(node => {
            this.graph.clearItemStates(node);
            this.graph.setItemState(node, "dark", true);
          });
          this.graph.setItemState(this.selectNode._cfg.id, "dark", false);
          this.graph.setItemState(this.selectNode._cfg.id, "highlight", true);
        }
        this.graph.paint();
        loading.hide();
      }
    },
    // 初始化小地图
    initMiniMap () {
      this.minimap = new G6.Minimap({
        size: [this.boxWidth - 35 * this.zoom, this.boxHeight - 30 * this.zoom]
      });
    },
    // 初始化工具栏
    initToolBar () {
      this.toolBar = new G6.ToolBar({
        position: { x: 10, y: 10 }
      });
      this.$nextTick(() => {
        const toolBarDom = document.getElementsByClassName(
          "g6-component-toolbar"
        );
        const redoText = toolBarDom[0].childNodes[0];
        const redo = toolBarDom[0].childNodes[1];
        const undoText = toolBarDom[0].childNodes[2];
        const undo = toolBarDom[0].childNodes[3];
        toolBarDom[0].removeChild(redoText);
        toolBarDom[0].removeChild(redo);
        toolBarDom[0].removeChild(undoText);
        toolBarDom[0].removeChild(undo);
      });
    },
    // 初始化窗口
    initWindow () {
      console.log('初始化窗口zoom:', this.zoom)
      this.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 70;
      this.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 70;
      this.canvasCenter = [this.win.width / 2, this.win.height / 2];
      this.initJsxNode();
      const _that = this
      this.boxWidth = 400 * this.zoom
      this.boxHeight = this.win.height / 3.3
      //监听窗口改变
      window.addEventListener('resize', debounce(() => {
        _that.win.height = (document.documentElement.clientHeight || document.body.clientHeight) - 70;
        _that.win.width = (document.documentElement.clientWidth || document.body.clientWidth) - 70;
        console.log('窗口大小改变:' + _that.win.width + '*' + _that.win.height)
        _that.graph.changeSize(_that.win.width, _that.win.height)
      }, 500))
    },
    // 清空焦点高亮
    clearAllStats () {
      const that = this;
      this.selectNode = undefined;
      that.graph.setAutoPaint(false);
      that.graph.getNodes().forEach(node => {
        that.graph.clearItemStates(node);
      });
      that.graph.getEdges().forEach(edge => {
        that.graph.clearItemStates(edge);
      });
      that.graph.paint();
      that.graph.setAutoPaint(true);
    },
    // 初始化tooltip
    initToolTip () {
      this.toolTip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        fixToNode: [1, 0.5],
        // trigger: "click",
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node"],
        // 是否允许tooltip出现
        shouldBegin: e => {
          // 若当前操作的节点 type 不为 'node'，则不展示
          if (e.item && e.item.getModel().type !== "custTree_node")
            return false;
          return true;
        },
        // 自定义 tooltip 内容
        getContent: e => {
          const item = e.item.getModel();
          if (e.item.getModel().type === "custTree_node") {
            const outDiv = document.createElement("div");
            const data = {
              name: item.name,
              path: item.img,
              desc: item.explain
            };
            outDiv.innerHTML = showTooltip(data, this.zoom);
            return outDiv;
          } else {
            return "关系节点";
          }
        }
      });
    },
    // 初始化右键菜单
    initMenu () {
      this.rightMenu = new G6.Menu({
        // 是否允许tooltip出现
        shouldBegin: e => {
          // 若当前操作的节点 type 不为 'custTree_node'，则不展示
          if (e.item && e.item.getModel().type !== "custTree_node")
            return false;
          return true;
        },
        getContent () {
          return `
              <ul id="rightMenu" class="tree-right-menu">
                <li class="tree-menu-btn">详情展示</li>
                <li class="tree-menu-btn">置位关键词</li>
                <li class="tree-menu-btn">搜索</li>
              </ul>`;
        },
        handleMenuClick: (target, item) => {
          if (target.innerHTML === "详情展示") {
            this.areaShow = true
          }
          if (target.innerHTML === "置位关键词") {
            const url =
              "http://" +
              window.location.host +
              "/#/grapheme?keyWord=" +
              encodeURIComponent(item.getModel().name);
            window.open(url);
          }
          if (target.innerHTML === "搜索") {
            const keyword = item.getModel().name
            console.log('搜索关键词【' + keyword + '】')
            const searchURL = 'asp-modal://searchfileall?keyword=' + keyword
            console.log('搜索关键词URL:' + searchURL)
            window.openURL(searchURL)
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
    // 脑图树布局切换辐射树改变样式
    changeStyle (data) {
      let processedData;
      if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
        processedData = [data];
      } else if (
        Object.prototype.toString.call(data).slice(8, -1) === "Array"
      ) {
        processedData = data;
      }
      processedData.forEach(item => {
        item.labelCfg.position = "bottom";
        item.labelCfg.offset = 10;
        if (item.children && item.children.length) {
          this.changeStyle(item.children);
        }
      });
      return data;
    },
    /**
     * 参数配置
     */
    setConf () {
      this.showConf = new Boolean(true)
    },
    // 初始化数据
    initData (data) {
      let processedData;
      if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
        processedData = [data];
      } else if (
        Object.prototype.toString.call(data).slice(8, -1) === "Array"
      ) {
        processedData = data;
      }
      processedData.forEach(item => {
        if (item.type === "node") {
          //关键词节点
          item.id = createUuid(32);
          item.type = "custTree_node";
          if (!item.img) {
            item.img = require("../assets/image/logo.png");
          } else {
            item.img = this.__CONFIG.yyw_path + '/aspsemantic' + item.img
          }
        } else if ((item.type === "edge") && isNewUI) {
          //关系节点
          item.id = createUuid(32);
          item.type = "custTree_rela_newUI";
          if (item.name === '范畴') {
            item.xgd = 0.9
          }
          if (item.name === 'F') {
            item.xgd = 0.8
          }
          if (item.name === 'D') {
            item.xgd = 0.7
          }
          if (item.name === 'Z') {
            item.xgd = 0.6
          }
          if (item.name === 'S') {
            item.xgd = 0.5
          }
          if (item.name === 'C') {
            item.xgd = 0.4
          }
        } else {
          item.id = createUuid(32);
          item.size = 40;
          if (item.name === "范畴") {
            item.xgd = 0.9
            item.icon = {
              show: true,
              img: require("../assets/image/fc.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          } else if (item.name === "F") {
            item.xgd = 0.8
            item.icon = {
              show: true,
              img: require("../assets/image/F.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          } else if (item.name === "D") {
            item.xgd = 0.7
            item.icon = {
              show: true,
              img: require("../assets/image/D.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          } else if (item.name === "Z") {
            item.xgd = 0.6
            item.icon = {
              show: true,
              img: require("../assets/image/Z.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          } else if (item.name === "S") {
            item.xgd = 0.5
            item.icon = {
              show: true,
              img: require("../assets/image/S.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          } else if (item.name === "C") {
            item.xgd = 0.4
            item.icon = {
              show: true,
              img: require("../assets/image/C.png"),
              width: 40,
              height: 40,
              cursor: "pointer"
            };
          }
        }
        if (item.children && item.children.length) {
          this.initData(item.children);
        }
      });
      return data;
    },
    // 初始化自定义节点
    initJsxNode () {
      //自定义节点
      G6.registerNode("custTree_node", {
        jsx: (isNewUI ? nodeNewUI.tree_node_big : custNode.tree_node)
      });
      G6.registerNode("custTree_rela_newUI", {
        jsx: nodeNewUI.rela_node
      });
    },
    // 搜索关键词
    async remoteMethod (query) {
      if (query !== "") {
        await this.getKeywordsList(query);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.keyWordOptions = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.keyWordOptions = [];
      }
    },
    // 模糊查询列表
    async getKeywordsList (val) {
      const params = {
        nameLike: val
      };
      const res = await getKeywordsList(params);
      if (res.data.length) {
        this.list = res.data.map(item => {
          return { value: `${item}`, label: `${item}` };
        });
      }
    },
    // 查询按钮
    async handleSearch () {
      if (!this.form.keyWord) {
        this.$message({
          message: "请设置关键词！",
          type: "warning"
        });
        return;
      } else {
        this.isShow = true;
        this.selectNode = undefined;
        this.sourceData = {};
      }
      loading.show();
      if (this.graph) {
        this.graph.clear();
        this.graph.destroy();
      }
      await this.getTreeNode();
      this.initWindow();
      this.initMenu();
      this.initToolBar();
      this.initMiniMap();
      this.initToolTip();
      if (this.form.layout === "radiation") {
        this.initG6();
      } else {
        this.initMindG6();
      }
      loading.hide();
      this.graph.setItemState(this.centerNode.id, "highlight", true);
      //触发渲染图表
      this.renderCharts()
    },
    renderCharts () {
      this.$refs.rank.initChart(this.boxWidth - 50 * this.zoom, this.boxHeight * 2 - (30 * this.zoom))

      this.areaShow = true
    },
    async getParams () {
      const firstLoading = window.location.href.indexOf("?") === -1;
      if (!firstLoading) {
        let queryObj = this.$route.query
        this.form.keyWord = queryObj.keyWord || '';
        // console.log('keyWord:', this.form.keyWord)
        this.curWord = this.form.keyWord
        this.handleSearch();
      }
    }
  }
};
</script>
<style lang="less">
@import "./grapheme.less";

.main-page {
  min-height: 600px;
}

.opt-level /deep/ {
  position: absolute;
  top: 10px;
  left: 180px;

  .el-form {
    .el-form-item {
      margin-bottom: 0;

      .el-form-item__label {
        padding: 0;
        line-height: 28px;
      }

      .el-select {
        width: 120px;
      }
    }
  }
}

.opt-layout /deep/ {
  padding-top: 10px;
}

.main-page /deep/ {
  .el-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tree-right-menu {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
    }

    .tree-menu-btn {
      min-width: 50px;
      text-align: center;
      margin: 5px 0;
      padding: 5px;
      cursor: pointer;
      color: #fff;
      background-color: #409eff;
      border: 1px solid #409eff;
      border-radius: 4px;

      &:hover {
        background-color: #66b1ff;
        border: 1px solid #66b1ff;
      }
    }
  }
}
</style>