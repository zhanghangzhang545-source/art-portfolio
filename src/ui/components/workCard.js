// ============================================================
// workCard.js — 作品卡片（无框、作品为绝对主角）
//  · 图片按素材自然比例呈现，不裁剪到统一尺寸
//  · 图说常驻于图下（如美术馆展签：标题 + 年份·分类），不靠 hover 遮罩
//  · 根据横/竖/方比例与精选标记，赋予杂志式版式尺寸
// ============================================================
import { h } from '../../core/dom.js';
import { imgEl } from './media.js';
import { typeName } from '../../data/types.js';

function aspectOf(work) {
  if (work.coverW && work.coverH) return work.coverW / work.coverH;
  const ratio = (work.cover && work.cover.ratio) || '4/5';
  const [w, ht] = String(ratio).split('/').map(Number);
  return w / ht;
}

/** 根据素材比例与精选标记，给出杂志式版式尺寸 class */
export function cardSizeClass(work) {
  const r = aspectOf(work);
  let cls = 'work-card--tall';
  if (r >= 1.4) cls = 'work-card--wide';
  else if (r <= 0.86) cls = 'work-card--tall';
  else cls = 'work-card--square';
  // 精选的横图 / 方图作为大图跨整行，形成视觉节奏
  if (work.featured && cls !== 'work-card--tall') cls = 'work-card--feature';
  return cls;
}

export function workCard(work, i = 0) {
  const href = work.type === 'comic' ? `#/comic/${work.id}` : `#/work/${work.id}`;
  const media = h('div', { class: 'work-card__media' }, imgEl(work.cover, null, work.title));
  if (work.type === 'comic') media.appendChild(h('span', { class: 'work-card__badge tag tag--cat', style: { '--dot': 'var(--cat-comic)' } }, '漫画'));
  if (work.featured) media.appendChild(h('span', { class: 'work-card__featured tag tag--featured' }, '精选'));

  const sub = [work.year ? String(work.year) : '', typeName(work.type)].filter(Boolean).join(' · ');

  // 图说：常驻于图下，克制如展签
  const cap = h('div', { class: 'work-card__cap' }, [
    h('span', { class: 'work-card__title' }, work.title),
    h('span', { class: 'work-card__sub' }, sub),
  ]);

  return h('a', { class: `work-card ${cardSizeClass(work)} reveal`, href }, [media, cap]);
}
