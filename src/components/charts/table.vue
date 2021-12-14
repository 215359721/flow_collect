<template>
  <el-table
    :data="tableData"
    :style="{width:'100%',zoom:zoom}"
  >
    <el-table-column
      prop="index"
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
import { useMockData } from "../../config/index";
export default {
  components: {},
  props: {
    zoom: {
      type: Number,
      default: 1.0,
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableData: [],
      mockdata: [{
        index: 1,
        name: '小电流控制大电流系统',
      }, {
        index: 2,
        name: '低电压控制高电压系统',
      }, {
        index: 3,
        name: '隔离控制与被控制电路',
      }, {
        index: 4,
        name: '电磁式继电器(EMRs)',
      },]
    }
  },
  mounted () {
    this.tableData = useMockData ? this.mockdata : this.data
  },
  watch: {
    data (val) {
      this.tableData = useMockData ? this.mockdata : val
    }
  }
}

</script>
<style lang='scss'>
</style>
