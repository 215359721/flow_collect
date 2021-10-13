const data = {
  nodes: [
    {
      id: '1',
      label: '项目任务书',
      icon: 'data',
      comboId: 'comboA',
    },
    {
      id: '2',
      label: '即时通讯',
      icon: 'chat',
      comboId: 'comboA',
    },
    {
      id: '3',
      label: '即时通讯中的项目任务书',
      icon: 'data',
      comboId: 'comboA',
    },
    {
      id: '4',
      label: '需求文档编写任务',
      icon: 'task',
      foldUp: true,
    },
    {
      id: '5',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '6',
      label: '编写子任务1',
      icon: 'task',
    },
    {
      id: '7',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '8',
      label: '即时通讯-群聊',
      icon: 'chat',
    },
    {
      id: '9',
      label: '群聊内容',
      icon: 'chat',
    },
    {
      id: '10',
      label: '文档协同编写工具',
      icon: 'task',
      foldUp: true,
      children: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
    },
    {
      id: '11',
      label: '章节编写任务',
      icon: 'task',
      comboId: 'comboB',
    },
    {
      id: '12',
      label: '章节对象',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '13',
      label: 'Word',
      icon: 'tool',
      comboId: 'comboB',
    },
    {
      id: '14',
      label: '文档',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '15',
      label: '章节编写任务',
      icon: 'task',
      foldUp: true,
      children: ['16', '17', '18'],
      comboId: 'comboB',
    },
    {
      id: '16',
      label: '章节对象',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '17',
      label: 'EXCEL',
      icon: 'tool',
      comboId: 'comboB',
    },
    {
      id: '18',
      label: '文档',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '19',
      label: '章节编写任务',
      icon: 'task',
      comboId: 'comboB',
    },
    {
      id: '20',
      label: '章节对象',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '21',
      label: 'PPT',
      icon: 'tool',
      comboId: 'comboB',
    },
    {
      id: '22',
      label: '文档',
      icon: 'data',
      comboId: 'comboB',
    },
    {
      id: '23',
      label: '23合并后文档',
      icon: 'data',
    },
    {
      id: '24',
      label: '24文档评审任务',
      icon: 'task',
    },
    {
      id: '25',
      label: '25合并后文档',
      icon: 'data',
    },
    {
      id: '26',
      label: '26文档评审任务2',
      icon: 'task',
    },
    {
      id: '27',
      label: '27...',
      icon: 'tool',
    },
    {
      id: '28',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '29',
      label: '编写子任务2',
      icon: 'task',
    },
    {
      id: '30',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '31',
      label: '在线会议',
      icon: 'chat',
    },
    {
      id: '32',
      label: '会议纪要',
      icon: 'data',
    },
    {
      id: '33',
      label: '编写任务',
      icon: 'task',
    },
    {
      id: '34',
      label: '任务要求1',
      icon: 'task',
    },
    {
      id: '35',
      label: '工具1',
      icon: 'tool',
    },
    {
      id: '36',
      label: '文档',
      icon: 'data',
    },
    {
      id: '37',
      label: '文档合并',
      icon: 'data',
    },
    {
      id: '38',
      label: '文档',
      icon: 'data',
    },
    {
      id: '39',
      label: '编写任务2',
      icon: 'task',
    },
    {
      id: '40',
      label: '任务要求2',
      icon: 'task',
    },
    {
      id: '41',
      label: '工具2',
      icon: 'tool',
    },
    {
      id: '42',
      label: '文档',
      icon: 'data',
    },
    {
      id: '43',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '44',
      label: '编写子任务3',
      icon: 'task',
    },
    {
      id: '45',
      label: '任务要求?',
      icon: 'task',
    },
    {
      id: '46',
      label: '在线会议',
      icon: 'chat',
    },
    {
      id: '47',
      label: '会议纪要',
      icon: 'data',
    },
    {
      id: '48',
      label: '编写任务1',
      icon: 'task',
    },
    {
      id: '49',
      label: '任务要求1',
      icon: 'task',
    },
    {
      id: '50',
      label: '即时通讯-群聊',
      icon: 'chat',
    },
    {
      id: '51',
      label: '群聊内容',
      icon: 'chat',
    },
    {
      id: '52',
      label: '工具',
      icon: 'tool',
    },
    {
      id: '53',
      label: '文档',
      icon: 'data',
    },
    {
      id: '54',
      label: '编写任务2',
      icon: 'task',
    },
    {
      id: '55',
      label: '任务要求1',
      icon: 'task',
    },
    {
      id: '56',
      label: '在线会议',
      icon: 'chat',
    },
    {
      id: '57',
      label: '会议纪要',
      icon: 'data',
    },
    {
      id: '58',
      label: '会议纪要1',
      icon: 'data',
    },
    {
      id: '59',
      label: '文档1',
      icon: 'data',
    },
    {
      id: '60',
      label: '文档合并',
      icon: 'data',
    },
    {
      id: '61',
      label: '任务1文档',
      icon: 'data',
    },
    {
      id: '62',
      label: '任务2文档',
      icon: 'data',
    },
    {
      id: '63',
      label: '合并后任务3文档',
      icon: 'data',
    },
    {
      id: '64',
      label: '文档合并工具',
      icon: 'tool',
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
      target: '4',
    },
    {
      source: '4',
      target: '5',
      label: '4to5 - 1'
    },
    {
      source: '4',
      target: '5',
      label: '4to5 - 2'
    },
    {
      source: '4',
      target: '5',
      label: '4to5 - 3'
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '7',
      target: '8',
    },
    {
      source: '8',
      target: '9',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '11',
    },
    {
      source: '11',
      target: '12',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '13',
      target: '14',
    },
    {
      source: '10',
      target: '15',
    },
    {
      source: '15',
      target: '16',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '10',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '4',
      target: '23',
    },
    {
      source: '23',
      target: '24',
    },
    {
      source: '24',
      target: '25',
    },
    {
      source: '25',
      target: '26',
    },
    {
      source: '26',
      target: '27',
    },
    {
      source: '4',
      target: '28',
    },
    {
      source: '28',
      target: '29',
    },
    {
      source: '29',
      target: '30',
    },
    {
      source: '30',
      target: '31',
    },
    {
      source: '31',
      target: '32',
    },
    {
      source: '32',
      target: '33',
    },
    {
      source: '33',
      target: '34',
    },
    {
      source: '34',
      target: '35',
    },
    {
      source: '35',
      target: '36',
    },
    {
      source: '36',
      target: '37',
    },
    {
      source: '37',
      target: '38',
    },
    {
      source: '32',
      target: '39',
    },
    {
      source: '39',
      target: '40',
    },
    {
      source: '40',
      target: '41',
    },
    {
      source: '41',
      target: '42',
    },
    {
      source: '42',
      target: '37',
    },
    {
      source: '4',
      target: '43',
    },
    {
      source: '43',
      target: '44',
    },
    {
      source: '44',
      target: '58',
    },
    {
      source: '44',
      target: '59',
    },
    {
      source: '58',
      target: '60',
    },
    {
      source: '59',
      target: '60',
    },
    {
      source: '44',
      target: '45',
    },
    {
      source: '45',
      target: '46',
    },
    {
      source: '46',
      target: '47',
    },
    {
      source: '47',
      target: '48',
    },
    {
      source: '48',
      target: '49',
    },
    {
      source: '49',
      target: '50',
    },
    {
      source: '50',
      target: '51',
    },
    {
      source: '51',
      target: '52',
    },
    {
      source: '52',
      target: '53',
    },
    {
      source: '47',
      target: '54',
    },
    {
      source: '54',
      target: '55',
    },
    {
      source: '55',
      target: '56',
    },
    {
      source: '56',
      target: '57',
    },
    {
      source: '6',
      target: '61',
    },
    {
      source: '61',
      target: '64',
    },
    {
      source: '64',
      target: '23',
    },
    {
      source: '29',
      target: '62',
    },
    {
      source: '62',
      target: '64',
    },
    {
      source: '60',
      target: '63',
    },
    {
      source: '63',
      target: '64',
    },
    //---任务完成连线---
    // {
    //   source: '10',
    //   target: '6',
    //   label: '任务完成',
    // },
    // {
    //   source: '14',
    //   target: '11',
    //   label: '任务完成',
    // },
    // {
    //   source: '22',
    //   target: '19',
    //   label: '任务完成',
    // },
    // {
    //   source: '36',
    //   target: '33',
    //   label: '任务完成',
    // },
    // {
    //   source: '42',
    //   target: '39',
    //   label: '任务完成',
    // },
    // {
    //   source: '38',
    //   target: '29',
    //   label: '任务完成',
    // },
    // {
    //   source: '53',
    //   target: '48',
    //   label: '任务完成',
    // },
    // {
    //   source: '57',
    //   target: '54',
    //   label: '任务完成',
    // },
  ],
  combos: [
    {
      id: 'comboA',
      label: '这是1-3的分组',
    },
    {
      id: 'comboB',
      label: '这是11-22的分组',
    },
  ],
}

export default data