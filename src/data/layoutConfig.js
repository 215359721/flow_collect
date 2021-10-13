/* eslint-disable no-unused-vars */
const dagre = function (option) {
  return {
    type: 'dagre', //dagre
    rankdir: option.rankDir,
    align: this.align,
    sortByCombo: true,
    nodesepFunc: () => 20,
    ranksepFunc: () => 20,
  }
}
const force = function (option) {
  return {
    type: 'force', //force
    center: option.canvasCenter,
    nodeSize: [250 * 1.5, 360 * 1.5],
    linkDistance: 150,
    nodeStrength: 0,
    preventOverlap: true,
    workerEnabled: true,
  }
}
const fruchterman = function (option) {
  return {
    type: 'fruchterman', // fruchterman
    center: option.canvasCenter,
    gravity: 2,
    speed: 2,
  }
}
const grid = function (option) {
  return {
    type: 'grid',
    preventOverlap: true,
    nodeSize: [250 * 1.5, 360 * 1.5],
  }
}
const circular = function (option) {
  return {
    type: 'circular',
    center: option.canvasCenter,
    radius: 1600
  }
}
const concentric = function (option) {
  return {
    type: 'concentric',
    center: option.canvasCenter,
    preventOverlap: true,
    nodeSize: [250 * 1.5, 360 * 1.5],
    linkDistance: 1500,
  }
}

const configData = {
  dagre,
  force,
  fruchterman,
  grid,
  circular,
  concentric
}

export default configData