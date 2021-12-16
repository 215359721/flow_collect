const WIDTH = 60 //节点总宽度
const HEIGHT = 60 //节点总高度
const DARK_FONT = '#222'
const LINE_COLOR = '#288cbf'
const IMG_SIZE = 42
const DATA_SVG = require('../../assets/svg/data.svg')
const DATA_GRO_SVG = require('../../assets/svg/data_pac.svg')

//数据节点-样式2
const data_node_style2 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <circle style={{
          marginTop:30,
          marginLeft:30,
          r:30,
          fill:'l(45) 0:#fff 0.3:#fff 1:#85BCE0',
          stroke:'${LINE_COLOR}',
          lineWidth:5,
        }}draggable="true">
          <image style={{
            img:${DATA_SVG},
            width: ${IMG_SIZE},
            height: ${IMG_SIZE},
            marginTop: -30,
            marginLeft: 9,
          }}draggable="true"></image>
          <text style={{
            marginTop: -21,
            marginLeft: -25,
            fontWeight: '500',
            fontSize:12,
            fill: ${DARK_FONT},
            }}draggable="true">
            数据
          </text>
        </circle>
      </rect>
    </group>`
  return jsx
}
//数据包节点-样式2
const data_group_node_style2 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <circle style={{
          marginTop:30,
          marginLeft:30,
          r:30,
          fill:'l(45) 0:#fff 0.3:#fff 1:#85BCE0',
          stroke:'${LINE_COLOR}',
          lineWidth:5,
        }}draggable="true">
          <image style={{
            img:${DATA_GRO_SVG},
            width: ${IMG_SIZE - 5},
            height: ${IMG_SIZE - 5},
            marginTop: -26,
            marginLeft: 11,
          }}draggable="true"></image>
          <text style={{
            marginTop: -18,
            marginLeft: -30,
            fontWeight: '500',
            fontSize:12,
            fill: ${DARK_FONT},
            }}draggable="true">
            数据包
          </text>
        </circle>
      </rect>
    </group>`
  return jsx
}

const node = {
  data_node_style2,
  data_group_node_style2,
}
export default node