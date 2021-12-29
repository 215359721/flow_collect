const none = '暂无'
const defaultHead = require('../assets/image/newUI/bigHead.png')
function getTipHTML (node, zoom = 1.0) {
  console.log('getTipHTML-node', node)
  const info = node.detailInfo || {}
  let result = ``
  const task_html = `<div class="tip-div" style="zoom:${zoom}">
      <div class="tip-head task-head-bg task-border">任务</div>
      <div class="tip-content task-content-bg task-border">
        
        <div class="top-box">
          <div class="left">
            <img class="big-head" src="${node.executorPhotoUrl || defaultHead}">
            <div class="user-name bold">${info.executor || none}</div>
          </div>
          <div class="right">
            <div class="common-line lineheight20">
              <div class="title">任务名称：</div>
              <div class="desc bold">${info.name || none}</div>
            </div>
            <div class="common-line lineheight20">
              <div class="title">创建人：</div>
              <div class="desc normal">${splitDate(node.creatorName) || none}</div>
            </div>
            <div class="common-line lineheight20">
              <div class="title">截止时间：</div>
              <div class="desc normal">${splitDate(info.endTime) || none}</div>
            </div>
            <div class="common-line lineheight20">
              <div class="title">创建时间：</div>
              <div class="desc normal">${splitDate(info.startTime) || none}</div>
            </div>
            <div class="common-line lineheight20">
              <div class="title">当前状态：</div>
              <div class="desc normal">
              <img class="status" src=${trans4Status(info.status)}>${info.status || none}</div>
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
  const chat_html = `<div class="tip-div" style="zoom:${zoom}">
      <div class="tip-head chat-head-bg chat-border">即时通讯</div>
      <div class="tip-content chat-content-bg chat-border">

        <div class="top-box">
          <div class="left">
            <img class="big-head" src="${node.creatorPhotoUrl || defaultHead}">
            <div class="user-name bold">${node.creatorName || none}</div>
          </div>
          <div class="right">
            <div class="common-line">
              <div class="title">参与人：</div>
              <div class="desc bold">${info.executor || none}</div>
            </div>
            <div class="common-line">
              <div class="title">开始时间：</div>
              <div class="desc normal">${splitDate(info.startTime) || none}</div>
            </div>
            <div class="common-line">
              <div class="title">结束时间：</div>
              <div class="desc normal">${splitDate(info.endTime) || '未结束'}</div>
            </div>
          </div>
        </div>

        <div class="sep-line chat-line"></div>
        <div class="file-line">
          <div class="title bold">输入物：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
        <div class="record-line">
          <div class="title bold">会话记录：</div>
          <div class="record-box">
          ${getMessagePart(info.messages || [])}
            
          </div>
        </div>
      </div>
    </div>`
  const meet_html = `<div class="tip-div" style="zoom:${zoom}">
      <div class="tip-head meet-head-bg meet-border">会议</div>
      <div class="tip-content meet-content-bg meet-border">

        <div class="top-box">
          <div class="left">
            <img class="big-head" src="${node.creatorPhotoUrl || defaultHead}">
            <div class="user-name bold">${node.creatorName || none}</div>
          </div>
          <div class="right">
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
              <div class="desc normal">${splitDate(info.startTime) || none}</div>
            </div>
          </div>
        </div>
        
        <div class="sep-line meet-line"></div>
        <div class="file-line">
          <div class="title bold">会议文件：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
        <div class="file-line">
          <div class="title bold">会议纪要：</div>
          <div class="file-box">
            ${getFilePart(info.outPuts || [])}
          </div>
        </div>
      </div>
    </div>`
  const tool_html = `<div class="tip-div" style="zoom:${zoom}">
      <div class="tip-head tool-head-bg tool-border">工具</div>
      <div class="tip-content tool-content-bg tool-border">

        <div class="top-box">
          <div class="left">
            <img class="big-head" src="${node.creatorPhotoUrl || defaultHead}">
            <div class="user-name bold">${node.creatorName || none}</div>
          </div>
          <div class="right">
            <div class="common-line">
              <div class="title">工具名称：</div>
              <div class="desc bold">${node.label || none}</div>
            </div>
            <div class="common-line">
              <div class="title">创建人：</div>
              <div class="desc normal">${node.creatorName || none}</div>
            </div>
            <div class="common-line">
              <div class="title">创建时间：</div>
              <div class="desc normal">${splitDate(info.startTime) || none}</div>
            </div>
          </div>
        </div>

        <div class="sep-line tool-line"></div>
        <div class="desc-line">
          <div class="title bold">工具介绍：</div>
          <div class="content normal tool-max">${info.description || none}</div>
        </div>
        <div class="file-line">
          <div class="title bold">文件：</div>
          <div class="file-box">
            ${getFilePart(info.inPuts || [])}
          </div>
        </div>
      </div>
    </div>`
  const data_html = `<div class="tip-div" style="height:100px;zoom:${zoom}">
    <div class="tip-head data-head-bg data-border">数据详情</div>
    <div class="tip-content data-content-bg data-border">
      <div class="file-line">
        <div class="title bold">数据信息：</div>
        <div class="file-box">
          ${getFilePart([{ "fileName": node.label || '暂无', "fileType": "docx", "fileId": node.id || '' }])}
        </div>
      </div>
    </div>
  </div>`
  const data_packet_html = `<div class="tip-div" style="zoom:${zoom}">
    <div class="tip-head data-head-bg data-border">数据包</div>
    <div class="tip-content data-content-bg data-border">
      <div class="top-box">
        <div class="left">
          <img class="big-head" src="${node.creatorPhotoUrl || defaultHead}">
          <div class="user-name bold">${info.creator || none}</div>
        </div>
        <div class="right">
          <div class="common-line">
            <div class="title">包名称：</div>
            <div class="desc bold">${node.label || none}</div>
          </div>
          <div class="common-line">
            <div class="title">创建人：</div>
            <div class="desc normal">${splitDate(info.creator) || none}</div>
          </div>
          <div class="common-line">
            <div class="title">创建时间：</div>
            <div class="desc normal">${splitDate(info.createTime) || none}</div>
          </div>
        </div>
      </div>
      <div class="sep-line chat-line"></div>
      <div class="file-line">
        <div class="title bold">数据列表：</div>
        <div class="file-box">
          ${getFilePart(info.inPuts || [])}
        </div>
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
    case 'Im':
    case 'im':
      result = chat_html
      break;
    case "DataPacket":
      result = data_packet_html
      break;
    case "document":
      result = data_html
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
      content += `<span class="single-file link" id="${fileArray[i].fileId}">${(fileArray[i].fileName || fileArray[i].filename) || none}</span>`
      if (i < fileArray.length - 1) {
        content += '<br/>'
      }
    }
  } else {
    content = '暂无数据'
  }
  return content
}

