
console.log('==========serverConfig.js==========')
//流程地址
var base_ip_flow = 'http://api.bjsasc.com/graph'
//语义网地址
var base_ip_yyw = 'http://api.bjsasc.com/aspsemantic'
//泳道图网格-宽
var grid_width_flow = 620
//泳道图网格-高
var grid_height_flow = 180
//泳道图网格-间距
var grid_gap_flow = 5
var config = {
  base_ip_flow,
  base_ip_yyw,
  grid_width_flow,
  grid_height_flow,
  grid_gap_flow,
}
window._SERVERCONF = config