<template>
  <div id="content-line"></div>
</template>

<script>
import { Chart } from '@antv/g2';
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
      console.log('line-图表宽高:' + wid + "|" + hei)
      document.getElementById('content-line').innerHTML = ''
      const data = [
        { year: '2021-01', value: 3 },
        { year: '2021-02', value: 4 },
        { year: '2021-03', value: 3.5 },
        { year: '2021-04', value: 5 },
        { year: '2021-05', value: 4.9 },
        { year: '2021-06', value: 6 },
        { year: '2021-07', value: 7 },
        { year: '2021-08', value: 9 },
        { year: '2021-09', value: 13 },
      ];
      const chart = new Chart({
        container: 'content-line',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });

      chart.data(data);
      chart.scale({
        year: {
          range: [0, 1],
        },
        value: {
          min: 0,
          nice: true,
        },
      });

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart.line().position('year*value').label('趋势');
      chart.point().position('year*value');

      chart.render();
    },
  }
}

</script>
<style lang='scss'>
</style>
