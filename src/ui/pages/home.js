// ============================================================
// home.js — 首页 V3（编辑 / 画册式视觉重构）
//  第一屏：深色，真实作品《旅途》为视觉底层，姓名/身份在图下缘（手机端优先作品）
//  精选：真正的杂志编排（大横图+两张小竖图 / 大竖图+右侧文字作品），每排构图不同
//  漫画专区：深色，2026 代代木毕业设计作主项目（大封面+真实内页），其余 4 部为次级目录
//  作品分类 / 关于预告：暖白收束
//  明暗节奏：深 Hero → 暖白作品 → 深漫画 → 暖白履历
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { workCard } from '../components/workCard.js';
import { imgEl } from '../components/media.js';
import { emptyState } from '../components/primitives.js';
import { WORK_TYPES, typeName } from '../../data/types.js';

const NEUTRAL_BIO = '以插画与漫画为主要创作方向，关注角色、叙事与氛围表达。';
const byId = (arr, id) => arr.find((w) => w.id === id) || null;

export async function homeView() {
  const [all, featured] = await Promise.all([
    repo.list(),
    repo.filter({ featured: true, publicOnly: true }),
  ]);

  // 主视觉固定用《旅途》（i09）—— 真实作品作为第一视觉焦点
  const heroArt = byId(all, 'i09') || featured.find((w) => w.type === 'illustration') || featured[0] || all[0];

  const counts = {};
  all.forEach((w) => (counts[w.type] = (counts[w.type] || 0) + 1));
  const comics = all.filter((w) => w.type === 'comic').sort((a, b) => (a.year || 0) - (b.year || 0));
  const yoyogi = byId(comics, 'comic-yoyogi2026');
  const otherComics = comics.filter((c) => c.id !== 'comic-yoyogi2026');

  // —— 第一屏：深色，真实作品为视觉底层，文字可控叠层于底部 ——
  const hero = h('section', { class: 'hero' }, [
    h('div', { class: 'hero__media' }, imgEl(heroArt.cover, 'hero__img', heroArt.title, { eager: true, w: heroArt.coverW, h: heroArt.coverH })),
    h('div', { class: 'hero__scrim' }),
    h('div', { class: 'container hero__inner' }, [
      h('div', { class: 'hero__copy' }, [
        h('div', { class: 'hero__kicker' }, [
          h('span', { class: 'idx idx--dark' }, '01 / 05'),
          h('span', {}, 'Illustration & Comic'),
        ]),
        h('h1', { class: 'hero__name' }, [h('span', {}, 'QIU'), h('span', {}, 'YUZHEN')]),
        h('div', { class: 'hero__cn' }, '邱钰真'),
        h('p', { class: 'hero__lead' }, NEUTRAL_BIO),
      ]),
      h('a', { class: 'hero__scroll', href: '#selected' }, ['Selected Works', h('span', {}, '↓')]),
    ]),
  ]);

  // —— 精选：杂志编排（两排不同构图） ——
  const f = (id) => byId(featured, id);
  const block1 = h('div', { class: 'feature__row feature__row--land' }, [
    f('i01') ? workCard(f('i01'), 0, { noSize: true }) : null,
    h('div', { class: 'feature__stack' }, [
      f('i14') ? workCard(f('i14'), 1, { noSize: true }) : null,
      f('oil1') ? workCard(f('oil1'), 2, { noSize: true }) : null,
    ]),
  ]);
  const block2 = h('div', { class: 'feature__row feature__row--port' }, [
    yoyogi ? workCard(yoyogi, 3, { noSize: true }) : null,
    h('div', { class: 'feature__aside' }, [
      h('div', { class: 'feature__note' }, [
        h('span', { class: 'eyebrow' }, '2026 · 毕业制作'),
        '日本代代木动画学院 漫画专业 毕业设计，共 27 页 —— 当前最新的代表作品。',
      ]),
      f('i13') ? workCard(f('i13'), 4, { noSize: true }) : null,
      f('comic-grad2021') ? workCard(f('comic-grad2021'), 5, { noSize: true }) : null,
    ]),
  ]);
  const featuredSec = h('section', { class: 'section container', id: 'selected' }, [
    h('div', { class: 'home-head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'SELECTED'), h('h2', { class: 'serif' }, '精选作品')]),
      h('a', { class: 'link', href: '#/works?featured=1' }, ['查看全部精选', h('span', { class: 'arrow' }, '→')]),
    ]),
    featured.length ? h('div', { class: 'feature' }, [block1, block2]) : emptyState('暂无精选', '可在后台将作品标记为“精选”。'),
  ]);

  // —— 漫画专区（深色；2026 作主项目，其余为次级目录） ——
  const comicIndexItems = otherComics.map((c, i) => {
    const num = String(i + 1).padStart(2, '0');
    const label = c.id === 'comic-cp30' ? '同人志创作 / Fan Work' : `${c.pages.length}P`;
    return h('a', { class: 'comic-index reveal', href: `#/comic/${c.id}` }, [
      h('span', { class: 'comic-index__num' }, num),
      h('div', {}, [
        h('div', { class: 'comic-index__cover' }, imgEl(c.cover, null, c.title, { w: c.coverW, h: c.coverH })),
        h('div', { class: 'comic-index__title' }, c.title),
        h('div', { class: 'comic-index__meta' }, [c.year ? String(c.year) : '', typeName(c.type), label].filter(Boolean).join(' · ')),
      ]),
    ]);
  });
  const comicsSec = h('section', { class: 'section--dark section--tight' }, [
    h('div', { class: 'container' }, [
      h('div', { class: 'comics__head home-head--light' }, [
        h('div', {}, [h('div', { class: 'eyebrow' }, 'COMICS'), h('h2', { class: 'serif' }, '漫画作品')]),
        h('a', { class: 'link link--light', href: '#/works/comic' }, ['进入漫画作品集', h('span', { class: 'arrow' }, '→')]),
      ]),
      // 主项目：2026 代代木毕业设计 —— 大封面 + 真实内页
      yoyogi
        ? h('div', { class: 'comics__feature' }, [
            h('div', { class: 'comics__cover' }, imgEl(yoyogi.cover, null, yoyogi.title, { w: yoyogi.coverW, h: yoyogi.coverH })),
            h('div', { class: 'comics__pages' },
              yoyogi.pages.slice(0, 4).map((p) => imgEl(p.image, null, `${yoyogi.title} 内页`, { w: p.w, h: p.h }))),
            h('div', { class: 'comics__feature-meta' }, [
              h('span', { class: 'comics__feature-title' }, yoyogi.title),
              h('span', { class: 'comics__feature-sub' }, [yoyogi.year ? `${yoyogi.year} · ` : '', `${yoyogi.pages.length}P`].filter(Boolean).join('')),
              h('a', { class: 'link link--light', href: `#/comic/${yoyogi.id}` }, ['开始阅读', h('span', { class: 'arrow' }, '→')]),
            ]),
          ])
        : null,
      // 其余 4 部：次级目录（编号 + 缩略封面 + 标题）
      comicIndexItems.length ? h('div', { class: 'comics__index' }, comicIndexItems) : null,
    ]),
  ]);

  // —— 作品分类（极简文字入口） ——
  const catIndex = WORK_TYPES.map((t) =>
    h('a', { class: 'catindex__item', href: `#/works/${t.id}` }, [
      h('div', { class: 'catindex__name serif' }, t.name),
      h('div', { class: 'catindex__count' }, `${counts[t.id] || 0} 件`),
      h('div', { class: 'catindex__bar', style: { '--cat': t.color } }),
    ]));
  const catSec = h('section', { class: 'section container section--tight' }, [
    h('div', { class: 'home-head' }, [
      h('div', {}, [h('div', { class: 'eyebrow' }, 'INDEX'), h('h2', { class: 'serif' }, '作品分类')]),
      h('a', { class: 'link', href: '#/works' }, ['进入作品库', h('span', { class: 'arrow' }, '→')]),
    ]),
    h('div', { class: 'catindex' }, catIndex),
  ]);

  // —— 关于预告（暖白，纯文字 + 数据大数字） ——
  const eduCount = 2;
  const comicCount = comics.length;
  const certCount = all.filter((w) => w.type === 'certificate').length;
  const aboutSec = h('section', { class: 'section container section--tight' }, [
    h('div', { class: 'intro-teaser' }, [
      h('div', {}, [
        h('div', { class: 'eyebrow' }, 'ABOUT'),
        h('h2', { class: 'serif' }, '邱钰真'),
        h('p', { class: 'lead' }, '插画与漫画创作者。本科毕业于中国传媒大学南广学院漫画与插画专业，后于日本代代木动画学院进修漫画。'),
        h('div', { style: { marginTop: '24px' } }, h('a', { class: 'link', href: '#/about' }, ['阅读完整简历', h('span', { class: 'arrow' }, '→')])),
      ]),
      h('div', { class: 'intro-teaser__stats' }, [
        h('div', {}, [h('div', { class: 'intro-teaser__num serif' }, String(eduCount)), h('div', { class: 'intro-teaser__label' }, '所院校学习经历')]),
        h('div', {}, [h('div', { class: 'intro-teaser__num serif' }, String(comicCount)), h('div', { class: 'intro-teaser__label' }, '部漫画作品')]),
        h('div', {}, [h('div', { class: 'intro-teaser__num serif' }, String(certCount)), h('div', { class: 'intro-teaser__label' }, '项荣誉证书')]),
      ]),
    ]),
  ]);

  return h('div', {}, [hero, featuredSec, comicsSec, catSec, aboutSec]);
}
