const inner_hei = 788
const padding = 5
const node_width = 150

const resultData = function (posObj) {
  const hei = (posObj && posObj.height) ? posObj.height : inner_hei
  return {
    nodes: [
      {
        id: '101',
        label: '第2周',
        method: 'line',
        x: 100 + (padding * 4) + (node_width * 4),
        y: 0,
        width: 1,
        height: hei,
        color: '#f2f2f2',
        dotline: true,
      },
      {
        id: '102',
        label: '第3周',
        method: 'line',
        x: 100 + (padding * 8) + (node_width * 8),
        y: 0,
        width: 1,
        height: hei,
        color: '#f2f2f2',
        dotline: true,
      },
      {
        id: '103',
        label: '第4周',
        method: 'line',
        x: 100 + (padding * 12) + (node_width * 12),
        y: 0,
        width: 1,
        height: hei,
        color: '#f2f2f2',
        dotline: true,
      },
      {
        id: '104',
        label: '第4周',
        method: 'line',
        x: 100 + (padding * 16) + (node_width * 16),
        y: 0,
        width: 1,
        height: hei,
        color: '#f2f2f2',
        dotline: true,
      },
      {
        id: '105',
        label: '第5周【截止点】',
        method: 'line',
        x: 100 + (padding * 20) + (node_width * 20),
        y: 0,
        width: 1,
        height: hei,
        color: '#ff0000',
        dotline: false,
      },
    ],
    edges: [
    ],
  }
}
export default resultData