// ============================================================
// comicReaderPage.js — 漫画详情 / 阅读页
// 一部漫画=一个作品；按正确顺序连续浏览多页（手机端纵向连续）。
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { renderComicReader } from '../components/comicReader.js';
import { emptyState, catTag } from '../components/primitives.js';

export async function comicReaderView(params, query) {
  const work = await repo.getById(params.id);
  if (!work || work.type !== 'comic') {
    return h('div', { class: 'container section' }, emptyState('漫画不存在', '可能已被移除。', h('a', { class: 'btn', href: '#/works/comic' }, '返回漫画')));
  }
  const startPage = parseInt(query.page || '1', 10) || 1;
  return h('div', { class: 'container section' }, [
    h('div', { style: { paddingBottom: '16px' } }, h('a', { class: 'btn btn--ghost btn--sm', href: '#/works/comic' }, '← 返回漫画列表')),
    h('div', { style: { marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' } }, [
      catTag('comic'),
      h('span', { class: 'tag' }, `${work.year} · ${work.stage || ''}`),
      h('span', { class: 'tag tag--accent' }, `共 ${work.pages.length} 页`),
    ]),
    renderComicReader(work, { startPage }),
  ]);
}
