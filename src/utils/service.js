// 系统内置认证服务
let AuthService = null
let KernelUIService = null
let ApplicationService = null
// 系统内置工具服务  saView 为兼容处理
let saView = null
let DesktopService = null
let StorageFileService = null
let UserService = null
let AppStoreService = null
let MqttService = null
let AppCenterService = null
let NotifierService = null
let EventManager = null
let MiddlewarekManager = null
let StorageManager = null
let LogManager = null
let asp = null
let ChatService = null
let SecManagerService = null
let TaskService = null
let productSpaceService = null
let SubscribeService = null
let OrgService = null
// 是否在浏览器运行
let isBrowser = false
// 是否是win7以上操作系统
let isWIN7 = true
let File_BASE_URL = null
let BASE_URL = null
//语音转换地址
let TextTran_URL = null
let ASP_MEET_BASE_URL= null
let ASP_MEET_MAN_BASE_URL = null
let ASP_DCM_MAN_BASE_URL = null
let SOCKET_URL = null
if (window.asp) {
  // 当前是客户端环境
  asp = window.asp
  EventManager = window.EventManager
  MiddlewarekManager = window.MiddlewarekManager
  StorageManager = window.StorageManager
  LogManager = window.LogManager
  AuthService = window.asp.getServiceByClassName('AuthService')
  KernelUIService = window.asp.getServiceByClassName('KernelUIService')
  ApplicationService = window.asp.getServiceByClassName('ApplicationService')
  TaskService = window.asp.getServiceByClassName('TaskService')
  StorageFileService = window.asp.getServiceByClassName('StorageFileService')
  UserService = window.asp.getServiceByClassName('UserService')
  OrgService = window.asp.getServiceByClassName('OrgService')
  SecManagerService = window.asp.getServiceByClassName('SecManagerService')
  AppStoreService = window.asp.getServiceByClassName('AppStoreService')
  saView = window.asp.getServiceByClassName('DesktopService')
  AppCenterService = window.asp.getServiceByClassName('AppCenterService')
  MqttService = window.asp.getServiceByClassName('MqttService')
  DesktopService = window.asp.getServiceByClassName('DesktopService')
  NotifierService = window.asp.getServiceByClassName('NotifierService')
  ChatService = window.asp.getServiceByClassName('ChatService')
  productSpaceService = window.asp.getServiceByClassName('productSpaceService')
  SubscribeService = window.asp.getServiceByClassName('SubscribeServiceENG')
  BASE_URL = saView.ASP_CONFIG.ASP_API_BASE_URL
  isWIN7 = saView.ASP_CONFIG.Environment.os === 'win'
  File_BASE_URL = saView.ASP_CONFIG.ASP_API_BASE_URL + 'aspfile/file/1.0/files/'
  ASP_MEET_BASE_URL= saView.ASP_CONFIG.ASP_MEET_BASE_URL
  TextTran_URL = saView.ASP_CONFIG.TextTran_URL || 'http://192.168.1.42:8888/asrt/file/conver/'
  ASP_MEET_MAN_BASE_URL =saView.ASP_CONFIG.ASP_MEET_MAN_BASE_URL || 'http://192.168.1.49:2800/'
  ASP_DCM_MAN_BASE_URL = saView.ASP_CONFIG.ASP_DCM_MAN_BASE_URL || 'http://192.168.1.42:2020/'
  SOCKET_URL = saView.ASP_CONFIG.SOCKET_URL || 'http://192.168.1.42:8766'
} else {
  // 当前是浏览器环境
  isBrowser = true
  asp = {
    user: {
      code: 200,
      domainId: 'orgRootDomain',
      userid: '2ffe8266a4b7000',
      tokenstr: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjpudWxsLCJ1c2VyTG9naW5OYW1lIjoiaHVheXUiLCJ1c2VyTmFtZSI6IuWNjuivrSIsImVtYWlsIjoiYWRtaW5UZXN0MDFAYmpzYXNjLmNvbSIsInVzZXJJZCI6IjJmZmU4MjY2YTRiNzAwMCIsImNsaWVudElwIjoiMTAuMC4zNy4xMSIsImNsaWVudE1hYyI6bnVsbCwidXNlckFnZW50IjpudWxsLCJkb21haW5JZCI6ImRyYXBSb290RG9tYWluIiwic2VjcmV0Q29kZSI6IjAyIiwiaXNzIjoiYmpzYXNjLmNvbSIsImlhdCI6MTU5MDk4OTk1NzE4NywiZXhwIjoxNTkxMDc2MzU3MTg3LCJyZXhwIjoxNTkxMDc2MzU3MTg3LCJyZWZyZXNoVG9rZW4iOiI0YWE1YWIwNy0wYjg3LTQ5Y2QtOWI4OC1iYTViNGUwZGFmZTYiLCJkZXZpY2VJZCI6IjE4MzI1MDA1Yjg3ZjJlZDZiYWEyODZlYjM5MWI0NmY4MzllN2ZkMzcyNDJiNzhjY2E1NjU4ZGE5ZjkzYTE4NDgiLCJjcmVhdGVUaW1lIjoiMjAyMC0wNi0wMVQwNTozOToxNy4xODYrMDAwMCIsImNsaWVudCI6dHJ1ZX0.WJT61Tie_dX9yRWcPNAR3lzCnxo_ECQEiusGk3DJzUM'
    }
  }
  AuthService = {
    async getUserInfo() {
      return {
        avatarFileId: '62abc772f226000',
        email: 'adminTest01@bjsasc.com',
        mobile: '',
        orgs: Array(0),
        username: '华宇',
        usertype: 0
      }
    }
  }
  KernelUIService = {
    async getAppBrowser() {
      return []
    }
  }
  ApplicationService = {
    async execCommand() {
      throw new Error('浏览器不支持该方法')
    }
  }
  saView = {
    ASP_CONFIG: {
      ASP_API_BASE_URL: 'http://api.01.CALT.CASC/',
      ASP_MEET_BASE_URL:"https://meet.bjsasc.com:8443",
      TextTran_URL:'http://192.168.1.42:8888/asrt/file/conver/',
      ASP_MEET_MAN_BASE_URL:'http://api.bjsasc.com/dcm/',
      ASP_DCM_MAN_BASE_URL:'http://api.bjsasc.com/meeting/',
      SOCKET_URL :'http://192.168.1.42:8766',
      

      //  ASP_API_BASE_URL: 'http:///'
    }
  }
  BASE_URL = saView.ASP_CONFIG.ASP_API_BASE_URL
  File_BASE_URL = saView.ASP_CONFIG.ASP_API_BASE_URL + 'aspfile/file/1.0/files/'
  ASP_MEET_BASE_URL= saView.ASP_CONFIG.ASP_MEET_BASE_URL
  TextTran_URL = saView.ASP_CONFIG.TextTran_URL
  ASP_MEET_MAN_BASE_URL = saView.ASP_CONFIG.ASP_MEET_MAN_BASE_URL
  ASP_DCM_MAN_BASE_URL = saView.ASP_CONFIG.ASP_DCM_MAN_BASE_URL
  SOCKET_URL =  saView.ASP_CONFIG.SOCKET_URL
  console.log(ASP_DCM_MAN_BASE_URL,123)
}
export {
  StorageManager,
  isBrowser,
  isWIN7,
  asp,
  AuthService,
  KernelUIService,
  ApplicationService,
  DesktopService,
  saView,
  StorageFileService,
  UserService,
  OrgService,
  AppCenterService,
  AppStoreService,
  MqttService,
  EventManager,
  MiddlewarekManager,
  ChatService,
  TaskService,
  LogManager,
  NotifierService,
  File_BASE_URL,
  BASE_URL,
  ASP_MEET_BASE_URL,
  SecManagerService,
  productSpaceService,
  TextTran_URL,
  SubscribeService,
  ASP_MEET_MAN_BASE_URL,
  ASP_DCM_MAN_BASE_URL,
  SOCKET_URL
}
