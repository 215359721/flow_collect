<template>
  <div>
    <el-dialog
      title="修改配置"
      :visible="showWindow"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeHandle"
    >
      <div class="conf-main">
        <el-button
          type="danger"
          size="mini"
          class="right-btn"
          :style="{zoom:zoom}"
          @click="doDefault"
        >恢复默认配置</el-button>
        <el-tabs
          type="border-card"
          :style="{zoom:zoom}"
        >
          <el-tab-pane
            id="style_pan"
            label="样式配置"
            class="style-pane"
            :style="{height:500+'px'}"
          >
            <!-- 网格宽度 -->
            <div class="each">
              <div class="left">网格宽度：</div>
              <div class="right">
                <el-input
                  placeholder="请输入网格宽度"
                  v-model="config.grid_width"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 网格高度 -->
            <div class="each">
              <div class="left">网格高度：</div>
              <div class="right">
                <el-input
                  placeholder="请输入网格高度"
                  v-model="config.grid_height"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 周统计信息网格宽度 -->
            <div class="each">
              <div class="left">周统计网格宽度：</div>
              <div class="right">
                <el-input
                  placeholder="请输入周统计信息网格宽度"
                  v-model="config.week_info_width"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 启用缩放 -->
            <div class="each">
              <div class="left">适配分辨率：</div>
              <div class="right">
                <el-switch
                  style="display: block"
                  v-model="config.use_scale"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="on"
                  inactive-text="off"
                >
                </el-switch>
                <el-input
                  class="no-border"
                  clearable
                />
              </div>
            </div>
            <!-- 配置项 -->
            <div class="each">
              <div class="left">配置项：</div>
              <div class="right">
                <el-input
                  placeholder="请输入配置项："
                  v-model="config.cfg_type"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 节点样式 -->
            <div class="each">
              <div class="left">节点样式：</div>
              <div class="right">
                <el-select
                  v-model="config.node_style"
                  placeholder="请选择"
                  style="width:130px;"
                  @change="changeNodeStyle"
                >
                  <el-option
                    label="默认"
                    value="default"
                  >
                  </el-option>
                  <el-option
                    label="样式1"
                    value="type1"
                  >
                  </el-option>
                  <el-option
                    label="样式2"
                    value="type2"
                  >
                  </el-option>
                  <el-option
                    label="样式3"
                    value="type3"
                  >
                  </el-option>
                  <el-option
                    label="样式4"
                    value="type4"
                  >
                  </el-option>
                  <el-option
                    label="样式5"
                    value="type5"
                  >
                  </el-option>
                  <el-option
                    label="样式6"
                    value="type6"
                  >
                  </el-option>
                </el-select>  
              </div>
            </div>
            <!-- 部门显示 -->
            <div class="each">
              <div class="left">部门显示：</div>
              <div class="right">
                <el-select
                  v-model="config.cur_dep"
                  style="width:130px;"
                  @change="changeDep"
                >
                  <!-- <el-option
                    label="全部"
                    value="all"
                  >
                  </el-option> -->
                  <el-option
                    v-for="(item,index) in depData"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <!-- 节点文字颜色 -->
            <div class="each">
              <div class="left">节点文字颜色：</div>
              <div class="right">
                <el-radio-group
                  v-model="config.font_mode"
                  size="mini"
                  style="margin-top:5px;"
                  @change="fontChange"
                >
                  <el-radio-button label="default">默认</el-radio-button>
                  <el-radio-button label="dark">深色</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <!-- 节点点击效果 -->
            <div class="each">
              <div class="left">节点点击效果(泳道图)：</div>
              <div class="right">
                <el-radio-group
                  v-model="config.click_mode"
                  size="mini"
                  style="margin-top:5px;"
                  @change="fontChange"
                >
                  <el-radio-button label="default">透明度</el-radio-button>
                  <el-radio-button label="show_hide">显示&隐藏</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            id="base_pan"
            label="基础配置"
            class="base-pane"
            :style="{height:500+'px'}"
          >
            <!-- 版本号 -->
            <div class="each">
              <div class="left">版本号：</div>
              <div class="right">
                <el-input
                  placeholder="请输入版本号"
                  v-model="config.version"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 请求超时时间 -->
            <div class="each">
              <div class="left">请求超时时间：</div>
              <div class="right">
                <el-input
                  placeholder="请输入请求超时时间"
                  v-model="config.timeout"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 缩放基准值 -->
            <div class="each">
              <div class="left">缩放基准值：</div>
              <div class="right">
                <el-input
                  placeholder="请输入缩放基准值"
                  v-model="config.scale_base"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 流程图基础地址 -->
            <div class="each">
              <div class="left">流程图基础地址：</div>
              <div class="right">
                <el-input
                  placeholder="请输入流程图基础地址："
                  v-model="config.flow_path"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 语义网基础地址 -->
            <div class="each">
              <div class="left">语义网基础地址：</div>
              <div class="right">
                <el-input
                  placeholder="请输入语义网基础地址："
                  v-model="config.yyw_path"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 会议跳转地址 -->
            <div class="each">
              <div class="left">会议跳转地址：</div>
              <div class="right">
                <el-input
                  placeholder="请输入会议跳转地址："
                  v-model="config.meet_url"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <!-- 协同编辑打开地址 -->
            <div class="each">
              <div class="left">协同编辑地址：</div>
              <div class="right">
                <el-input
                  placeholder="请输入协同编辑地址："
                  v-model="config.editdoc_url"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            id="yyw_pan"
            label="语义网配置"
            class="yyw-pane"
            :style="{height:500+'px'}"
          >
            <!-- 布局方式 -->
            <div class="each">
              <div class="left">布局方式：</div>
              <div class="right">
                <el-radio-group
                  v-model="config.yyw_pos"
                  size="mini"
                  style="margin-top:5px;"
                  @change="yywPosChange"
                >
                  <el-radio-button label="hor">横向</el-radio-button>
                  <el-radio-button label="vor">纵向</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <!-- 默认关键词 -->
            <div class="each">
              <div class="left">默认关键词：</div>
              <div class="right">
                <el-input
                  placeholder="请输入默认关键词"
                  v-model="config.yyw_defword"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="showWindow=false"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="commitConfig"
        >保存更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { midyfyClassWithZoom } from "../utils/common";
