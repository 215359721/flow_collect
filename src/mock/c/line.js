const data = {
  nodes: [
    {
      "id": "19229",
      "label": "单稳态触发器",
      "icon": "tool",
    },
    {
      "id": "23798",
      "label": "计数式触发器",
      "icon": "tool",
    },
    {
      "id": "3931",
      "label": "触发器",
      "icon": "tool",
    },
    {
      "id": "1",
      "label": "主从触发器",
      "icon": "tool",
    },
    {
      "id": "663",
      "label": "计算机基本电路与部件",
      "icon": "tool",
    },
    {
      "id": "679",
      "label": "隧道二极管触发器",
      "icon": "tool",
    },
    {
      "id": "703",
      "label": "弹道式弹射装置",
      "icon": "service",
    },
    {
      "id": "13550",
      "label": "弹射装置",
      "icon": "service",
    },
    {
      "id": "19565",
      "label": "发射发射系统",
      "icon": "service",
    },
    {
      "id": "11075",
      "label": "发射装置",
      "icon": "service",
    },
    {
      "id": "11075",
      "label": "发射装置",
      "icon": "service",
    },
    {
      "id": "4821",
      "label": "燃气发生器式弹射装置",
      "icon": "service",
    },
    {
      "id": "11075",
      "label": "发射装置",
      "icon": "service",
    },
    {
      "id": "15254",
      "label": "舰上弹射装置",
      "icon": "service",
    },
    {
      "id": "2296",
      "label": "电磁式弹射装置",
      "icon": "service",
    },
    {
      "id": "19565",
      "label": "发射发射系统",
      "icon": "service",
    },
    {
      "id": "4148",
      "label": "液压式弹射装置",
      "icon": "service",
    },
  ],
  edges: [
    {
      "label": "F",
      "source": "3931",
      "target": "1"
    },
    {
      "label": "范畴",
      "source": "1",
      "target": "663"
    },
    {
      "label": "S",
      "source": "23798",
      "target": "3931"
    },
    {
      "label": "S",
      "source": "19229",
      "target": "3931"
    },
    {
      "label": "Z",
      "source": "679",
      "target": "3931"
    },
    {
      "label": "S",
      "source": "703",
      "target": "13550"
    },
    {
      "label": "范畴",
      "source": "703",
      "target": "19565"
    },
    {
      "label": "Z",
      "source": "703",
      "target": "11075"
    },

    {
      "label": "Z",
      "source": "1",
      "target": "703"
    },


    {
      "label": "Z",
      "source": "13550",
      "target": "11075"
    },
    {
      "label": "F",
      "source": "13550",
      "target": "4821"
    },
    {
      "label": "S",
      "target": "13550",
      "source": "11075",
      "edgeOffset": -100
    },
    {
      "label": "F",
      "source": "13550",
      "target": "15254"
    },
    {
      "label": "F",
      "source": "13550",
      "target": "2296"
    },
    {
      "label": "F",
      "source": "13550",
      "target": "703"
    },
    {
      "label": "范畴",
      "source": "13550",
      "target": "19565"
    },
    {
      "label": "F",
      "source": "13550",
      "target": "4148"
    },
  ],
}
export default data