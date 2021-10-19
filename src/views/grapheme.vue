<template>
  <div class="main-page">
    <div class="configuration">
      <p class="title">配置项</p>
      <div class="opt-level">
        <el-form
          :model="form"
          ref="form"
          label-position="top"
          label-width="120px"
        >
          <el-form-item id="keyWord" label="设置关键词：" prop="keyWord">
            <el-select
              size="mini"
              v-model="form.keyWord"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in keyWordOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置查询层级：" prop="level">
            <el-select size="mini" v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置布局：" prop="layout">
            <el-select size="mini" v-model="form.layout" placeholder="请选择">
              <el-option
                v-for="item in layoutOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
            <el-dropdown
              size="mini"
              split-button
              type="primary"
              @command="changeLayout"
              :style="{marginLeft:'10px'}"
            >
              布局切换
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="radiation">语义网辐射树</el-dropdown-item>
                <el-dropdown-item command="mind">语义网脑图树</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="graphemeDiv" v-if="isShow"></div>
    <div v-else class="el-empty">
      <img src="../assets/image/single.png">
      <label>暂无数据</label>
    </div>
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
  import { getTreeNode, getKeywordsList } from '../api/api.js'
  import { createUuid } from '../utils/common.js'

  insertCss(innerCss);

  export default {
    components: {},
    data() {
      return {
        //window对象
        win: {
          height: 0,
          width: 0,
        },
        sourceData: {}, //数据源
        graph: null, //graph全局对象
        rankDir: "LR", //当前布局方式
        canvasCenter: [0, 0], //画布中心
        toolBar: null, //工具栏
        minimap: null, //小地图
        toolTip: "", //提示框内容
        rightMenu: null, //右键菜单
        isShow: false,
        childNodes: [],
        isRender: false,
        selectNode: undefined,
        form: {
          level: 2,
          keyWord: '',
          layout: 'radiation'
        },
        levelOptions: [
          {
            value: 2,
            label: "2",
          },
          {
            value: 3,
            label: "3",
          },
          {
            value: 4,
            label: "4",
          },
        ],
        layoutOptions: [
          {
            value: 'radiation',
            label: '语义网辐射树'
          },
          {
            value: 'mind',
            label: '语义网脑图树'
          }
        ],
        centerNode: undefined,
        keyWordOptions: [],
        list: [],
        loading: false,
      };
    },
    computed: {},
    created() {},
    methods: {
      // 获取初始树节点
      async getTreeNode(){
        if(!this.selectNode){
          const params = {
            layer: this.form.level,
            type: this.form.keyWord
          }
          const res = await getTreeNode(params)
          this.sourceData = this.initData(res.data);
          this.centerNode = this.sourceData;
        }else{
          const params = {
            layer: this.form.level,
            type:this.selectNode.getModel().name
          }
          const res = await getTreeNode(params)
          this.childNodes = res.data
          if(this.childNodes && Object.keys(this.childNodes).length > 0){
            await this.recursionConcat(this.sourceData)
          }
        }
      },
      // 递归拼接children
      recursionConcat(data) {
        let processedData;
        if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
          processedData = [data];
        } else if (
          Object.prototype.toString.call(data).slice(8, -1) === "Array"
        ) {
          processedData = data;
        }
        processedData.map(async (item) => {
          if (item.id === this.selectNode.getModel().id) {
            const formateData = await this.initData(this.childNodes)
            item.children = formateData.children
            this.isRender = true;
          } else {
            if (item.children && item.children.length) {
              this.recursionConcat(item.children);
            }
          }
        });
      },
      // node点击事件
      async handleNodeClick(event) {
        loading.show()
        this.isRender = false;
        this.selectNode = event.item;
        if(this.selectNode.getModel().type === 'node' && !this.selectNode.getModel().children.length){
          await this.getTreeNode(this.selectNode)
        }
        if (this.isRender && !this.selectNode.getModel().collapsed) {
          this.graph.data(this.sourceData);
          this.graph.render()
          this.graph.changeData(this.sourceData);
          this.graph.fitCenter();
          // this.graph.layout(true);
          this.graph.zoom(1.2, {
            x: this.win.width / 2,
            y: this.win.height / 2,
          });
        }
        this.graph.focusItem(this.selectNode._cfg.id);
        this.graph.getNodes().forEach((node) => {
          this.graph.clearItemStates(node);
          this.graph.setItemState(node, "dark", true);
        });
        this.graph.setItemState(this.selectNode._cfg.id, "dark", false);
        this.graph.setItemState(this.selectNode._cfg.id, "highlight", true);
        loading.hide()
      },
      // 初始化辐射树G6
      async initG6() {
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
                onChange: function onChange(item, collapsed) {
                  const data = item.get("model");
                  data.collapsed = collapsed;
                  return true;
                },
                // 关系节点不发生折叠
                // shouldBegin: (e) => {
                //   // 若当前操作的节点 type 不为 'node'，则不发生 collapse-expand
                //   if (e.item && e.item.getModel().type !== "node") return false;
                //   return true;
                // },
              },
              "drag-canvas",
              "zoom-canvas",
            ],
          },
          plugins: [this.toolBar, this.toolTip, this.minimap, this.rightMenu],
          nodeStateStyles: {
            highlight: {
              stroke: "#eaff8f",
              lineWidth: 5,
            },
            dark: {
              opacity: 0.5,
            },
          },
          defaultNode: {
            style: {
              cursor: "pointer",
            },
            labelCfg: {
              position: "bottom",
              offset: 10,
              style: {
                // ... 文本样式的配置
              },
            },
          },
          layout: {
            type: "dendrogram",
            direction: "LR",
            nodeSep: 20,
            rankSep: 100,
            radial: true,
          },
        });
        this.graph.node((node) => {
          if (node.type === "node") {
            if (node.name.length > 10) {
              return {
                label: node.name.substring(0, 10) + "...",
              };
            } else {
              return {
                label: node.name,
              };
            }
          } else {
            return {
              label: "",
            };
          }
        });
        this.graph.data(this.sourceData);
        this.graph.render();
        this.graph.fitCenter()
        // this.graph.layout(true);
        this.graph.zoom(1.2, {
          x: this.win.width / 2,
          y: this.win.height / 2,
        });
        this.graph.on("node:click", this.handleNodeClick);
        //监听：canvas点击
        this.graph.on("canvas:click", () => {
          this.clearAllStats();
        });
      },
      // 初始化脑图树G6
      initMindG6() {
        const container = document.getElementById("graphemeDiv");
        this.graph = new G6.TreeGraph({
          container: container,
          width: this.win.width,
          height: this.win.height,
          modes: {
            default: [
              {
                type: "collapse-expand",
                onChange: function onChange(item, collapsed) {
                  const data = item.get("model");
                  data.collapsed = collapsed;
                  return true;
                },
                // 关系节点不发生折叠
                // shouldBegin: (e) => {
                //   // 若当前操作的节点 type 不为 'node'，则不发生 collapse-expand
                //   if (e.item && e.item.getModel().type !== "node") return false;
                //   return true;
                // },
              },
              "drag-canvas",
              "zoom-canvas",
            ],
          },
          plugins: [this.toolBar, this.toolTip, this.minimap, this.rightMenu],
          nodeStateStyles: {
            highlight: {
              stroke: "#eaff8f",
              lineWidth: 5,
            },
            dark: {
              opacity: 0.5,
            },
          },
          defaultNode: {
            style: {
              cursor: "pointer",
              lineWidth: 3,
            },
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          defaultEdge: {
            type: "cubic-horizontal",
          },
          layout: {
            type: "mindmap",
            direction: "H",
            getHeight: () => {
              return 50;
            },
            getWidth: () => {
              return 36;
            },
            getVGap: () => {
              return 10;
            },
            getHGap: () => {
              return 50;
            },
          },
        });
        let centerX = 0;
        this.graph.node((node) => {
          if (node.id === this.centerNode.id) {
            centerX = node.x;
          }
          if (node.type === "node") {
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
                    ? "left"
                    : node.x > centerX
                    ? "right"
                    : "left",
                offset: 5,
              },
            };
          } else {
            return {
              label: "",
              labelCfg: {
                position:'',
                offset: 5,
              },
            };
          }
        });
        this.graph.data(this.sourceData);
        this.graph.render();
        this.graph.fitCenter()
        // this.graph.layout(true);
        this.graph.zoom(1.2, {
          x: this.win.width / 2,
          y: this.win.height / 2,
        });
        this.graph.on("node:click", this.handleNodeClick);
        // 监听：canvas点击
        this.graph.on("canvas:click", () => {
          this.clearAllStats();
        });
      },
      // 切换布局
      changeLayout(val) {
        if(Object.keys(this.sourceData).length) {
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
          }
          // 切换布局后保持选中节点高亮及位于中心位置
          if (this.selectNode && Object.keys(this.selectNode).length) {
            this.graph.focusItem(this.selectNode._cfg.id);
            this.graph.getNodes().forEach((node) => {
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
      initMiniMap() {
        this.minimap = new G6.Minimap({
          size: [250, 150],
        });
      },
      // 初始化工具栏
      initToolBar() {
        this.toolBar = new G6.ToolBar({
          position: { x: 10, y: 10 },
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
      initWindow() {
        this.win.height =
          (document.documentElement.clientHeight ||
            document.body.clientHeight) - 10;
        this.win.width =
          (document.documentElement.clientWidth || document.body.clientWidth) -
          10;
        this.canvasCenter = [this.win.width / 2, this.win.height / 2];
      },
      // 清空焦点高亮
      clearAllStats() {
        const that = this;
        this.selectNode = undefined;
        that.graph.setAutoPaint(false);
        that.graph.getNodes().forEach((node) => {
          that.graph.clearItemStates(node);
        });
        that.graph.getEdges().forEach((edge) => {
          that.graph.clearItemStates(edge);
        });
        that.graph.paint();
        that.graph.setAutoPaint(true);
      },
      // 初始化tooltip
      initToolTip() {
        this.toolTip = new G6.Tooltip({
          offsetX: 10,
          offsetY: 10,
          fixToNode: [1, 0.5],
          // 允许出现 tooltip 的 item 类型
          itemTypes: ["node"],
          // 是否允许tooltip出现
          shouldBegin: (e) => {
            // 若当前操作的节点 type 不为 'node'，则不展示
            if (e.item && e.item.getModel().type !== "node") return false;
            return true;
          },
          // 自定义 tooltip 内容
          getContent: (e) => {
            if (e.item.getModel().type === "node") {
              const outDiv = document.createElement("div");
              const data = {
                name: "测试",
                path: "logo.png",
                desc:
                  "中华人民共和国的航天事业起始于1956年。中国于1970年4月24日发射第一颗人造地球卫星，是继苏联、美国、法国、日本之后世界上第5个能独立发射人造卫星的国家。 ",
              };
              outDiv.innerHTML = showTooltip(data);
              return outDiv;
            } else {
              return "关系节点";
            }
          },
        });
      },
      // 初始化右键菜单
      initMenu() {
        this.rightMenu = new G6.Menu({
          // 是否允许tooltip出现
          shouldBegin: (e) => {
            // 若当前操作的节点 type 不为 'node'，则不展示
            if (e.item && e.item.getModel().type !== "node") return false;
            return true;
          },
          getContent() {
            return `
              <ul class="tree-right-menu">
                <li class="tree-menu-btn">功能1</li>
                <li class="tree-menu-btn">功能2</li>
                <li class="tree-menu-btn">功能3</li>
                <li class="tree-menu-btn">功能4</li>
              </ul>`;
          },
          handleMenuClick: (target, item) => {
            console.log(target, item);
          },
          // 需要加上父级容器的 padding-left 16 与自身偏移量 10
          offsetX: 16 + 10,
          // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
          offsetY: -10,
          // 在哪些类型的元素上响应
          itemTypes: ["node"],
        });
      },
      // 脑图树布局切换辐射树改变样式
      changeStyle(data) {
        let processedData;
        if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
          processedData = [data];
        } else if (
          Object.prototype.toString.call(data).slice(8, -1) === "Array"
        ) {
          processedData = data;
        }
        processedData.forEach((item) => {
          item.labelCfg.position = "bottom";
          item.labelCfg.offset = 10;
          if (item.children && item.children.length) {
            this.changeStyle(item.children);
          }
        });
        return data;
      },
      // 初始化数据
      initData(data) {
        let processedData;
        if (Object.prototype.toString.call(data).slice(8, -1) === "Object") {
          processedData = [data];
        } else if (
          Object.prototype.toString.call(data).slice(8, -1) === "Array"
        ) {
          processedData = data;
        }
        processedData.forEach((item) => {
          if (item.type === "node") {
            item.id = createUuid(32)
            item.size = 55;
            item.icon = {
              show: true,
              img: require("../assets/image/logo.png"),
              width: 55,
              height: 55,
              cursor: "pointer",
            };
          } else {
            item.id = createUuid(32)
            item.size = 40;
            if(item.name === "范畴"){
              item.icon = {
                show: true,
                img: require("../assets/image/fc.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }else if(item.name === "F") {
              item.icon = {
                show: true,
                img: require("../assets/image/F.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }else if(item.name === "D") {
              item.icon = {
                show: true,
                img: require("../assets/image/D.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }else if(item.name === "Z") {
              item.icon = {
                show: true,
                img: require("../assets/image/Z.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }else if(item.name === "S") {
              item.icon = {
                show: true,
                img: require("../assets/image/S.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }else if(item.name === "C") {
              item.icon = {
                show: true,
                img: require("../assets/image/C.png"),
                width: 40,
                height: 40,
                cursor: "pointer",
              };
            }
          }
          if (item.children && item.children.length) {
            this.initData(item.children);
          }
        });
        return data;
      },
      // 搜索关键词
      async remoteMethod(query) {
        if (query !== "") {
          await this.getKeywordsList(query)
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.keyWordOptions = this.list.filter((item) => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.keyWordOptions = [];
        }
      },
      // 模糊查询列表
      async getKeywordsList(val) {
        const params = {
          nameLike : val
        }
        const res = await getKeywordsList(params)
        if(res.data.length){
          this.list = res.data.map((item) => {
            return { value: `${item}`, label: `${item}` };
          });
        }
      },
      // 查询按钮
      async handleSearch(){
        if(!this.form.keyWord){
          this.$message({
            message:'请设置关键词！',
            type: 'warning'
          })
          return
        }else{
          this.isShow = true
          this.selectNode = undefined
          this.sourceData = {}
        }
        loading.show();
        if(this.graph){
          this.graph.clear();
          this.graph.destroy();
        }
        await this.getTreeNode()
        this.initWindow();
        this.initMenu();
        this.initToolBar();
        this.initMiniMap();
        this.initToolTip();
        if(this.form.layout === 'radiation'){
          this.initG6();
        }else{
          this.initMindG6()
        }
        loading.hide();
        this.graph.focusItem(this.centerNode.id);
        this.graph.setItemState(this.centerNode.id, "highlight", true);
      }
    },
  };
</script>
<style lang="less">
  @import "./main.less";
  .main-page{
    min-height: 600px
  }
  .configuration {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    border: 1px dashed #ddd;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px dashed #ddd;
    }
  }
  .opt-level /deep/ {
      padding-top: 10px;
      .el-form {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            padding: 0;
            line-height: 28px;
          }
          .el-select {
            width: 170px;
          }
        }
      }
    }
  .opt-layout /deep/ {
    padding-top: 10px;
  }
  
  .main-page /deep/{
    .el-empty{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
    .tree-right-menu{
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      li {
        list-style-type: none;
      }
      .tree-menu-btn{
        min-width: 50px;
        text-align: center;
        margin: 5px 0;
        padding: 5px;
        cursor: pointer;
        color: #fff;
        background-color: #409EFF;
        border: 1px solid #409EFF;
        border-radius: 4px;
        &:hover{
          background-color: #66b1ff;
          border: 1px solid #66b1ff;
        }
      }
    }
  }
</style>
