const tooTipHTML = `
<div class="content" style="padding: 0px;background-color: rgb(255, 255, 255);">
        <div class="main-part" style="height: 50px;margin-bottom: 5px;display: flex;justify-content: space-between;align-items: center;">
          <div class="each-main-box" style="width: 100px;display: flex;">
            <div class="left flex-center" style="display: flex;justify-content: center;align-items: center;width: 45%;">
              <img src="${require('../assets/image/comp/user_head.png')}" style="width: 40px;height: 40px;">
            </div>
            <div class="right" style="width: 55%;">
              <div class="con flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;">张玲云</div>
              <div class="desc flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;color: #9a9a9a;font-size: 12px;">负责人</div>
            </div>
          </div>
          <div class="each-main-box" style="width: 100px;display: flex;">
            <div class="left flex-center" style="display: flex;justify-content: center;align-items: center;width: 45%;">
              <img src="${require('../assets/image/comp/status.png')}" style="width: 40px;height: 40px;">
            </div>
            <div class="right" style="width: 55%;">
              <div class="con flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;">未开始</div>
              <div class="desc flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;color: #9a9a9a;font-size: 12px;">当前状态</div>
            </div>
          </div>
          <div class="each-main-box" style="width: 100px;display: flex;">
            <div class="left flex-center" style="display: flex;justify-content: center;align-items: center;width: 45%;">
              <img src="${require('../assets/image/comp/nprmal.png')}" style="width: 40px;height: 40px;">
            </div>
            <div class="right" style="width: 55%;">
              <div class="con flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;">普通</div>
              <div class="desc flex-center" style="display: flex;justify-content: center;align-items: center;height: 25px;color: #9a9a9a;font-size: 12px;">优先级</div>
            </div>
          </div>
        </div>
        <div class="info-part" style="height: 140px;margin-top: 5px;padding-left: 10px;">
          <div class="title" style="font-weight: bold;line-height: 20px;">任务详情</div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            创建人：赵竹林
          </div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            截止时间：2021-10-31 17:00
          </div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            创建时间：2021-10-01 9:00
          </div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            计划开始时间：2021-10-01 9:00
          </div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            计划结束时间：2021-10-15 19:00
          </div>
          <div class="each-item" style="color: #9a9a9a;font-size: 12px;line-height: 20px;">
            标签：<span class="mark" style="padding: 0px 3px;background-color: rgb(62, 62, 255);color: #fff;border-radius: 3px;">审批任务</span>
          </div>
        </div>
        <div class="in-part" style="height: 60px;margin-top: 5px;padding-left: 10px;overflow: auto;">
          <div class="title" style="font-weight: bold;line-height: 20px;">输入物</div>
          <div class="file-item" style="line-height: 20px;font-size: 12px;color: rgb(62, 62, 255);">
            会议申请单.doc
          </div>
          <div class="file-item" style="line-height: 20px;font-size: 12px;color: rgb(62, 62, 255);">
            会议参会人员名单.excl
          </div>
        </div>
        <div class="out-part" style="height: 60px;margin-top: 5px;padding-left: 10px;overflow: auto;">
          <div class="title" style="font-weight: bold;line-height: 20px;">产出物</div>
          <div class="file-item" style="line-height: 20px;font-size: 12px;color: rgb(62, 62, 255);">
            会议纪要.doc
          </div>
        </div>
        <div class="desc-part" style="height: 60px;margin-top: 5px;padding-left: 10px;overflow: auto;">
          <div class="title" style="font-weight: bold;line-height: 20px;">任务描述</div>
          <div class="content" style="height: 40px;color: #9a9a9a;font-size: 12px;padding-left: 0px !important;">这里显示文字信息任务描述</div>
        </div>
      </div>
`
export default tooTipHTML