// ============================================================
// home.js — 首页（编辑 / 画册式）
//  第一屏：大尺寸代表作品为主视觉，姓名/身份/一句介绍克制组合
//  向下：精选作品（杂志式不规则网格）→ 作品分类（极简索引）→ 关于预告
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { workCard } from '../components/workCard.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { WORK_TYPES, typeName } from '../../data/types.js';

export async function homeView() {
  const [all, featured] = await Promise.all([
    repo.list(),
    repo.filter({ featured: true, publicOnly: true }),
  ]);
  const heroArt = featured.find((w) => w.type === 'illustration') || featured[0] || all[0];

  const counts = {};
  all.forEach((w) => (counts[w.type] = (counts[w.type] || 0) + 1));

  const catIndex = WORK_TYPES.map((t) =>
    h('a', { href: `#/works/${t.id}` }, [
      h('div', { class: 'cat-index__name' }, t.name),
      h('div', { class: 'cat-index__count' }, `${counts[t.id] || 0} 件`),
      h('div', { class: 'cat-index__bar', style: { '--cat': t.color } }),
    ]));

  // —— 第一屏：大尺寸代表作品为主视觉；文字克制组合 ——
  const hero = h('section', { class: 'container hero' }, [
    h('div', { class: 'hero__intro' }, [
      h('div', { class: 'eyebrow hero__eyebrow' }, '视觉创作者 · PORTFOLIO'),
      h('h1', { class: 'hero__name' }, '林砚秋'),
      h('div', { class: 'hero__role' }, '插画 · 漫画 · 油画'),
      h('p', { class: 'hero__lead' }, '以安静、克制的笔触，记录光与日常。'),
      h('div', { class: 'hero__links' }, [
        h('a', { class: 'link', href: '#/works' }, ['浏览作品', h('span', { class: 'arrow' }, '→')]),
      ]),
    ]),
    h('div', { class: 'hero__art' }, [
      h('div', { class: 'hero__frame' }, imgEl(heroArt.cover, null, heroArt.title)),
      h('div', { class: 'hero__caption' }, h('span', { class: 'demo-flag' }, 'DEMO')),
      h('div', { class: 'hero__cap' }, `${heroArt.title} · ${heroArt.year} · ${typeName(heroArt.type)}`),
    ]),
  ]);

  // —— 精选作品（杂志式不规则网格） ——
  const featuredSec = h('section', { class: 'container home-section' }, [
    h('div', { class: 'home-section__head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'SELECTED'), h('h2', {}, '精选作品')]),
      h('a', { href: '#/works?featured=1' }, '查看全部精选 →'),
    ]),
    featured.length ? h('div', { class: 'mag-grid' }, featured.slice(0, 6).map((w, i) => workCard(w, i)))
      : emptyState('暂无精选', '可在后台将作品标记为“精选”。'),
  ]);

  // —— 作品分类（极简文字索引） ——
  const catSec = h('section', { class: 'container home-section' }, [
    h('div', { class: 'home-section__head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'INDEX'), h('h2', {}, '作品分类')]),
      h('a', { href: '#/works' }, '进入作品库 →'),
    ]),
    h('div', { class: 'cat-index' }, catIndex),
  ]);

  // —— 关于预告 ——
  const aboutSec = h('section', { class: 'container home-section' }, [
    h('div', { class: 'about-teaser' }, [
      h('div', { class: 'about-teaser__media' }, imgEl({ demo: true, seed: 'artist-portrait', ratio: '4/5', label: '艺术家照片' }, null, '艺术家照片')),
      h('div', {}, [
        h('div', { class: 'eyebrow' }, 'ABOUT'),
        h('h2', {}, '林砚秋'),
        h('p', { class: 'lead' }, '视觉创作者，专注插画与漫画。本页为 Demo 简历内容，正式上线前替换。'),
        h('div', { style: { marginTop: '24px' } }, h('a', { class: 'link', href: '#/about' }, ['阅读完整简历', h('span', { class: 'arrow' }, '→')])),
      ]),
    ]),
  ]);

  return h('div', {}, [hero, featuredSec, catSec, aboutSec]);
}
