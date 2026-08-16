// ============================================================
// home.js — 首页（编辑 / 画册式）
//  第一屏：左侧 35–40% 姓名极简文字 + 右侧 60–65% 完整代表作品（《旅途》，不裁切）
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
  // 主视觉固定用《旅途》（i09），完整呈现，不粗暴裁切
  const heroArt = all.find((w) => w.id === 'i09') || featured.find((w) => w.type === 'illustration') || featured[0] || all[0];

  const counts = {};
  all.forEach((w) => (counts[w.type] = (counts[w.type] || 0) + 1));

  const catIndex = WORK_TYPES.map((t) =>
    h('a', { href: `#/works/${t.id}` }, [
      h('div', { class: 'cat-index__name' }, t.name),
      h('div', { class: 'cat-index__count' }, `${counts[t.id] || 0} 件`),
      h('div', { class: 'cat-index__bar', style: { '--cat': t.color } }),
    ]));

  // —— 第一屏：姓名克制组合于左，完整作品于右 ——
  const hero = h('section', { class: 'container hero' }, [
    h('div', { class: 'hero__intro' }, [
      h('div', { class: 'eyebrow hero__eyebrow' }, '插画 · 漫画 · 油画 · PORTFOLIO'),
      h('h1', { class: 'hero__name' }, '邱钰真'),
      h('div', { class: 'hero__en' }, 'QIU YUZHEN'),
      h('div', { class: 'hero__role' }, 'Illustration & Comic'),
      h('p', { class: 'hero__lead' }, '以插画与漫画，记录旅途、自然与微小的日常。'),
      h('div', { class: 'hero__links' }, [
        h('a', { class: 'link', href: '#/works' }, ['浏览作品', h('span', { class: 'arrow' }, '→')]),
      ]),
    ]),
    h('div', { class: 'hero__art' }, [
      h('div', { class: 'hero__frame' }, imgEl(heroArt.cover, null, heroArt.title, { eager: true, w: heroArt.coverW, h: heroArt.coverH })),
      h('div', { class: 'hero__cap' }, `${heroArt.title} · ${heroArt.year ? heroArt.year + ' · ' : ''}${typeName(heroArt.type)}`),
    ]),
  ]);

  // —— 精选作品（杂志式不规则网格） ——
  const featuredSec = h('section', { class: 'container home-section' }, [
    h('div', { class: 'home-section__head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'SELECTED'), h('h2', {}, '精选作品')]),
      h('a', { href: '#/works?featured=1' }, '查看全部精选 →'),
    ]),
    featured.length ? h('div', { class: 'mag-grid' }, featured.slice(0, 8).map((w, i) => workCard(w, i)))
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

  // —— 关于预告（客户未提供正式肖像，故以纯文字版式呈现，不留占位） ——
  const aboutSec = h('section', { class: 'container home-section' }, [
    h('div', { class: 'about-teaser about-teaser--text' }, [
      h('div', {}, [
        h('div', { class: 'eyebrow' }, 'ABOUT'),
        h('h2', {}, '邱钰真'),
        h('p', { class: 'lead' }, '插画与漫画创作者。本科毕业于中国传媒大学南广学院漫画与插画专业，后于日本代代木动画学院进修漫画。'),
        h('div', { style: { marginTop: '24px' } }, h('a', { class: 'link', href: '#/about' }, ['阅读完整简历', h('span', { class: 'arrow' }, '→')])),
      ]),
    ]),
  ]);

  return h('div', {}, [hero, featuredSec, catSec, aboutSec]);
}
