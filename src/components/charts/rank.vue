<template>
  <div id="content-rank"></div>
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
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    initChart (wid, hei) {
      // console.log('rank-图表宽高:' + wid + "|" + hei)
      document.getElementById('content-rank').innerHTML = ''
      const data = [
        { type: '电机托盘', value: 48 },
        { type: '长柄螺丝', value: 109 },
        { type: '接地设备', value: 230 },
        { type: '机电装置', value: 430 },
        { type: '电机', value: 567 },
        { type: '接地装置', value: 655 },
        { type: '绝缘子', value: 783 },
        { type: '功率设备', value: 967 },
        { type: '耦合器', value: 1067 },
        { type: '电气设备', value: 1288 },
        { type: '航天器', value: 1439 },
        { type: '断路器', value: 1567 },
        { type: '继电器', value: 1873 },
      ];
      const chart = new Chart({
        container: 'content-rank',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });
      chart.data(data);
      chart.scale({
        value: {
          max: 2200,
          min: 0,
          alias: '高频词汇搜索(次数)',
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
