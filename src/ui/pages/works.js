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
      h('div', { class: 'comic-row__title' }, work.title),
      h('div', { class: 'comic-row__meta' }, [work.year ? String(work.year) : '', work.stage ? '· ' + work.stage : null].filter(Boolean).join(' ')),
      work.intro ? h('p', { class: 'comic-row__intro' }, work.intro) : null,
    ]),
    h('div', { class: 'comic-row__pages' }, `共 ${work.pages.length} 页 →`),
  ]);
}

export async function worksView(params, query) {
  const type = params.type || query.type || '';
  const list = await repo.list();
  const years = [...new Set(list.map((w) => w.year).filter((y) => y != null && y !== ''))].sort((a, b) => b - a);

  const page = h('div', { class: 'container section' });
  const head = h('div', { class: 'page-head' }, [
    h('h1', {}, type ? typeName(type) : '全部作品'),
    h('span', { class: 'count' }, ''),
  ]);
  const results = h('div', {});
  // 阶段从实际数据推导（可扩展：后台新增的阶段自动出现在筛选里）
  const stages = [...new Set(list.map((w) => w.stage).filter(Boolean))].sort();

  async function renderResults(q) {
    const criteria = { ...q, type: type || q.type, publicOnly: true };
    const data = await repo.filter(criteria);
    // 证书仅展示于「关于」，不进入公开作品库
    if (!criteria.type) {
      for (let i = data.length - 1; i >= 0; i--) if (data[i].type === 'certificate') data.splice(i, 1);
    }
    head.querySelector('.count').textContent = `共 ${data.length} 件`;
    results.innerHTML = '';
    if (!data.length) {
      results.appendChild(emptyState('没有匹配的作品', '试试调整筛选条件，或点击“重置”。'));
      return;
    }
    let grid;
    if (criteria.type === 'comic') grid = h('div', {}, data.map(comicRow));
    else if (criteria.type === 'certificate') grid = h('div', { class: 'cert-grid' }, data.map((w, i) => workCard(w, i)));
    else grid = h('div', { class: 'mag-grid' }, data.map((w, i) => workCard(w, i)));
    results.appendChild(grid);
  }

  const filter = renderFilterBar({ ...query, type }, years, stages, (newQ) => {
    renderResults(newQ);
    const path = type ? `#/works/${type}` : '#/works';
    history.replaceState(null, '', path + buildQuery(newQ));
  });

  await renderResults({ ...query, type });
  page.append(head, filter, results);
  return page;
}
