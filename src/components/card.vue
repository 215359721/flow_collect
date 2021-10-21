<template>
  <div style="padding:20px">
    <div class="box">
      <div class="head flex-center">
        任务标题
      </div>
      <div class="content">
        <!-- 摘要 -->
        <div
          class="main-part"
          v-if="((show === 'all') || (show === 'normal') || (show === 'simple'))"
        >
          <div class="each-main-box">
            <div class="left flex-center">
              <img :src="require('../assets/image/comp/user_head.png')">
            </div>
            <div class="right">
              <div class="con flex-center">张玲云</div>
              <div class="desc flex-center">负责人</div>
            </div>
          </div>
          <div class="each-main-box">
            <div class="left flex-center">
              <img :src="require('../assets/image/comp/status.png')">
            </div>
            <div class="right">
              <div class="con flex-center">未开始</div>
              <div class="desc flex-center">当前状态</div>
            </div>
          </div>
          <div class="each-main-box">
            <div class="left flex-center">
              <img :src="require('../assets/image/comp/nprmal.png')">
            </div>
            <div class="right">
              <div class="con flex-center">普通</div>
              <div class="desc flex-center">优先级</div>
            </div>
          </div>
        </div>
        <!-- 详情 -->
        <div
          class="info-part"
          v-if="((show === 'all') || (show === 'normal'))"
        >
          <div class="title">任务详情</div>
          <div class="each-item">
            创建人：赵竹林
          </div>
          <div class="each-item">
            截止时间：2021-10-31 17:00
          </div>
          <div class="each-item">
            创建时间：2021-10-01 9:00
          </div>
          <div class="each-item">
            计划开始时间：2021-10-01 9:00
          </div>
          <div class="each-item">
            计划结束时间：2021-10-15 19:00
          </div>
          <div class="each-item">
            标签：<span class="mark">审批任务</span>
          </div>
        </div>
        <!-- 输入物 -->
        <div
          class="in-part"
          v-if="(show === 'all')"
        >
          <div class="title">输入物</div>
          <div class="file-item">
            会议申请单.doc
          </div>
          <div class="file-item">
            会议参会人员名单.excl
          </div>
        </div>
        <!-- 产出物 -->
        <div
          class="out-part"
          v-if="(show === 'all')"
        >
          <div class="title">产出物</div>
          <div class="file-item">
            会议纪要.doc
          </div>
        </div>
        <!-- 描述 -->
        <div
          class="desc-part"
          v-if="(show === 'all')"
        >
          <div class="title">任务描述</div>
          <div class="content">这里显示文字信息任务描述</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: { //all-全部；normal-普通；simple-简洁
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      key: ''
    }
  },
  computed: {},
  methods: {
  }
}

</script>
<style lang='less' scoped>
@import url("./card.less");
</style>
