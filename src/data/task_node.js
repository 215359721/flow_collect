/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const MAIN_COLOR = '#1aad19'
const WIDTH = 250
const HEIGHT_HEAD = 25
const HEIGHT_CONTENT = 310
const MARGIN_LEFT = 5 //模块横向间距
const MARGIN_TOP = 5 //模块纵向间距
const HEIGHT_SIMPLE = 40 //简要高度
const HEIGHT_MAIN = 40 //摘要高度
const HEIGHT_INFO = 80 //详情高度
const HEIGHT_IN = 60 //输入物高度
const HEIGHT_OUT = 60 //输出物高度
const HEIGHT_DESC = 60 //描述高度
//标题
const head = (node) => `
 <rect style={{
    width: ${WIDTH},
    height:${HEIGHT_HEAD},
    fill: ${MAIN_COLOR},
    stroke: ${MAIN_COLOR},
    radius: [6, 6, 0, 0],
  }}
  draggable="true"
  >
    <text style={{
      marginTop: ${(HEIGHT_HEAD / 2) + 3}, marginLeft: ${(WIDTH / 2) - 10},
      textAlign: 'center',
      fontWeight: 'bold',
      fill: '#fff'}}draggable="true">
      任务
    </text>
  </rect>
`
//简要
const simple_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_SIMPLE},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}
  draggable="true"
 >
  <image style={{
    img:${node.img},
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: ${MARGIN_LEFT * 4},
    next: inline
  }}draggable="true"></image>
  <text style={{marginLeft: ${MARGIN_LEFT * 8},marginTop: ${MARGIN_TOP * 2},fill: '#333',fontWeight:bold,}}>${node.label}</text>
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
      ${each_box(node.obj.userHead, 10, '张玲云', '负责人')}
      ${each_box(node.obj.status, 20, '未开始', '当前状态')}
      ${each_box(node.obj.level, 30, '普通', '优先级')}
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
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>${node.label}</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>创建人：赵竹林</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>截止时间：2021-10-31 17:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 7,fill: '#888',fontSize:10,}}>创建时间：2021-10-01 9:00</text>
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

const task_jsx4All = (node) => {
  let innerJSX = info_part(node) + main_part(node) + in_part(node) + out_part(node) + desc_part(node)
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${HEIGHT_CONTENT},
      fill: '#f7f7f7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}
      draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const task_jsx4Normal = (node) => {
  let innerJSX = info_part(node)
  let currentHei = 90
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const task_jsx4Simple = (node) => {
  let innerJSX = simple_part(node)
  let currentHei = 50
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
// 树图自定义节点
const tree_node = (node) => {
  let nodeName = ''
  if (node.name.length > 6) {
    nodeName = node.name.substring(0, 6) + "..."
  } else {
    nodeName = node.name
  }
  const treeNode =
    `<group style={{}}>
    <rect style={{
      width: 120,
      height: 40,
      fill: '#ecf5ff',
      stroke: '#c6e2ff',
      radius: [4, 4, 4, 4],
      cursor: pointer
    }}
    >
      <rect style={{
        width: 80,
        height: 40,
        cursor: pointer
      }}
      >
        <image style={{
          img: ${node.img},
          width: 25,
          height: 25,
          marginTop: 8,
          marginLeft: 5,
          next: inline,
          cursor: pointer
        }}>
        </image>
        <text style={{
          marginTop: 25,
          marginLeft: 10,
          fill: '#333',
          fontWeight:bold}}>${nodeName}
        </text>
      </rect>
    </rect>
  </group>`
  return treeNode
}
const custNode = { task_jsx4All, task_jsx4Normal, task_jsx4Simple, tree_node }
export default custNode