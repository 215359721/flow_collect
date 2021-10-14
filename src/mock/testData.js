const inner_hei = 788
const inner_way = 7
const offSet_y = 3
const node_width = 150
const add_x = 155
const add_y = 55

const resultData = function (posObj) {
  const hei = (posObj && posObj.height) ? posObj.height : inner_hei
  const way = (posObj && posObj.way) ? posObj.way : inner_way
  return {
    nodes: [
      {
        id: '1',
        label: '项目任务书1',
        x: 100,
        y: 0,
        dep: 1,
      },
      {
        id: '2',
        label: '即时通讯',
        x: 100,
        y: (hei / way) * 1 + offSet_y,
        dep: 2,
      },
      {
        id: '3',
        label: '即时通讯中的项目任务书',
        x: 100,
        y: (hei / way) * 2 + offSet_y,
        dep: 3,
      },
      {
        id: '4',
        label: '即时通讯中的项目任务书',
        x: 100,
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '5',
        label: '即时通讯中的项目任务书',
        x: 100,
        y: (hei / way) * 4 + offSet_y,
        dep: 5,
      },
      {
        id: '6',
        label: '即时通讯中的项目任务书',
        x: 100,
        y: (hei / way) * 5 + offSet_y,
        dep: 6,
      },
      {
        id: '7',
        label: '即时通讯中的项目任务书',
        x: 100,
        y: (hei / way) * 6 + offSet_y,
        dep: 7,
      },
      {
        id: '8',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 4),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '9',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 8),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '10',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 12),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '11',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 16),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '12',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 20),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '13',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 24),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '14',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 28),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '15',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 32),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '16',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 36),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '17',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 40),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '18',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 44),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '19',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 48),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '20',
        label: '即时通讯中的项目任务书',
        x: 100 + 50 + (node_width * 52),
        y: (hei / way) * 3 + offSet_y,
        dep: 4,
      },
      {
        id: '21',
        label: '项目任务书2',
        x: 100 + (add_x * 1),
        y: 0,
        dep: 1,
      },
      {
        id: '22',
        label: '项目任务书2',
        x: 100 + (add_x * 2),
        y: 0,
        dep: 1,
      },
      {
        id: '23',
        label: '项目任务书3',
        x: 100 + (add_x * 3),
        y: 0,
        dep: 1,
      },
      {
        id: '24',
        label: '项目任务书4',
        x: 100 + (add_x * 0),
        y: 0 + (add_y * 1),
        dep: 1,
      },
      {
        id: '25',
        label: '项目任务书4',
        x: 100 + (add_x * 1),
        y: 0 + (add_y * 1),
        dep: 1,
      },
      {
        id: '26',
        label: '项目任务书4',
        x: 100 + (add_x * 2),
        y: 0 + (add_y * 1),
        dep: 1,
      },
    ],
    edges: [
      // {
      //   source: '1',
      //   target: '2',
      // },
      // {
      //   source: '2',
      //   target: '3',
      // },
      // {
      //   source: '3',
      //   target: '1',
      // },
    ],
  }
}
export default resultData