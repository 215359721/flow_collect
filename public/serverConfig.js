
//当前部署版本号
var base_version = '11_29_16pm'
//网络请求超时时间
var base_timeout = 20
//流程地址
var base_ip_flow = 'http://api.bjsasc.com/graph'
//语义网地址
var base_ip_yyw = 'http://api.bjsasc.com/aspsemantic'
//泳道图网格-宽
var grid_width_flow = 650
//泳道图网格-高
var grid_height_flow = 180
//泳道图网格-间距
var grid_gap_flow = 5
//移动偏移量-x
var move_offset_x = 0
//移动偏移量-y
var move_offset_y = 1
var config = {
  base_version,
  base_timeout,
  base_ip_flow,
  base_ip_yyw,
  grid_width_flow,
  grid_height_flow,
  grid_gap_flow,
  move_offset_x,
  move_offset_y,
}
window._SERVERCONF = config