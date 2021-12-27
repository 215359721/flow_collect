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
        { type: '电机托盘', value: 48, col:'100'},
        { type: '长柄螺丝', value: 109, col:'100'},
        { type: '接地设备', value: 230, col:'100'},
        { type: '机电装置', value: 430, col:'200'},
        { type: '电机', value: 567, col:'200'},
        { type: '接地装置', value: 655, col:'200'},
        { type: '绝缘子', value: 783, col:'300'},
        { type: '功率设备', value: 967, col:'300'},
        { type: '耦合器', value: 1067, col:'300'},
        { type: '电气设备', value: 1288, col:'400'},
        { type: '航天器', value: 1439, col:'400'},
        { type: '断路器', value: 1567, col:'500'},
        { type: '继电器', value: 1873, col:'500'},
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
        .color('col',['#1A73e8','#1A73e8','#1aad19','#1aad19','#cc0000'])
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