import {defaultConfig} from '../config/index'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Number,
      default: 1.0
    },
    depData:{
      type:Array,
      default: () => []
    }
  },
  components: {},
  data () {
    return {
      showWindow: false,
      config: {
        version: '1.0.0',//版本号
        timeout: 20,//网络请求超时时间
        cfg_type: 1,//配置项
        flow_path: 'http://api.bjsasc.com/graph',//流程图地址
        yyw_path: 'http://api.bjsasc.com',//语义网地址
        grid_width: 1880,//网格宽度
        grid_height: 180,//网格高度
        week_info_width:420,//周统计信息网格宽度
        use_scale: true,//启用缩放
        scale_base:1000,//缩放基准值
        meet_url: 'https://meet.bjsasc.com:8443',//会议跳转地址
        editdoc_url:'http://192.168.1.42:8080',//协同编辑地址
        node_style:'type5',//节点样式
        cur_dep:'5',//当前显示部门
        font_mode:'dark',//节点文字颜色(default-默认|dark-深色)
        click_mode:'default',//泳道图节点点击效果(show_hide-显示&隐藏|default-透明度)
        yyw_pos:'vor',//语义网排列方式(hor-横向|vor-纵向)
        yyw_defword:'功率继电器',//语义网默认搜索关键词
      }
    }
  },
  watch: {
    isShow (val) {
      this.showWindow = val
      setTimeout(() => {
        midyfyClassWithZoom('el-dialog__header', this.zoom)
        midyfyClassWithZoom('el-dialog__footer', this.zoom)
      }, 100);
    }
  },
  computed: {
  },
  mounted () {
    const curConfig = JSON.parse(localStorage.getItem('config'))
    if (curConfig) {
      this.config = curConfig
    }
  },
  methods: {
    //语义网排列方式切换
    yywPosChange(val){
      this.yyw_pos = val
    },
    //字体颜色模式切换
    fontChange (val) {
      this.font_mode = val
    },
    //切换部门显示
    changeDep (val) {
      this.cur_dep = val
    },
    //更改节点样式
    changeNodeStyle (val) {
      this.config.node_style = val
    },
    //提交最新配置
    commitConfig () {
      localStorage.setItem('config', JSON.stringify(this.config))
      this.showWindow = false
      this.$message.success("配置已更新");
      setTimeout(() => {
        midyfyClassWithZoom('el-message', this.zoom)
      }, 100);
      this.reloadPage()
    },
    //恢复默认配置
    doDefault () {
      this.$confirm("确定恢复默认配置？", "恢复默认配置", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('config', JSON.stringify(defaultConfig))
        this.$message.success("配置已更新");
        setTimeout(() => {
          midyfyClassWithZoom('el-message', this.zoom)
        }, 100);
        this.reloadPage()
      })
      setTimeout(() => {
        midyfyClassWithZoom('el-message-box', this.zoom)
      }, 100);
    },
    closeHandle () {
      this.showWindow = false
    },
    reloadPage () {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
}

</script>
<style lang='less'>
.conf-main {
  .right-btn {
    position: absolute;
    right: 5%;
    top: 3%;
  }
  .each {
    width: 100%;
    display: flex;
    margin: 5px;
    .left {
      padding-left: 1%;
      width: 25%;
      background-color: rgb(231, 231, 231);
      display: flex;
      align-items: center;
      letter-spacing: 3px;
    }
    .right {
      width: 70%;
      margin-left: 1%;
      // background-color: violet;
      display: flex;
      align-items: center;
    }
  }
  .no-border {
    width: 10px !important;
    input {
      border: none;
    }
  }
}
</style>
