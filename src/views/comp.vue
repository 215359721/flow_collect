<template>
  <div class="main">
    <div class="tip-group">
      <card></card>
      <card show="normal"></card>
      <card show="simple"></card>
    </div>
    <div class="btn-group">
      <div class="left-menu">
        <button
          class="btn btn-small submit"
          fnname="addMark"
        >添加批注</button>
        <button
          class="btn btn-small cancel"
          fnname="method_2"
        >功能2</button>
        <button
          class="btn btn-small info"
          fnname="method_3"
        >功能3</button>
        <button
          class="btn btn-small info"
          fnname="method_4"
        >功能4</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card.vue'
export default {
  components: { Card },
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
<style lang='less'>
@import "../assets/css/btn.css";
</style>
<style lang='less' scoped>
.main {
  display: flex;
  flex-direction: column;
  .tip-group {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .btn-group {
    width: 50%;
    display: flex;
    // background-color: chartreuse;
    padding: 10px 20px;
    .left-menu {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
