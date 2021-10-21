/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const MAIN_COLOR = '#1890ff'
const data_jsx = (node) => {
  const jsx = `
    <group>
      <circle style={{
      r:30,
      fill: '#f7f7f7',
      stroke: ${MAIN_COLOR},
      lineWidth:5,
      }}draggable="true">
        <image style={{
          img:${node.img},
          width: 30,
          height: 30,
          marginTop: -15,
          marginLeft:-15,
        }}draggable="true">
        </image>
        <text style={{
          marginTop: 7,
          fill: '#333',
          textAlign: 'center',
          fontWeight:bold,}}>${node.label}</text>
      </circle >
    </group >
    `
  return jsx
}
const combo_jsx = (node) => {
  const jsx = `
    <group>
      <rect style={{
      fill: '#deffff',
      stroke: '#ff0000',
      width:500,
      height:500,
      lineWidth:5,
      }}draggable="true">
        
      </circle >
    </group >
    `
  return jsx
}
const custNode = { data_jsx, combo_jsx }
export default custNode