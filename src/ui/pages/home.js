// ============================================================
// home.js — 首页 V2（编辑 / 画册式）
//  第一屏：深色全幅主视觉，作品占 70% 面积，强字体层级
//  向下：精选作品（编辑式不规则网格）→ 漫画专区（深色切换）
//        → 作品分类索引 → 关于预告
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { workCard } from '../components/workCard.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { WORK_TYPES, typeName } from '../../data/types.js';

const NEUTRAL_BIO = '以插画与漫画为主要创作方向，关注角色、叙事与氛围表达。';

// 精选编辑网格布局（按参考图的视觉节奏）
const FEATURED_LAYOUT = [
  { id: 'i01', sizeClass: 'feat--a' },            // 《接雨草树林2.0ver》 左侧大竖
  { id: 'comic-yoyogi2026', sizeClass: 'feat--b' }, // 2026 代代木毕业设计 右上宽
  { id: 'i13', sizeClass: 'feat--c' },            // 《梦里的风景》 右上窄
  { id: 'comic-grad2021', sizeClass: 'feat--d' }, // 2021 大学毕业设计 左下
  { id: 'i14', sizeClass: 'feat--e' },            // 《献上战舞》 中下
  { id: 'oil1', sizeClass: 'feat--f' },           // 《拐弯处的光》 右下
];

function featuredById(featured, id) {
  return featured.find((w) => w.id === id) || featured[0];
}

