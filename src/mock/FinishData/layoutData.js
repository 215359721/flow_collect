const data = {
  "data": {
    "local": "yes",
    "nodes": [
      {
        "beginDate": "2021-12-09",
        "anchorPoints": [0.3, 0.2],
        "creatorPhotoUrl": "http://api.bjsasc.com/aspfile/file/1.0/files/Q8ffe8dd3de01000",
        "deptName": "神软",
        "notes": "",
        "endDate": "",
        "executor": "",
        "icon": "App",
        "deptId": "1",
        "creatorName": "赵竹林",
        "prominent": 0,
        "keyInfo": [
          "第1行内容more...",
          "第2行内容more...",
          "第3行内容more...",
          "第4行内容more...",
        ],
        "detailInfo": {
          "innerId": "0662730c-b710-4ba3-901e-1a9ca8301588",
          "appIcon": "http://api.bjsasc.com/aspfile/file/1.0/files/Q8f92cd505a01000",
          "name": "决胜千里软件",
          "description": "决胜千里智能博弈推演平台是面向航天领域前沿创新/潜在背景/系统级项目，从智能算法研究、新概念生成验证到作战效能评估的设计支撑工具。采用仿真推演形式，结合前沿人工智能技术，嵌入智能决策模型，涵盖了场景及装备编辑、智能模型训练、测试评估整个流程，可支撑弹载智能模型的地面训练、作战装备的体系效能评估、作战筹划、指挥决策、效能评估的全流程海量智能对抗推演。支持人人、人机、人机对抗和人机结合4种模拟对抗方式",
          "type": "1"
        },
        "id": "0662730c-b710-4ba3-901e-1a9ca8301588",
        "label": "决胜千里软件",
        "x": 100,
        "y": 50
      },
      {
        "beginDate": "2021-12-09",
        "anchorPoints": [0.3, 0.2],
        "creatorPhotoUrl": "http://api.bjsasc.com/aspfile/file/1.0/files/Q8ef049c89201000",
        "deptName": "神软",
        "notes": "",
        "endDate": "",
        "icon": "task",
        "creatorName": "华语",
        "prominent": 1,
        "deptId": "1",
        "keyInfo": [
          "第1行内容more...",
          "第2行内容more...",
          "第3行内容more...",
          "第4行内容more...",
        ],
        "detailInfo": {
          "innerId": "54cbd12c-6fb7-493d-ba4b-b5ad75295864",
          "appIcon": "http://api.bjsasc.com/aspfile/file/1.0/files/Q8ea005d07601000",
          "description": "",
          "name": "文档编写202112090002",
          "executor": "赵竹林",
          "executorIcon": "http://api.bjsasc.com/aspfile/file/1.0/files/Q8ffe8dd3de01000",
          "status": "进行中",
          "startTime": "2021-12-09 08:00:00",
          "endTime": "2021-12-10 23:59:59",
          "inPuts": [
            {
              "fileId": "Q911a8d1ab601000",
              "fileName": "任务优化文档说明（公开）.docx",
              "fileType": "docx",
              "fileCreator": "Q8dce7510d601000",
              "fileCreateTime": "2021-12-09 14:50:13"
            }
          ],
          "outPuts": [],
          "type": "普通任务",
          "priority": "普通"
        },
        "id": "54cbd12c-6fb7-493d-ba4b-b5ad75295864",
        "label": "文档编写任务123123123123",
        "x": 500,
        "y": 50
      },
      {
        "beginDate": "2021-12-09",
        "creatorPhotoUrl": "",
        "deptName": "",
        "notes": "",
        "endDate": "",
        "icon": "document",
        "creatorName": "",
        "deptId": "",
        "detailInfo": null,
        "id": "Q911a8d1ab601000",
        "label": "任务优化文档说明（公开）.docx",
        "x": 900,
        "y": 600
      }
    ],
    "edges": [
      {
        "source": "Q911a8d1ab601000",
        "target": "54cbd12c-6fb7-493d-ba4b-b5ad75295864"
      },
      {
        "source": "54cbd12c-6fb7-493d-ba4b-b5ad75295864",
        "target": "0662730c-b710-4ba3-901e-1a9ca8301588"
      }
    ]
  },
  "status": 200,
  "statusText": "",
  "headers": {
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    "content-type": "application/json",
    "expires": "0",
    "pragma": "no-cache"
  },
  "config": {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 10000,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "x-requested-with": "XMLHttpRequest"
    },
    "withCredentials": true,
    "method": "get",
    "baseURL": "http://192.168.1.55:2800/",
    "loading": true,
    "url": "http://192.168.1.55:2800/graph/getGraph?configId=1"
  },
  "request": {}
}

export default data