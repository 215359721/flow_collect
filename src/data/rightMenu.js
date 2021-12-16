const getRightMenuHTML = (item, type = 'position', zoom = 1.0) => {
  let menu_html
  let jumpStr = '<button class="btn btn-small submit bounce-left" fnname="jumpInfo">跳转详情</button>'
  if ((item.icon === 'task') || (item.icon === 'document')|| (item.icon === 'DataPacket') || ((item.icon === 'MeetingInfo') && (item.detailInfo) && (item.detailInfo.status !== '6'))) {
    jumpStr = ''
  }
  if (type === 'position') {

    let markStr = `<button class="btn btn-small submit bounce-left" fnname="addMark">添加批注</button>`
    if (item.notes !== "") {
      markStr = `<button class="btn btn-small submit bounce-left" fnname="showMark">查看批注</button>`
    }
    if (item.method === "block") {
      //背景节点无右键菜单
      return ``;
    }
    menu_html = `<div class="left-menu" style="zoom:${zoom}">
              <button class="btn btn-small submit bounce-left" fnname="copynode">显示节点ID</button>
              ${markStr}
              <button class="btn btn-small submit bounce-left" fnname="showNodeRelation">查看关系</button>
              ${jumpStr}
            </div>`

  } else {
    menu_html = `<div class="left-menu" style="zoom:${zoom}">
            <button class="btn btn-small submit bounce-left" fnname="copynode">显示节点ID</button>
            ${jumpStr}
            </div>`
  }
  return menu_html
}

const jumpDetailInfo = (node) => {
  let meetingNum = node.detailInfo.meetingNum
  let innerId = node.detailInfo.innerId
  let ASP_MEET_BASE_URL = "https://meet.bjsasc.com:8443"
  // eslint-disable-next-line no-undef
  let meetingUrl = ASP_MEET_BASE_URL + `/#/meeting?code=${asp.usersrc.curLoginUser.userLoginName}&num=${meetingNum}&innerId=${innerId}&userid=${asp.user.uerid}`
  let appId = node.detailInfo.appId
  let nativeappurl = 'asp://nativeapp/' + appId

  if (node.detailInfo) {
    switch (node.icon) {
      case 'MeetingInfo':
        console.log(meetingUrl, 'meetingUrl')
        window.open(meetingUrl)
        break;
      // case 'Im':
      // case 'im':
      //   appId = node.detailInfo.chatId
      //   break;
      case 'App':

        console.log('跳转:' + nativeappurl)
        window.openURL(nativeappurl)
        break
      default:
        break;
    }

  } else {
    alert('无详情节点数据')
  }
}

export {
  getRightMenuHTML,
  jumpDetailInfo,
}