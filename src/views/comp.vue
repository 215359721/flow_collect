<template>
  <div class="main">
    <card></card>
    <card show="normal"></card>
    <card show="simple"></card>
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
<style lang='less' scoped>
.main {
  display: flex;
}
</style>
