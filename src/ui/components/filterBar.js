// ============================================================
// filterBar.js — 作品检索与筛选栏
// 支持：作品类型 / 关键词 / 创作阶段 / 创作时间(年份) / 排序
// 任意变更回调 onChange(newQuery)，由列表页负责更新 URL 与重渲。
// ============================================================
import { h } from '../../core/dom.js';
import { WORK_TYPES, STAGES, SORT_OPTIONS } from '../../data/types.js';

export function renderFilterBar(query, years, onChange) {
  const state = {
    type: query.type || '',
    q: query.q || '',
    stage: query.stage || '',
    year: query.year || '',
    sort: query.sort || 'newest',
  };

  const emit = () => onChange({ ...state });

  // 类型标签
  const tabs = [{ id: '', name: '全部' }, ...WORK_TYPES];
  const tabEls = tabs.map((t) =>
    h('button', {
      class: state.type === t.id ? 'is-active' : '',
      on: { click: () => { state.type = t.id; syncTabs(); emit(); } },
    }, t.name));
  function syncTabs() { tabEls.forEach((el, i) => el.classList.toggle('is-active', state.type === tabs[i].id)); }

  // 搜索（防抖）
  let timer = null;
  const search = h('input', {
    type: 'search', placeholder: '搜索标题 / 关键词…', value: state.q,
    on: {
      input: (e) => { state.q = e.target.value; clearTimeout(timer); timer = setTimeout(emit, 220); },
    },
  });

  const stageSel = h('select', {
    on: { change: (e) => { state.stage = e.target.value; emit(); } },
  }, [h('option', { value: '' }, '全部阶段'), ...STAGES.map((s) => h('option', { value: s, selected: state.stage === s }, s))]);

  const yearSel = h('select', {
    on: { change: (e) => { state.year = e.target.value; emit(); } },
  }, [h('option', { value: '' }, '全部年份'), ...years.map((y) => h('option', { value: y, selected: String(state.year) === String(y) }, String(y)))]);

  const sortSel = h('select', {
    on: { change: (e) => { state.sort = e.target.value; emit(); } },
  }, SORT_OPTIONS.map((s) => h('option', { value: s.id, selected: state.sort === s.id }, s.name)));

  const reset = h('button', { class: 'btn btn--sm', on: { click: () => {
    Object.assign(state, { type: '', q: '', stage: '', year: '', sort: 'newest' });
    search.value = ''; stageSel.value = ''; yearSel.value = ''; sortSel.value = 'newest';
    syncTabs(); emit();
  } } }, '重置');

  return h('div', { class: 'filter-bar' }, [
    h('div', { class: 'filter-tabs' }, tabEls),
    h('div', { class: 'filter-field filter-search' }, [h('label', {}, '关键词'), search]),
    h('div', { class: 'filter-field' }, [h('label', {}, '创作阶段'), stageSel]),
    h('div', { class: 'filter-field' }, [h('label', {}, '创作时间'), yearSel]),
    h('div', { class: 'filter-field' }, [h('label', {}, '排序'), sortSel]),
    h('div', { class: 'filter-bar__actions' }, [reset]),
  ]);
}
