<template>
  <div class="main">
    <div
      class="dep-line"
      :style="{height:height+'px'}"
    />
    <!-- <div
      v-for="(item,index) in num"
      :key="index"
      class="line"
      :style="{top:((height/num)*(index+1))+'px'}"
    /> -->
    <div
      class="line"
      :style="{top:(height/7)+'px'}"
    />
    <div
      class="line"
      :style="{top:(height/7)*2+'px'}"
    />
    <div
      class="line"
      :style="{top:(height/7)*3+'px'}"
    />
    <div
      class="line"
      :style="{top:(height/7)*4+'px'}"
    />
    <div
      class="line"
      :style="{top:(height/7)*5+'px'}"
    />
    <div
      class="line"
      :style="{top:(height/7)*6+'px'}"
    />
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 7
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}

</script>
<style lang='less' scoped>
.main {
  background-color: pink;
}
// 横线
.line {
  display: flex;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: wheat;
  border-bottom: 2px dotted rgb(242, 242, 242);
}
// 部门竖线
.dep-line {
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 100px;
  width: 10px;
  border-right: 2px dotted rgb(242, 242, 242);
}
</style>
