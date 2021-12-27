import {defaultConfig} from '../config/index'
let windowWidth = 0, windowHeight = 0, windowZoom = 1.0
const CONFIG = JSON.parse(localStorage.getItem('config')) || defaultConfig
const getWinWidth = function () {
  windowWidth = (document.documentElement.clientWidth) || (document.body.clientWidth);
  return windowWidth
}

const getWinHeight = function () {
  windowHeight = (document.documentElement.clientHeight) || (document.body.clientHeight);
  return windowHeight
}

const getWinZoom = function (standard = (CONFIG.scale_base || 1000)) {
  windowWidth = (document.documentElement.clientWidth) || (document.body.clientWidth);
  windowHeight = (document.documentElement.clientHeight) || (document.body.clientHeight);
  console.log('windowWidth:' + windowWidth + "|windowHeight:" + windowHeight + "|ues_scale:" + CONFIG.ues_scale)
  windowZoom = windowHeight / standard;
  if (CONFIG.use_scale) {
    return windowZoom
  } else {
    return 1.0
  }
}

export {
  getWinWidth,
  getWinHeight,
  getWinZoom
}
