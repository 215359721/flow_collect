const useMockData = 1 //是否使用本地mock数据
const useExColor = 1 //泳道UI是否使用交替行
const isNewUI = 1 //是否使用新节点UI
const defaultConfig = {
  version: '1.0.0',//版本号
  timeout: 20,//网络请求超时时间
  cfg_type: 1,//配置项
  flow_path: 'http://api.bjsasc.com/graph',//流程图地址
  yyw_path: 'http://api.bjsasc.com',//语义网地址
  grid_width: 1880,//网格宽度
  grid_height: 180,//网格高度
  week_info_width: 420,//周统计信息网格宽度
  scale_base: 1000,//缩放基准值
  use_scale: true,//启用缩放
  meet_url: 'https://meet.bjsasc.com:8443',//会议跳转地址
  editdoc_url: 'http://192.168.1.42:8080',//协同编辑地址
  node_style: 'type5',//节点样式
  cur_dep: '5',//当前显示部门
  font_mode: 'dark',//节点文字颜色(default-默认|dark-深色)
  click_mode: 'default',//泳道图节点点击效果(show_hide-显示&隐藏|default-透明度)  yyw_pos: 'vor',//语义网排列方式(hor-横向|vor-纵向)
  yyw_defword: '功率继电器',//语义网默认搜索关键词
}
export {
  useMockData,
  useExColor,
  isNewUI,
  defaultConfig,
}