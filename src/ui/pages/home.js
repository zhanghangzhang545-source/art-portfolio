// ============================================================
// home.js — 首页（桌面/手机分别设计：不对称 hero + 画廊网格）
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { workCard } from '../components/workCard.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { WORK_TYPES } from '../../data/types.js';

export async function homeView() {
  const [all, featured] = await Promise.all([
    repo.list(),
    repo.filter({ featured: true, publicOnly: true }),
  ]);
  const heroArt = featured.find((w) => w.type === 'illustration') || featured[0] || all[0];

  const counts = {};
  all.forEach((w) => (counts[w.type] = (counts[w.type] || 0) + 1));

  const catTiles = WORK_TYPES.map((t) =>
    h('a', { class: 'cat-tile', href: `#/works/${t.id}` }, [
      h('div', { class: 'cat-tile__name' }, t.name),
      h('div', { class: 'cat-tile__count' }, `${counts[t.id] || 0} 件作品`),
      h('div', { class: 'cat-tile__bar', style: { background: t.color } }),
    ]));

  const hero = h('section', { class: 'container hero' }, [
    h('div', {}, [
      h('div', { class: 'eyebrow hero__eyebrow' }, '插画师 · 视觉创作者'),
      h('h1', { class: 'hero__title' }, ['以安静的笔触，', h('br', {}), '记录', h('em', {}, '光与日常'), '。']),
      h('p', { class: 'lead hero__lead' }, '这里是插画、漫画、油画与艺术履历的集合。作品是这里唯一的主角——请慢慢看。'),
      h('div', { class: 'hero__cta' }, [
        h('a', { class: 'btn btn--primary', href: '#/works' }, '浏览全部作品'),
        h('a', { class: 'btn', href: '#/about' }, '关于艺术家'),
      ]),
    ]),
    h('div', { class: 'hero__media' }, [
      h('div', { class: 'frame' }, imgEl(heroArt.cover, null, heroArt.title)),
      h('div', { class: 'hero__caption' }, h('span', { class: 'demo-flag' }, 'DEMO')),
    ]),
  ]);

  const featuredSec = h('section', { class: 'container section' }, [
    h('div', { class: 'home-section__head' }, [
      h('h2', {}, '精选作品'),
      h('a', { href: '#/works?featured=1' }, '查看全部精选 →'),
    ]),
    featured.length ? h('div', { class: 'work-grid' }, featured.slice(0, 6).map(workCard))
      : emptyState('暂无精选', '可在后台将作品标记为“精选”。'),
  ]);

  const catSec = h('section', { class: 'container section--tight' }, [
    h('div', { class: 'home-section__head' }, [
      h('h2', {}, '作品分类'),
      h('a', { href: '#/works' }, '进入作品库 →'),
    ]),
    h('div', { class: 'cat-strip' }, catTiles),
  ]);

  const aboutSec = h('section', { class: 'container section' }, [
    h('div', { class: 'about-teaser' }, [
      h('div', { class: 'about-teaser__media' }, imgEl(heroArt.cover, null, '艺术家')),
      h('div', {}, [
        h('div', { class: 'eyebrow' }, '关于'),
        h('h2', { class: 'display', style: { fontSize: '32px', margin: '8px 0 16px' } }, '林砚秋'),
        h('p', { class: 'lead' }, '视觉创作者，专注插画与漫画。本页为 Demo 简历内容，正式上线前替换。'),
        h('div', { style: { marginTop: '24px' } }, h('a', { class: 'btn', href: '#/about' }, '阅读完整简历')),
      ]),
    ]),
  ]);

  return h('div', {}, [hero, featuredSec, catSec, aboutSec]);
}
