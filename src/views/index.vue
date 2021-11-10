<template>
  <div class="menu-main">
    <el-button
      type="primary"
      @click="jumpPage('/position')"
    >泳道图示例</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/auto')"
    >网状图示例</el-button>
    <el-button
      type="primary"
      v-show="false"
      @click="jumpPage('/section_1')"
    >section_1</el-button>
    <el-button
      type="primary"
      v-show="false"
      @click="jumpPage('/main')"
    >main</el-button>
    <el-button
      type="primary"
      v-show="false"
      @click="jumpPage('/comp')"
    >组件</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/grapheme')"
    >语义图示例</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      key: ''
    }
  },
  computed: {},
  methods: {
    jumpPage (routerPath) {
      this.$router.push({ path: routerPath })
    }
  }
}

</script>
<style lang='less'>
.menu-main {
  display: flex;
  justify-content: center;
  margin: 20px;
  padding: 10px 20px;
  border: 1px solid #000;
  background-color: pink;
}
</style>