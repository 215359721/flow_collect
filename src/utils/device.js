let windowWidth = 0, windowHeight = 0, windowZoom = 1.0
const CONFIG = window._SERVERCONF
const getWinWidth = function () {
  windowWidth = (document.documentElement.clientWidth) || (document.body.clientWidth);
  return windowWidth
}

const getWinHeight = function () {
  windowHeight = (document.documentElement.clientHeight) || (document.body.clientHeight);
  return windowHeight
}

const getWinZoom = function (standard = 980) {
  windowWidth = (document.documentElement.clientWidth) || (document.body.clientWidth);
  windowHeight = (document.documentElement.clientHeight) || (document.body.clientHeight);
  console.log('windowWidth:' + windowWidth + "|windowHeight:" + windowHeight + "|ues_scale:" + CONFIG.ues_scale)
  windowZoom = windowHeight / standard;
  if (CONFIG.ues_scale) {
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
