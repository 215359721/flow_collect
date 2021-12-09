<template>
  <div id="content"></div>
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
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    initChart (wid, hei) {
      console.log('topx-图表宽高:' + wid + "|" + hei)
      document.getElementById('content').innerHTML = ''
      const data = [
        { type: '光继电器', value: 20 },
        { type: '断路器', value: 30 },
        { type: '逆功率继电器', value: 40 },
        { type: '电气设备', value: 50 },
        { type: '继电器', value: 80 },
      ];
      const chart = new Chart({
        container: 'content',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });
      chart.data(data);
      chart.scale({
        value: {
          max: 100,
          min: 0,
          alias: '相关度(百分比)',
        },
      });
      chart.axis('type', {
        title: null,
        tickLine: null,
        line: null,
      });

      chart.axis('value', {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 12,
            fontWeight: 300,
          },
        },
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart
        .interval()
        .position('type*value')
        .size(26)
        .label('value', {
          style: {
            fill: '#8d8d8d',
          },
          offset: 10,
        });
      chart.interaction('element-active');
      chart.render();
    },
  }
}

</script>
<style lang='scss'>
</style>
