/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const percentageBar = ({ width, used, height = 12 }) => `
  <rect style={{
    marginLeft: 10,
    marginTop: 3,
    width: ${width},
    height: ${height},
    fill: '#fff',
    stroke: '#1890ff'
  }} name="body" >
    <rect style={{
      marginLeft: 10,
      width: ${(width / 100) * used},
      height: ${height},
      fill: '#1890ff',
      stroke: '#1890ff'
    }}/>
  </rect>
`

const nodeJSX = (node) => `
  <group>
    <rect style={{
      width: 150, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
    }}>
      <text style={{ 
        marginTop: 2, marginLeft: 70, 
        textAlign: 'center',
        fontWeight: 'bold', 
        fill: '#fff' }}>${node.id}</text>
    </rect>
    <rect style={{ width: 150, height: 80, fill: 'rgba(24,144,255,0.15)', 
      radius: [0, 0, 6, 6] }} >
      <text style={{marginLeft: 10 ,fill: 'red'}}>${node.label}</text>
      <text style={{ marginTop: 5, marginLeft: 10, fill: '#333'}}>${node.icon} </text>
      <image style={{img:${node.img},width: 25, height: 25,}}></image>
      <text style={{
        marginTop: 1,
        marginLeft: 10,
        fontSize: 10,
        fill: '#1890ff',
      }}>80%</text>
      ${percentageBar({ width: 80, used: 50 })}
       ${main_part(node)}
       ${in_part(node)}
    </rect>
  </group>
`

const WIDTH = 250
const HEIGHT_HEAD = 35
const HEIGHT_CONTENT = 360
const MARGIN_LEFT = 5 //模块横向间距
const MARGIN_TOP = 5 //模块纵向间距
const HEIGHT_MAIN = 40 //摘要高度
const HEIGHT_INFO = 130 //详情高度
const HEIGHT_IN = 60 //输入物高度
const HEIGHT_OUT = 60 //输出物高度
const HEIGHT_DESC = 60 //描述高度
const MAIN_EACH_HEI = 50
const MAIN_EACH_WID = 100
//标题
const head = (node) => `
 <rect style={{
    width: ${WIDTH},
    height:${HEIGHT_HEAD},
    fill: '#1890ff',
    stroke: '#1890ff',
    radius: [6, 6, 0, 0],
  }}
  draggable="true"
  >
    <text style={{
      marginTop: ${(HEIGHT_HEAD / 2) + 3}, marginLeft: ${(WIDTH / 2) - 10},
      textAlign: 'center',
      fontWeight: 'bold',
      fill: '#fff'}}draggable="true">
      任务标题-${node.id}
    </text>
  </rect>
`
//摘要
const main_part = (node) =>
  `
    <rect style={{
      width: ${(WIDTH - (MARGIN_LEFT * 2))},
      height:${HEIGHT_MAIN},
      marginLeft: ${MARGIN_LEFT},
      fill: '#F7F7F7',
      marginTop: 3,
    }}draggable="true">
      ${each_box(node.data.userHead, 10, '张玲云', '负责人')}
      ${each_box(node.data.status, 20, '未开始', '当前状态')}
      ${each_box(node.data.level, 30, '普通', '优先级')}
    </rect>
  `
const each_box = (img_path, left, title, desc) => `
  <image style={{
    img:${img_path},
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: ${left},
    next: inline}}draggable="true"></image>
  <rect style={{
    width: ${HEIGHT_MAIN},
    height: ${HEIGHT_MAIN},
    marginLeft:  ${left + 5},
    next: inline
  }}draggable="true">
    <text style={{marginLeft: ${left + 5} ,fill: '#333',marginTop: 5,}}draggable="true">${title}</text>
    <text style={{marginLeft: ${left + 5} ,fill: '#888',marginTop: 3,fontSize:10,}}draggable="true">${desc}</text>
  </rect>
`
//详情
const info_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_INFO},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>任务详情</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>创建人：赵竹林</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>截止时间：2021-10-31 17:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 7,fill: '#888',fontSize:10,}}>创建时间：2021-10-01 9:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 9,fill: '#888',fontSize:10,}}>计划开始时间：2021-10-01 9:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 11,fill: '#888',fontSize:10,}}>计划结束时间：2021-10-15 19:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 13,fill: '#888',fontSize:10,}}>标签：</text>
  <rect style={{
    width: 50,
    height:15,
    marginLeft:40,
    fill: '#1111FF',
    radius: [4, 4, 4, 4],
  }}draggable="true">
      <text style={{marginLeft:45,marginTop:-3,fill: '#fff',fontSize:10,}}>审批任务</text>
  </rect>
  </rect>
`
//输入物
const in_part = (node) => {
  const list = node.obj.inList
  let content = ''
  list.forEach(element => {
    content += "<text style={{marginLeft: " + (MARGIN_LEFT * 2) + " ,marginTop:3,fill: '#2900FF',fontSize:10,}}>" + element + "</text>"
  })
  return `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_IN},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>输入物</text>
    ${content}
    </rect >
  `
}
//产出物
const out_part = (node) => {
  const list = node.obj.outList
  let content = ''
  list.forEach(element => {
    content += "<text style={{marginLeft: " + (MARGIN_LEFT * 2) + " ,marginTop:3,fill: '#2900FF',fontSize:10,}}>" + element + "</text>"
  })
  return `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_OUT},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>产出物</text>
    ${content}
  </rect >
  `
}
//描述
const desc_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_DESC},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>描述</text>
      <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>这里显示文字信息任务描述</text>
  </rect >
  `

const jsx4All = (node) => {
  let innerJSX = main_part(node) + info_part(node) + in_part(node) + out_part(node) + desc_part(node)
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${HEIGHT_CONTENT},
      fill: '#f7f7f7',
      stroke: '#1890ff',
      lineWidth:1,
      }}
      draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const jsx4Normal = (node) => {
  let innerJSX = main_part(node) + info_part(node)
  let currentHei = 180
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: '#1890ff',
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const jsx4Simple = (node) => {
  let innerJSX = main_part(node)
  let currentHei = 50
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: '#1890ff',
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const custNode = { jsx4All, jsx4Normal, jsx4Simple }
export default custNode