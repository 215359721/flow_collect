// 树图自定义节点
const tree_node = (node) => {
  let nodeName = ''
  if (node.name.length > 6) {
    nodeName = node.name.substring(0, 6) + "..."
  } else {
    nodeName = node.name
  }
  const treeNode =
    `<group>
      <rect style={{
        width: 120,
        height: 42,
        fill: 'l(90) 0:#06cde7 1:#1f94cc',
        radius: 10,
        cursor: pointer
      }}>
        <rect style={{
          width:29,
          height:28.5,
          marginTop: 6,
          marginLeft: 8,
          fill:'#fff',
          radius:3,
          next: inline
        }}>
          <image style={{
            img: ${node.img},
            width: 25,
            height: 25,
            marginTop: 2,
            marginLeft: 10,
            radius:3,
            cursor: pointer
          }}></image>
        </rect>
        <text style={{
          marginTop: 25,
          marginLeft: 12,
          fill: '#fff',
          fontWeight:bold,
          cursor: pointer}}>${nodeName}
        </text>
    </rect>
  </group>`
  return treeNode
}

// 树图自定义节点-大节点
const tree_node_big = (node) => {
  let nodeName = ''
  if (node.name.length > 6) {
    nodeName = node.name.substring(0, 6) + "..."
  } else {
    nodeName = node.name
  }
const treeNode_big =
    `<group>
      <rect style={{
        width: 120,
        height: 90,
        fill: 'l(90) 0:#06cde7 1:#1f94cc',
        radius: 5,
        cursor: pointer
      }}>
        <rect style={{
          width:110,
          height:65,
          marginTop: 5,
          marginLeft: 5,
          radius: 3,
          fill:'#fff',
        }}>
          <image style={{
            img: ${node.img},
            width: 104,
            height: 60,
            marginTop: 3,
            marginLeft: 8,
            cursor: pointer
          }}></image>
        </rect>
        <text style={{
          marginTop: 20,
          marginLeft: 5,
          fill: '#fff',
          fontWeight:bold,
          cursor: pointer}}>${nodeName}
        </text>
    </rect>
  </group>`
  return treeNode_big
}

//树自定义关系节点
const rela_node = (node) => {
  console.log(node.name)
  return `<group>
      <circle style={{
        r:20,
        fill:'#e8f5f9',
        stroke:'#1f94cc',
        lineWidth:3
      }}>
        <text style={{fill:'#1f94cc',textAlign: 'center',fontSize:15,marginTop:-8,fontWeight:bold}}>${node.name}</text>
      </circle>
  </group>`
}

export default { tree_node, rela_node,tree_node_big }