export async function homeView() {
  const [all, featured] = await Promise.all([
    repo.list(),
    repo.filter({ featured: true, publicOnly: true }),
  ]);

  // 主视觉固定用《旅途》（i09）
  const heroArt = all.find((w) => w.id === 'i09') || featured.find((w) => w.type === 'illustration') || featured[0] || all[0];

  const counts = {};
  all.forEach((w) => (counts[w.type] = (counts[w.type] || 0) + 1));

  // —— 第一屏：深色全幅主视觉 ——
  const hero = h('section', { class: 'hero' }, [
    h('div', { class: 'hero__bg' }, imgEl(heroArt.cover, null, heroArt.title, { eager: true, w: heroArt.coverW, h: heroArt.coverH })),
    h('div', { class: 'hero__shade' }),
    h('div', { class: 'container--wide hero__inner' }, [
      h('div', { class: 'hero__side' }, [
        h('div', { class: 'hero__kicker' }, [
          h('span', { class: 'idx idx--dark' }, '01 / 05'),
          h('span', { class: 'hero__eyebrow' }, 'Illustration & Comic'),
        ]),
        h('h1', { class: 'hero__name' }, [
          h('span', {}, 'QIU'),
          h('span', {}, 'YUZHEN'),
        ]),
        h('div', { class: 'hero__cn' }, '邱钰真'),
        h('div', { class: 'hero__role' }, 'Illustration & Comic Artist'),
        h('p', { class: 'hero__lead' }, NEUTRAL_BIO),
        h('div', { class: 'hero__footer' }, [
          h('button', {
            class: 'hero__cta',
            type: 'button',
            on: { click: () => document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth' }) },
          }, ['Selected Works', h('span', {}, '→')]),
          h('div', { class: 'scroll-hint' }, 'Scroll'),
        ]),
      ]),
    ]),
  ]);

  // —— 精选作品（编辑式不规则网格） ——
  const featuredSec = h('section', { class: 'container section', id: 'selected' }, [
    h('div', { class: 'home-section__head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'SELECTED'), h('h2', { class: 'serif' }, '精选作品')]),
      h('a', { class: 'link', href: '#/works?featured=1' }, ['查看全部精选', h('span', { class: 'arrow' }, '→')]),
    ]),
    featured.length
      ? h('div', { class: 'editorial-grid' },
          FEATURED_LAYOUT.map((spec, i) => workCard(featuredById(featured, spec.id), i, { sizeClass: spec.sizeClass })))
      : emptyState('暂无精选', '可在后台将作品标记为“精选”。'),
  ]);

  // —— 漫画专区（深色切换） ——
  const comics = all.filter((w) => w.type === 'comic').sort((a, b) => (a.year || 0) - (b.year || 0));
  const comicItems = comics.map((c, i) => {
    const num = String(i + 1).padStart(2, '0');
    const label = c.id === 'comic-cp30' ? '同人志创作 / Fan Work' : `${c.pages.length}P`;
    return h('a', { class: 'comic-issue reveal', href: `#/comic/${c.id}` }, [
      h('div', { class: 'comic-issue__num' }, num),
      h('div', { class: 'comic-issue__cover' }, imgEl(c.cover, null, c.title, { w: c.coverW, h: c.coverH })),
      h('div', { class: 'comic-issue__body' }, [
        h('div', { class: 'comic-issue__title' }, c.title),
        h('div', { class: 'comic-issue__meta' }, [
          c.year ? h('span', {}, String(c.year)) : null,
          h('span', {}, typeName(c.type)),
          h('span', {}, label),
        ]),
      ]),
    ]);
  });
  const comicsSec = h('section', { class: 'section--dark section--tight' }, [
    h('div', { class: 'container home-section__head home-section__head--light' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'COMICS'), h('h2', { class: 'serif' }, '漫画作品')]),
      h('a', { class: 'link link--light', href: '#/works/comic' }, ['进入漫画作品集', h('span', { class: 'arrow' }, '→')]),
    ]),
    comics.length
      ? h('div', { class: 'container comic-issue__grid' }, comicItems)
      : h('div', { class: 'container' }, emptyState('暂无漫画', '')),
  ]);

  // —— 作品分类（极简文字索引） ——
  const catIndex = WORK_TYPES.map((t) =>
    h('a', { href: `#/works/${t.id}` }, [
      h('div', { class: 'cat-index__name serif' }, t.name),
      h('div', { class: 'cat-index__count' }, `${counts[t.id] || 0} 件`),
      h('div', { class: 'cat-index__bar', style: { '--cat': t.color } }),
    ]));
  const catSec = h('section', { class: 'container section section--tight' }, [
    h('div', { class: 'home-section__head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'INDEX'), h('h2', { class: 'serif' }, '作品分类')]),
      h('a', { class: 'link', href: '#/works' }, ['进入作品库', h('span', { class: 'arrow' }, '→')]),
    ]),
    h('div', { class: 'cat-index' }, catIndex),
  ]);

  // —— 关于预告（纯文字 + 数据大数字） ——
  const eduCount = 2;
  const comicCount = comics.length;
  const certCount = all.filter((w) => w.type === 'certificate').length;
  const aboutSec = h('section', { class: 'container section section--tight' }, [
    h('div', { class: 'about-teaser about-teaser--text' }, [
      h('div', { class: 'about-teaser__left' }, [
        h('div', { class: 'eyebrow' }, 'ABOUT'),
        h('h2', { class: 'serif' }, '邱钰真'),
        h('p', { class: 'lead' }, '插画与漫画创作者。本科毕业于中国传媒大学南广学院漫画与插画专业，后于日本代代木动画学院进修漫画。'),
        h('div', { style: { marginTop: '28px' } }, h('a', { class: 'link', href: '#/about' }, ['阅读完整简历', h('span', { class: 'arrow' }, '→')])),
      ]),
      h('div', { class: 'about-teaser__stats' }, [
        h('div', {}, [h('div', { class: 'about-teaser__num serif' }, String(eduCount)), h('div', { class: 'about-teaser__label' }, '所院校学习经历')]),
        h('div', {}, [h('div', { class: 'about-teaser__num serif' }, String(comicCount)), h('div', { class: 'about-teaser__label' }, '部漫画作品')]),
        h('div', {}, [h('div', { class: 'about-teaser__num serif' }, String(certCount)), h('div', { class: 'about-teaser__label' }, '项荣誉证书')]),
      ]),
    ]),
  ]);

  return h('div', {}, [hero, featuredSec, comicsSec, catSec, aboutSec]);
}
