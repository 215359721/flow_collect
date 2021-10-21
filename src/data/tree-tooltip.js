export function showTooltip(data) {
  let html = ``;
  html += `<div class="web-tooltip">`;
  html += `<label class="web-tooltip-title"> 关键词：${data.name} </label>`;
  html += `<div class="web-tooltip-img-layout">`;
  html += `<img src=${data.path} class="web-tooltip-img" />`;
  html += `</div>`;
  html += `<p class="web-tooltip-desc"> 描述： </p>`;
  html += `<div class="web-tooltip-content">${data.desc}</div>`;
  html += `</div>`;
  return html;
}
