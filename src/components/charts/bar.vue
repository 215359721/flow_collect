<template>
  <div id="content-bar"></div>
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
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    initChart (wid, hei, data) {
      console.log('bar-图表宽高:' + wid + "|" + hei)
      document.getElementById('content-bar').innerHTML = ''
      // const mockdata = [
      //   { name: '电气设备', value: 0.9 },
      //   { name: '继电器', value: 0.5 },
      //   { name: '微功率继电器', value: 0.45 },
      //   { name: '逆功率继电器', value: 0.75 },
      //   { name: '大功率继电器', value: 0.2 },
      // ];
      const chart = new Chart({
        container: 'content-bar',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });
      console.log('bar-data:', data)
      chart.data(data);
      chart.coordinate('polar')
      chart.legend('name', {
        position: 'right'
      })
      chart.axis(false)
      chart.tooltip({
        showMarkers: false
      })
      chart.interaction('element-highlight')
      chart.interval()
        .position('name*value')
        .color('name')
        .label('value', {
          offset: -10
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })

      chart.render();
    },
  }
}

</script>
<style lang='scss'>
</style>
