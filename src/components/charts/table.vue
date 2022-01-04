<template>
  <el-table :data="tableData" :style="{width:'100%',zoom:zoom}">
    <el-table-column prop="index" label="序号" width="50">
    </el-table-column>
    <el-table-column prop="name" label="文章标题">
      <template slot-scope="scope">
        <div class="link-name" @click="arcClick(scope.row)">
          {{ scope.row.name }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { useMockData } from "../../config/index";
import { ChatService, saView } from '../../utils/service'
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
        id: 'Q0001',
        name: '小电流控制大电流系统',
      }, {
        index: 2,
        id: 'Q0002',
        name: '低电压控制高电压系统',
      }, {
        index: 3,
        id: 'Q0003',
        name: '隔离控制与被控制电路',
      }, {
        index: 4,
        id: 'Q0004',
        name: '电磁式继电器(EMRs)',
      },
      {
        index: 5,
        id: 'Q0005',
        name: '隔离控制与被控制电路',
      },
      {
        index: 6,
        id: 'Q0006',
        name: '小电流控制大电流系统',
      },
      {
        index: 7,
        id: 'Q0007',
        name: '电磁式继电器(EMRs)',
      },
      {
        index: 8,
        id: 'Q0008',
        name: '低电压控制高电压系统',
      },
      {
        index: 9,
        id: 'Q0009',
        name: '低电压控制高电压系统',
      },
      {
        index: 10,
        id: 'Q0010',
        name: '低电压控制高电压系统',
      },
      {
        index: 11,
        id: 'Q0011',
        name: '低电压控制高电压系统',
      },
      {
        index: 12,
        id: 'Q0012',
        name: '低电压控制高电压系统',
      },
      {
        index: 13,
        id: 'Q0013',
        name: '低电压控制高电压系统',
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
  },
  methods: {
    arcClick (item) {
      const fileId = item.id
      const fileName = item.name
      console.log('文章:【' + fileName + '】id：' + fileId)
      ChatService.downloadFile(fileId, fileName).then(res => {
        let filePath = res.body
        console.log('res:', res)
        console.log("filePath:" + filePath)
        console.log('saView:', saView)
        saView.shell.openItem(filePath)
      })
    }
  }
}

</script>
<style lang='less'>
.link-name {
  cursor: pointer;
}
</style>
