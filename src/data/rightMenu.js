/* eslint-disable no-undef */
import { defaultConfig } from '../config/index'
const CONFIG = JSON.parse(localStorage.getItem('config')) || defaultConfig
const getRightMenuHTML = (item, type = 'position', zoom = 1.0) => {
  let menu_html
  let jumpStr = '<button class="btn btn-small submit bounce-left" fnname="jumpInfo">跳转详情</button>'
  if ((item.icon === 'task') || (item.icon === 'document') || (item.icon === 'DataPacket') || ((item.icon === 'MeetingInfo') && (item.detailInfo) && (item.detailInfo.status !== '6'))) {
    jumpStr = ''
  }
  let showdebug = `<button class="btn btn-small submit bounce-left" fnname="copynode">显示节点ID</button>`
  showdebug = ''
  if (type === 'position') {
    let markStr = `<button class="btn btn-small submit bounce-left" fnname="addMark">添加批注</button>`
    if (item.notes !== "") {
      markStr = `<button class="btn btn-small submit bounce-left" fnname="showMark">查看批注</button>`
    }
    markStr = ''
    if (item.method === "block") {
      //背景节点无右键菜单
      return ``;
    }
    menu_html = `<div class="left-menu" style="zoom:${zoom}">
              ${showdebug}
              ${markStr}
              <button class="btn btn-small submit bounce-left" fnname="showNodeRelation">查看关系</button>
              ${jumpStr}
            </div>`

  } else {
    menu_html = `<div class="left-menu" style="zoom:${zoom}">
            ${showdebug}
            ${jumpStr}
            </div>`
  }
  return menu_html
}

const jumpDetailInfo = (node) => {
  let meetingNum = node.detailInfo.meetingNum
  let innerId = node.detailInfo.innerId
  let ASP_MEET_BASE_URL = CONFIG.meet_url
  let appId = ''
  let nativeappurl = ''

  if (node.detailInfo) {
    switch (node.icon) {
      case 'MeetingInfo':
        // eslint-disable-next-line no-undef
        nativeappurl = ASP_MEET_BASE_URL + `/#/meeting?code=${asp.usersrc.curLoginUser.userLoginName}&num=${meetingNum}&innerId=${innerId}&userid=${asp.user.uerid}`
        console.log('会议跳转：' + nativeappurl)
        window.open(nativeappurl)
        break;
      case 'Im':
      case 'im':
        appId = node.detailInfo.chatId
        nativeappurl = 'asp://shellapp/OverallCenter?chatId=' + appId
        console.log('即时通讯跳转:' + nativeappurl)
        window.openURL(nativeappurl)
        break;
      case 'App':
        appId = node.detailInfo.appId
        if (appId) {
          nativeappurl = 'asp://nativeapp/' + appId
          console.log('app跳转:' + nativeappurl)
          window.openURL(nativeappurl)
        } else {
          console.log('文档协同')
          const openWindowOption = `top=0,left=0,width=${window.screen.availWidth - 0},height=${window.screen.availHeight - 0}`
          const url = CONFIG.editdoc_url + `/template?id=${node.id}&code=${node.id}&fileId=${node.detailInfo.inPuts[0].fileId}&fileName=${node.detailInfo.inPuts[0].fileName}&userId=${asp.user.uerid}&userName=${asp.usersrc.curLoginUser.userLoginName}&openType=test`
          window.open(url, `模型与数据驱动的一体化协同设计平台-${node.detailInfo.inPuts[0].fileName}`, openWindowOption);
        }

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