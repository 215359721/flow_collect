const innerCss = `
  .g6-component-tooltip {
    border: 1px solid #e2e2e2
    border-radius: 4px
    font-size: 12px
    color: #000
    background-color: rgba(255, 255, 255, 0.9)
    padding: 10px 8px
    box-shadow: rgb(174, 174, 174) 0px 0px 10px
  }
  .g6-minimap{
    position:absolute;
    bottom:10px;
    left:10px;
    background-color: #fff;
  }
  .g6-minimap-container {
    border: 1px solid #e2e2e2;
  }
  .g6-minimap-viewport {
    border: 2px solid rgb(25, 128, 255);
  }
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 0px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  .g6-component-toolbar{
    li {
      list-style-type: none !important;
      display:none !important;
    }
     li:nth-child(0){
       display:none !important;
     }
  }
`
export default innerCss