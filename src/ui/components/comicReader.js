// ============================================================
// comicReader.js — 漫画阅读器组件
// 桌面端：居中纵向翻页；手机端：连续纵向滚动（CSS 已处理）。
// 支持上一页 / 下一页（滚动定位）+ 进度指示。
// ============================================================
import { h } from '../../core/dom.js';
import { imgEl } from './media.js';

export function renderComicReader(work, { startPage = 1 } = {}) {
  const pages = (work.pages || []).slice().sort((a, b) => a.order - b.order);
  const total = pages.length;
  let current = Math.min(Math.max(1, startPage), total);

  const progress = h('div', { class: 'reader__progress' }, `第 ${current} / ${total} 页`);

  const pageNodes = pages.map((p) =>
    h('div', { class: 'reader__page', id: `reader-page-${p.order}`, dataset: { order: String(p.order) } },
      imgEl(p.image, null, `${work.title} 第${p.order}页`)));

  const go = (delta) => {
    current = Math.min(Math.max(1, current + delta), total);
    const el = document.getElementById(`reader-page-${current}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    progress.textContent = `第 ${current} / ${total} 页`;
  };

  const nav = h('div', { class: 'reader__nav' }, [
    h('button', { class: 'btn btn--sm', on: { click: () => go(-1) } }, '← 上一页'),
    h('button', { class: 'btn btn--sm', on: { click: () => go(1) } }, '下一页 →'),
  ]);

  const reader = h('div', { class: 'reader' }, [
    progress,
    ...pageNodes,
    nav,
  ]);

  // 进入时定位到起始页
  setTimeout(() => { const el = document.getElementById(`reader-page-${current}`); if (el) el.scrollIntoView({ block: 'start' }); }, 50);
  return reader;
}
