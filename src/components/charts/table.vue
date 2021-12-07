<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      prop="ind"
      label="序号"
      width="50"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="文章标题"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      tableData: [{
        ind: 1,
        name: '小电流控制大电流系统',
      }, {
        ind: 2,
        name: '低电压控制高电压系统',
      }, {
        ind: 3,
        name: '隔离控制与被控制电路',
      }, {
        ind: 4,
        name: '电磁式继电器(EMRs)',
      },]
    }
  },
  computed: {

  },

  methods: {

  }
}

</script>
<style lang='scss'>
</style>
