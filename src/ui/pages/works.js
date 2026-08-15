// ============================================================
// works.js — 作品库（全部 + 分类 + 检索/筛选）
// 支持：类型 / 关键词 / 创作阶段 / 创作时间 / 排序
// 漫画以“一部漫画=一个作品”的行式呈现，其余走画廊/网格。
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { renderFilterBar } from '../components/filterBar.js';
import { workCard } from '../components/workCard.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { buildQuery } from '../../core/router.js';
import { typeName } from '../../data/types.js';

function comicRow(work) {
  return h('a', { class: 'comic-row', href: `#/comic/${work.id}` }, [
    h('div', { class: 'comic-row__cover' }, imgEl(work.cover, null, work.title)),
    h('div', {}, [
      h('div', { class: 'work-card__title', style: { fontSize: '18px' } }, work.title),
      h('div', { class: 'work-card__meta' }, [String(work.year), work.stage ? '· ' + work.stage : null]),
      h('p', { class: 'secondary', style: { marginTop: '6px', fontSize: '14px' } }, work.intro),
    ]),
    h('div', { class: 'comic-row__pages' }, `共 ${work.pages.length} 页 →`),
  ]);
}

export async function worksView(params, query) {
  const type = params.type || query.type || '';
  const list = await repo.list();
  const years = [...new Set(list.map((w) => w.year))].sort((a, b) => b - a);

  const page = h('div', { class: 'container section' });
  const head = h('div', { class: 'page-head' }, [
    h('h1', {}, type ? typeName(type) : '全部作品'),
    h('span', { class: 'count' }, ''),
  ]);
  const results = h('div', {});

  async function renderResults(q) {
    const criteria = { ...q, type: type || q.type, publicOnly: true };
    const data = await repo.filter(criteria);
    head.querySelector('.count').textContent = `共 ${data.length} 件`;
    results.innerHTML = '';
    if (!data.length) {
      results.appendChild(emptyState('没有匹配的作品', '试试调整筛选条件，或点击“重置”。'));
      return;
    }
    let grid;
    if (criteria.type === 'comic') grid = h('div', {}, data.map(comicRow));
    else if (criteria.type === 'certificate') grid = h('div', { class: 'cert-grid' }, data.map(workCard));
    else grid = h('div', { class: 'mag-grid' }, data.map(workCard));
    results.appendChild(grid);
  }

  const filter = renderFilterBar({ ...query, type }, years, (newQ) => {
    renderResults(newQ);
    const path = type ? `#/works/${type}` : '#/works';
    history.replaceState(null, '', path + buildQuery(newQ));
  });

  await renderResults({ ...query, type });
  page.append(head, filter, results);
  return page;
}
