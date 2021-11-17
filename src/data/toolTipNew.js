const none = '暂无'
function getTipHTML (node) {
  // console.log('getTipHTML', node)
  const info = node.detailInfo || {}
  let result = ``
  const task_html = `<div class="tip-div">
      <div class="tip-head task-head-bg task-border">任务</div>
      <div class="tip-content task-content-bg task-border">
        <div class="common-line lineheight20">
          <div class="title">任务名称：</div>
          <div class="desc bold">${info.name || none}</div>
        </div>
        <div class="common-line lineheight20">
          <div class="title">创建人：</div>
          <div class="desc normal">${node.creatorName || none}</div>
        </div>
        <div class="common-line lineheight20">
          <div class="title">截止时间：</div>
          <div class="desc normal">${info.endTime || none}</div>
        </div>
        <div class="common-line lineheight20">
          <div class="title">创建时间：</div>
          <div class="desc normal">${info.startTime || none}</div>
        </div>
        <div class="status-line">
          <div class="each-box">
            <div class="head-img">
              <img
                class="status-image"
                src=${require('../assets/image/newUI/defaultHead.png')}
              >
            </div>
            <div class="status-text">
              <div class="bold">${info.executor || none}</div>
              <div class="normal size10">负责人</div>
            </div>
          </div>
          <div class="each-box">
            <div class="head-img">
              <img
                class="status-image"
                src=${require('../assets/image/newUI/defaultHead.png')}
              >
            </div>
            <div class="status-text">
              <div class="bold">${info.status || none}</div>
              <div class="normal size10">当前状态</div>
            </div>
          </div>
          <div class="each-box">
            <div class="head-img">
              <img
                class="status-image"
                src=${require('../assets/image/newUI/defaultHead.png')}
              >
            </div>
            <div class="status-text">
              <div class="bold">${info.type || none}</div>
              <div class="normal size10">优先级</div>
            </div>
          </div>
        </div>
        <div class="sep-line task-line"></div>
        <div class="file-line">
          <div class="title bold">输入物：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
        <div class="file-line">
          <div class="title bold">输出物：</div>
          <div class="file-box">
            ${getFilePart(info.outPuts || [])}
          </div>
        </div>
        <div class="desc-line">
          <div class="title bold">描述：</div>
          <div class="content normal max20">${info.description || none}</div>
        </div>
      </div>
    </div>`
  const chat_html = `<div class="tip-div">
      <div class="tip-head chat-head-bg chat-border">即时通讯</div>
      <div class="tip-content chat-content-bg chat-border">
        <div class="common-line">
          <div class="title">参与人：</div>
          <div class="desc bold">${info.executor || none}</div>
        </div>
        <div class="common-line">
          <div class="title">开始时间：</div>
          <div class="desc normal">${info.startTime || none}</div>
        </div>
        <div class="common-line">
          <div class="title">结束时间：</div>
          <div class="desc normal">${info.endTime || none}</div>
        </div>
        <div class="sep-line chat-line"></div>
        <div class="file-line">
          <div class="title bold">输入信息：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
        <div class="record-line">
          <div class="title bold">会话记录：</div>
          <div class="record-box">
            <div class="single-record">
              <span class="bold">赵竹林</span>
              <span class="ml5">2021-10-21 09:00：</span>
              <span class="normal ml5">文字内容+图片内容+xxxxxxx</span>
            </div>
            <div class="single-record">
              <span class="bold">刘子扬</span>
              <span class="ml5">2021-10-21 09:10：</span>
              <span class="normal ml5">文字内容1+图片内容1+xxxxxxx1</span>
            </div>
          </div>
        </div>
      </div>
    </div>`
  const meet_html = `<div class="tip-div">
      <div class="tip-head meet-head-bg meet-border">会议</div>
      <div class="tip-content meet-content-bg meet-border">
        <div class="common-line">
          <div class="title">会议主题：</div>
          <div class="desc bold">${info.name || none}</div>
        </div>
        <div class="common-line">
          <div class="title">密级：</div>
          <div class="desc normal">${trans4Secret(info.secret)}</div>
        </div>
        <div class="common-line">
          <div class="title">参与人：</div>
          <div class="desc normal">${info.executor || none}</div>
        </div>
        <div class="common-line">
          <div class="title">参会时间：</div>
          <div class="desc normal">${info.startTime || none}</div>
        </div>
        <div class="sep-line meet-line"></div>
        <div class="file-line">
          <div class="title bold">输入物：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
        <div class="file-line">
          <div class="title bold">输出物：</div>
          <div class="file-box">
            ${getFilePart(info.outPuts || [])}
          </div>
        </div>
        <div class="desc-line">
          <div class="title bold">会议结论：</div>
          <div class="content normal max20">这里显示会议结论文字描述信息</div>
        </div>
      </div>
    </div>`
  const tool_html = `<div class="tip-div">
      <div class="tip-head tool-head-bg tool-border">工具</div>
      <div class="tip-content tool-content-bg tool-border">
        <div class="common-line">
          <div class="title">工具名称：</div>
          <div class="desc bold">word|excel</div>
        </div>
        <div class="common-line">
          <div class="title">创建人：</div>
          <div class="desc normal">赵竹林</div>
        </div>
        <div class="common-line">
          <div class="title">创建时间：</div>
          <div class="desc normal">2021-10-01 09:00:00</div>
        </div>
        <div class="sep-line tool-line"></div>
        <div class="desc-line">
          <div class="title bold">工具介绍：</div>
          <div class="content normal tool-max">Word2003是目前使用比较广泛的一种文字处理软件，它集文字的编辑、排版、表格处理、图形处理为一体，在Word中我们可以制作一份简单的通知。在则业的时候我们可以撰写自己的简历、可以加入自己的照片，并且我们可以书写论文、计划，同时我们还可以在我们编写的文档中加入声音、图象这样可以构成一个图文并茂的文件。为你提供word2003下载</div>
        </div>
      </div>
    </div>`
  switch (node.icon) {
    case 'task':
      result = task_html
      break;
    case 'MeetingInfo':
      result = meet_html
      break;
    case 'im':
      result = chat_html
      break;
    default:
      result = tool_html
      break;
  }
  return result
}

function getFilePart (fileArray) {
  let content = ''
  // console.log('fileArray:', fileArray)
  if (fileArray.length) {
    for (let i = 0; i < fileArray.length; i++) {
      content += '<span class="single-file link">' + fileArray[i].fileName || none + '</span>'
      if (i < fileArray.length - 1) {
        content += '<br/>'
      }
    }
  } else {
    content = '暂无数据'
  }
  return content
}

function trans4Secret (secret) {
  let result = ''
  switch (secret) {
    case '10':
      result = '公开'
      break;
    case '20':
      result = '内部'
      break;
    case '30':
      result = '秘密'
      break;
    case '40':
      result = '机密'
      break;
    default:
      result = '未知'
      break;
  }
  return result
}

export default getTipHTML