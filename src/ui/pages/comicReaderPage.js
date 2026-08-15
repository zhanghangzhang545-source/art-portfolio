// ============================================================
// comicReaderPage.js — 漫画详情 / 阅读页
//  第一屏：作品标题 + 封面；向下：纵向连续阅读（手机端连续滚动）
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { renderComicReader } from '../components/comicReader.js';
import { imgEl } from '../components/media.js';
import { emptyState, catTag } from '../components/primitives.js';

export async function comicReaderView(params, query) {
  const work = await repo.getById(params.id);
  if (!work || work.type !== 'comic') {
    return h('div', { class: 'container section' }, emptyState('漫画不存在', '可能已被移除。', h('a', { class: 'btn', href: '#/works/comic' }, '返回漫画')));
  }
  const startPage = parseInt(query.page || '1', 10) || 1;

  const hero = h('div', { class: 'comic-hero' }, [
    h('div', { class: 'comic-hero__meta' }, [
      h('div', { class: 'eyebrow' }, '漫画 · 连续阅读'),
      h('h1', { class: 'comic-hero__title' }, work.title),
      h('p', { class: 'comic-hero__intro' }, work.intro),
      h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' } }, [
        catTag('comic'),
        h('span', { class: 'tag' }, `${work.year} · ${work.stage || ''}`),
        h('span', { class: 'tag tag--accent' }, `共 ${work.pages.length} 页`),
      ]),
    ]),
    h('div', { class: 'comic-hero__media' }, imgEl(work.cover, null, work.title)),
  ]);

  return h('div', { class: 'container section' }, [
    h('div', { style: { paddingBottom: '16px' } }, h('a', { class: 'btn btn--ghost btn--sm', href: '#/works/comic' }, '← 返回漫画列表')),
    hero,
    h('div', { class: 'comic-divider' }, '开始阅读'),
    renderComicReader(work, { startPage }),
  ]);
}
