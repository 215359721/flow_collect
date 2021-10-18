<template>
  <div class="menu-main">
    <el-button
      type="primary"
      @click="jumpPage('/position')"
    >position</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/section_1')"
    >section_1</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/main')"
    >main</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/comp')"
    >组件</el-button>
    <el-button
      type="primary"
      @click="jumpPage('/grapheme')"
    >语义图</el-button>
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
