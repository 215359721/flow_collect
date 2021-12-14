<template>
  <div id="content-pie"></div>
</template>

<script>
import { Chart, Util } from '@antv/g2';
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
      console.log('pie-图表宽高:' + wid + "|" + hei)
      document.getElementById('content-pie').innerHTML = ''
      const mockdata = [
        { type: '术语类', value: 45 },
        { type: '常用类', value: 21 },
        { type: '专业类', value: 19 },
        { type: '其他', value: 15 },
      ];
      const chart = new Chart({
        container: 'content-pie',
        autoFit: true,
        width: wid, // 指定图表宽度
        height: hei, // 指定图表高度
      });

      chart.data(useMockData?mockdata:this.data);

      chart.coordinate('theta', {
        radius: 0.75
      });
      chart.tooltip({
        showMarkers: false
      });

      // eslint-disable-next-line no-unused-vars
      const interval = chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
        .style({ opacity: 0.4 })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape;
              return {
                matrix: Util.zoom(shape, 1.1),
              }
            }
          }
        })
        .label('type', (val) => {
          const opacity = val === '其他' ? 1 : 0.5;
          return {
            offset: -30,
            style: {
              opacity,
              fill: 'white',
              fontSize: 12 * this.zoom,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
            content: (obj) => {
              return obj.type + '\n' + obj.value + '%';
            },
          };
        });

      chart.interaction('element-single-selected');
      chart.render();
    },
  }
}

</script>
<style lang='scss'>
</style>
