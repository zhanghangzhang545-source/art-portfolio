// ============================================================
// workCard.js — 作品卡片（漫画跳转到阅读器，其余跳详情）
// ============================================================
import { h } from '../../core/dom.js';
import { imgEl } from './media.js';

export function workCard(work) {
  const href = work.type === 'comic' ? `#/comic/${work.id}` : `#/work/${work.id}`;
  const media = h('div', { class: 'work-card__media' }, imgEl(work.cover, null, work.title));
  if (work.type === 'comic') media.appendChild(h('span', { class: 'work-card__badge tag tag--cat', style: { background: 'var(--cat-comic)' } }, '漫画'));
  if (work.featured) media.appendChild(h('span', { class: 'work-card__featured tag tag--featured' }, '精选'));

  const metaParts = [String(work.year)];
  if (work.type === 'comic') metaParts.push(`共 ${(work.pages || []).length} 页`);
  else if (work.stage) metaParts.push(work.stage);

  const body = h('div', { class: 'work-card__body' }, [
    h('div', { class: 'work-card__title' }, work.title),
    h('div', { class: 'work-card__meta' },
      metaParts.map((m, i) => (i === 0 ? h('span', {}, m) : h('span', {}, '· ' + m)))),
  ]);
  return h('a', { class: 'work-card reveal', href }, [media, body]);
}