function getMessagePart (msgArray) {
  let content = ''
  if (msgArray.length) {
    for (let i = 0; i < msgArray.length; i++) {
      content += `<div class="single-record">
                    <span class="bold">${msgArray[i].sourceName || none}</span>
                    <span class="ml5">${msgArray[i].createTime || none}：</span>
                    <span class="normal ml5">${msgArray[i].msg || none}</span>
                  </div >`
      if (i < msgArray.length - 1) {
        content += '<br/>'
      }
    }
  } else {
    content = '暂无数据'
  }
  return content
}

function trans4Status (status) {
  let image = null
  switch (status) {
    case '未开始':
      image = require('../assets/icon/status/prepare.png')
      break;
    case '进行中':
      image = require('../assets/icon/status/start.png')
      break;
    case '已完成':
      image = require('../assets/icon/status/complate.png')
      break;
    case '已取消':
      image = require('../assets/icon/status/cancel.png')
      break;
    case '已停止':
    case '已暂停':
      image = require('../assets/icon/status/suapend.png')
      break;
    case '已拒绝':
    case '已回收':
      image = require('../assets/icon/status/terminate.png')
      break;
    default:
      image = require('../assets/icon/status/prepare.png')
      break;
  }
  return image
}

// eslint-disable-next-line no-unused-vars
function trans4Type (priority) {
  let image = null
  switch (priority) {
    case '普通':
      image = require('../assets/icon/type/common.png')
      break;
    case '紧急':
      image = require('../assets/icon/type/urgency.png')
      break;
    case '非常紧急':
      image = require('../assets/icon/type/veryurgency.png')
      break;
    default:
      image = require('../assets/icon/type/common.png')
      break;
  }
  return image
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

function splitDate (descDate) {
  // console.log(`${typeof(descDate)}`,descDate)
  if (!descDate || (typeof (descDate) !== 'string')) { return null }
  const arr = descDate.split(" ")
  if (arr.length) {
    return arr[0]
  } else {
    return descDate
  }
}

export default getTipHTML