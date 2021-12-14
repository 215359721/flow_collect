<template>
  <div id="content-bar"></div>
</template>

<script>
import { Chart } from '@antv/g2';
import { useMockData} from "../../config/index";
export default {
  components: {},
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    zoom: {
      type: Number,
      default: 1.0
    },
    data:{
      type:Array,
      default:()=>[]
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    initChart (wid, hei) {
      console.log('bar-图表宽高:' + wid + "|" + hei)
      document.getElementById('content-bar').innerHTML = ''
      const mockdata = [
        { year: '2017 年', sales: 15000 },
        { year: '2018 年', sales: 19000 },
        { year: '2019 年', sales: 21000 },
        { year: '2020 年', sales: 22000 },
        { year: '2021 年', sales: 24500 },
      ];
      const chart = new Chart({
        container: 'content-bar',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });
      chart.data(useMockData?mockdata:this.data);
      chart.scale('sales', {
        nice: true,
      });


      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');

      chart.interval().position('year*sales');

      chart.render();
    },
  }
}

</script>
<style lang='scss'>
</style>
