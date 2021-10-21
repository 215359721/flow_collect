const data = {
  nodes: [
    {
      id: '1',
      label: '项目任务书',
      icon: 'logo',
    },
    {
      id: '2',
      label: '即时通讯',
      icon: 'chat',
    },
    {
      id: '3',
      label: '即时通讯中的项目任务书',
      icon: 'dot',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '3',
      target: '1',
    },
  ],
}

export default data