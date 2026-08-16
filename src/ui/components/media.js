// ============================================================
// media.js — 演示图占位生成（明确标注 DEMO，便于整体替换）
// 真实图片（dataURL / http(s)）直接透传；Demo 描述符渲染为莫兰迪占位图。
// ============================================================

// 美拉德暖色调占位（暖米 / 焦糖 / 灰褐 / 卡其），避免冷灰蓝绿破坏整体气质
const PALETTE = [
  ['#E7DCC6', '#B79B7C'], ['#DCCBB0', '#A6856A'], ['#E3D3BC', '#8C7B64'],
  ['#D8C7AE', '#9C8A74'], ['#E9D9C2', '#B07D4C'], ['#D2C3A8', '#7E6E58'],
  ['#E5D8C4', '#A89576'], ['#D9C9AF', '#B08968'],
];

function hashStr(str) {
  let hsh = 0;
  for (let i = 0; i < String(str).length; i++) hsh = (hsh * 31 + str.charCodeAt(i)) >>> 0;
  return hsh;
}

function ratioToSize(ratio) {
  const [w, h] = String(ratio || '4/5').split('/').map(Number);
  const base = 1000;
  return { w: base, h: Math.round((base * h) / w) };
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

/** 将封面/图片值解析为可直接用于 <img src> 的字符串 */
export function toImageSrc(value) {
  if (typeof value === 'string') return value; // dataURL 或 http(s)
  if (value && value.demo) {
    const { seed, ratio, label } = value;
    const { w, h } = ratioToSize(ratio);
    const pal = PALETTE[hashStr(seed) % PALETTE.length];
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
      `<rect width='${w}' height='${h}' fill='${pal[0]}'/>` +
      `<rect x='${w * 0.07}' y='${h * 0.07}' width='${w * 0.86}' height='${h * 0.86}' fill='none' stroke='${pal[1]}' stroke-opacity='0.38' stroke-width='2'/>` +
      `<circle cx='${w * 0.5}' cy='${h * 0.4}' r='${w * 0.14}' fill='none' stroke='${pal[1]}' stroke-opacity='0.42' stroke-width='2'/>` +
      `<line x1='${w * 0.5}' y1='${h * 0.54}' x2='${w * 0.5}' y2='${h * 0.62}' stroke='${pal[1]}' stroke-opacity='0.42' stroke-width='2'/>` +
      `<text x='${w / 2}' y='${h * 0.5}' fill='${pal[1]}' opacity='0.85' font-size='${w * 0.066}' font-weight='600' font-family='system-ui,sans-serif' text-anchor='middle'>${escapeXml(label || 'Demo')}</text>` +
      `<text x='${w / 2}' y='${h * 0.5 + w * 0.085}' fill='${pal[1]}' opacity='0.6' font-size='${w * 0.033}' letter-spacing='3' font-family='system-ui,sans-serif' text-anchor='middle'>DEMO 占位 · 待替换</text>` +
      `</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  return '';
}

/** 生成 <img> 元素 */
export function imgEl(value, className, alt = '') {
  const e = document.createElement('img');
  e.src = toImageSrc(value);
  if (className) e.className = className;
  e.alt = alt || '';
  e.loading = 'lazy';
  return e;
}
