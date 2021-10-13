import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import elementUI from 'element-ui'
import Antd from 'ant-design-vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(elementUI)
Vue.use(Antd)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
