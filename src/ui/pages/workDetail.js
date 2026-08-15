// ============================================================
// workDetail.js — 作品详情（插画 / 油画 / 证书）
// 漫画类型自动跳转到阅读器。
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { typeName } from '../../data/types.js';

function metaRow(k, v) { return h('div', {}, [h('span', {}, k), h('span', {}, v)]); }

export async function workDetailView(params) {
  const work = await repo.getById(params.id);
  if (!work) return h('div', { class: 'container section' }, emptyState('作品不存在', '可能已被移除或链接有误。', h('a', { class: 'btn', href: '#/works' }, '返回作品库')));
  if (work.type === 'comic') { location.hash = `#/comic/${work.id}`; return h('div', {}); }

  const galleryImgs = [work.cover, ...(work.images || [])];
  const gallery = h('div', { class: 'detail__gallery' },
    galleryImgs.map((v, i) => h('div', { class: 'detail__shot' }, imgEl(v, null, `${work.title} ${i + 1}`))));

  const meta = h('div', { class: 'detail__meta' }, [
    metaRow('类型', typeName(work.type)),
    metaRow('创作年份', String(work.year)),
    work.stage ? metaRow('创作阶段', work.stage) : null,
    metaRow('状态', work.public === false ? '未公开' : '已公开' + (work.featured ? ' · 精选' : '')),
    work.type === 'certificate' ? metaRow('颁发机构', work.issuer || '—') : null,
    work.type === 'certificate' ? metaRow('获得日期', work.certDate || '—') : null,
  ]);
  const tags = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' } },
    (work.tags || []).map((t) => h('span', { class: 'tag' }, t)));

  const aside = h('div', { class: 'detail__aside' }, [
    h('div', {}, [h('span', { class: 'demo-flag' }, 'DEMO'), h('span', { style: { marginLeft: '8px', color: 'var(--ink-3)', fontSize: '13px' } }, '占位示意')]),
    h('h1', { class: 'detail__title' }, work.title),
    meta, tags,
    h('p', { class: 'detail__intro', style: { marginTop: '16px' } }, work.intro),
  ]);

  return h('div', { class: 'container' }, [
    h('div', { style: { padding: '24px 0' } }, h('a', { class: 'btn btn--ghost btn--sm', href: '#/works' }, '← 返回作品库')),
    h('div', { class: 'detail' }, [gallery, aside]),
  ]);
}
