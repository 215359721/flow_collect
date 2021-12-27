import {defaultConfig} from '../config/index'
export default {
  data () {
    return {
      __CONFIG: {}
    }
  },
  mounted () {
    this.__getConfig()
  },
  methods: {
    __getConfig () {
      this.__CONFIG = JSON.parse(localStorage.getItem('config')) || defaultConfig
      console.log('===mixin获取全局配置===', this.__CONFIG)
    }
  }
}