// ============================================================
// about.js — 个人介绍 / 简历式页面（Demo 占位，待真实简历替换）
//  · 编辑式排版：靠字号 / 网格 / 留白 / 对齐建立层级，不用大量边框框
//  · 证书作为辅助内容置于此处，视觉权重低于艺术作品，可点击放大
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { imgEl } from '../components/media.js';

const EDU = [
  { yr: '2013 – 2017', h: '某美术学院 · 插画专业 学士', p: '主修叙事插画与版画，毕业创作获学院年度创作金奖。' },
  { yr: '2017 – 2019', h: '某艺术学院 · 视觉传达 硕士', p: '研究方向为漫画叙事与图像小说。' },
];
const SKILLS = ['插画', '漫画分镜', '油画', '角色设计', '版画', '数字绘画'];
const DIR = ['叙事性插画', '图像小说 / 漫画', '静物与风景油画', '编辑类配图'];
const AWARDS = [
  { t: '漫画新人奖 优胜', y: '2022' },
  { t: '国际绘本大赛 提名', y: '2024' },
  { t: '个人画展《在场》参展', y: '2023' },
];
const CONTACT = [
  { k: '邮箱', v: 'demo@example.com' },
  { k: '所在城市', v: '中国 · 上海' },
  { k: '社交', v: '@demo_artist' },
];

function section(title, body) {
  return h('div', { class: 'resume__section' }, [h('h3', {}, title), body]);
}
function item(yr, head, p) {
  return h('div', { class: 'resume__item' }, [
    h('span', { class: 'yr' }, yr),
    h('div', {}, [h('h4', {}, head), p ? h('p', {}, p) : null]),
  ]);
}

/** 轻量灯箱：点击证书放大查看 */
function openLightbox(src, alt) {
  const overlay = h('div', { class: 'modal-overlay', on: { click: (e) => { if (e.target === overlay) overlay.remove(); } } },
    h('div', { class: 'lightbox', onclick: (e) => e.stopPropagation() }, [
      imgEl(src, null, alt),
      h('button', { class: 'lightbox__close', on: { click: () => overlay.remove() } }, '×'),
    ]));
  document.body.appendChild(overlay);
}

export async function aboutView() {
  const avatar = { demo: true, seed: 'avatar', ratio: '1/1', label: '艺术家照片' };
  const certs = (await repo.list()).filter((w) => w.type === 'certificate' && w.public !== false);

  const certGrid = certs.length
    ? h('div', { class: 'cv-cert-grid' },
        certs.map((c) =>
          h('button', { class: 'cv-cert', type: 'button', on: { click: () => openLightbox(c.cover, c.title) } }, [
            h('div', { class: 'cv-cert__media' }, imgEl(c.cover, null, c.title)),
            h('div', { class: 'cv-cert__title' }, c.title),
            c.certDate ? h('div', { class: 'cv-cert__date' }, c.certDate) : null,
          ])))
    : h('p', { class: 'secondary' }, '暂无证书。');

  return h('div', { class: 'container' }, [
    h('div', { style: { padding: '24px 0 8px' } }, h('div', { class: 'eyebrow' }, '个人介绍 · ABOUT')),
    h('div', { class: 'resume' }, [
      h('div', { class: 'resume__profile' }, [
        h('div', { class: 'resume__avatar' }, imgEl(avatar, null, '艺术家照片')),
        h('div', { class: 'resume__name' }, '林砚秋'),
        h('div', { class: 'resume__role' }, '视觉创作者 · 插画 / 漫画 / 油画'),
        h('p', { class: 'resume__bio' }, 'Demo 简介：专注以安静、克制的笔触记录日常生活与光影。此处为占位文本，正式简历到达后整体替换。'),
        h('div', { style: { marginTop: '16px' } }, h('span', { class: 'demo-flag' }, 'DEMO')),
        h('div', { class: 'resume__contact' }, CONTACT.map((c) =>
          h('div', { class: 'resume__contact-row' }, [h('span', { class: 'yr' }, c.k), h('span', {}, c.v)]))),
      ]),
      h('div', {}, [
        section('教育经历', h('div', {}, EDU.map((e) => item(e.yr, e.h, e.p)))),
        section('创作方向', h('ul', { class: 'direction-list' }, DIR.map((d) => h('li', {}, d)))),
        section('技能 / 软件能力', h('div', { class: 'skill-list' }, SKILLS.map((s) => h('span', { class: 'tag' }, s)))),
        section('获奖与经历', h('div', {}, AWARDS.map((a) => item(a.y, a.t, '')))),
        section('证书', h('div', {}, [
          h('p', { class: 'secondary', style: { marginBottom: 'var(--s4)' } }, '点击可放大查看。证书为辅助材料，视觉权重低于作品。'),
          certGrid,
        ])),
      ]),
    ]),
  ]);
}
