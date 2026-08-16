// ============================================================
// about.js — 个人介绍 / 编辑式资料页（邱钰真 真实简历）
//  · 01 INTRO / 02 EDUCATION / 03 EXPERIENCE·PROJECTS / 04 SKILLS / 05 HONORS
//  · 头像预留位（不过度用证件照）；证书作为辅助内容，视觉权重低于作品，可点击放大
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { imgEl } from '../components/media.js';

const EDU = [
  { yr: '2017 – 2021', h: '中国传媒大学南广学院 · 漫画与插画 学士', p: '本科阶段主修漫画叙事与插画创作，毕业设计为 42 页漫画。' },
  { yr: '2024 – 2026', h: '日本代代木动画学院（代々木アニメーション学院）· 漫画（进修）', p: '专门学校，漫画专业进修；毕业制作（2026 年 2 月）共 27 页。' },
];

const SKILLS = ['CLIP STUDIO PAINT（CSP）', 'SAI', 'Photoshop', '日语 JLPT N2'];

const DIR = ['插画创作', '漫画 / 图像小说', '油画'];

// 03 项目与创作（均依据真实作品，不作虚构）
const PROJECTS = [
  { yr: '2026', h: '代代木动画学院 毕业制作', p: '27 页漫画毕业设计（日本 · 代代木动画学院）。' },
  { yr: '2024', h: 'CP30 同人志《舞机》', p: '13 页同人志创作（Fan Work，不拥有原作 IP）。' },
  { yr: '2021', h: '大学毕业设计', p: '42 页漫画（中国传媒大学南广学院）。' },
  { yr: '2020', h: '24 小时国际漫画马拉松', p: '8 页参赛漫画，获三等奖。' },
];

// 05 重点荣誉（职业相关，依据真实证书）
const HONORS = [
  { t: '2013 四川省中小学生优秀艺术人才大赛（资阳赛区）美术专业 初中组 一等奖', y: '2013' },
  { t: '2014 全国少年儿童绘画绘本创作大赛 中学绘本组 三等奖', y: '2014' },
  { t: '2018 学院作品永久收藏', y: '2018' },
  { t: '2020 第四届吉林动画学院 24 小时国际漫画马拉松 三等奖', y: '2020' },
];

const CONTACT = [
  { k: '邮箱', v: '2219528116@qq.com' },
];

function section(title, body) {
  return h('div', { class: 'about__section' }, [h('h3', {}, title), body]);
}
function item(yr, head, p) {
  return h('div', { class: 'cv-item' }, [
    h('div', { class: 'cv-item__yr' }, yr),
    h('div', { class: 'cv-item__body' }, [h('h4', {}, head), p ? h('p', {}, p) : null]),
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
  // 证书：取全部 certificate（public:false 者也包含，仅在 About 展示）
  const certs = (await repo.list()).filter((w) => w.type === 'certificate');

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
    h('section', { class: 'about' }, [
      h('div', { class: 'about__head' }, [
        h('div', { class: 'eyebrow' }, '个人介绍 · ABOUT'),
        h('h1', { class: 'about__name' }, '邱钰真'),
        h('div', { class: 'about__role' }, 'QIU YUZHEN · 插画 / 漫画 / 油画'),
        h('p', { class: 'about__lead' }, '插画与漫画创作者。本科毕业于中国传媒大学南广学院漫画与插画专业，后赴日本代代木动画学院进修漫画。作品涵盖插画、漫画与油画，关注旅途、自然与日常中的光。'),
      ]),
      h('div', { class: 'about__grid' }, [
        h('aside', { class: 'about__colophon' }, [
          h('div', { class: 'about__avatar about__avatar--reserved' }, '肖像 · Portrait'),
          h('p', { class: 'about__bio' }, '以插画与漫画为主要创作语言，关注城市日常、自然光景与微小叙事。'),
          h('div', { class: 'about__contact' }, CONTACT.map((c) =>
            h('div', { class: 'about__contact-row' }, [h('span', { class: 'k' }, c.k), h('span', {}, c.v)]))),
        ]),
        h('div', {}, [
          section('02 教育经历', h('div', {}, EDU.map((e) => item(e.yr, e.h, e.p)))),
          section('03 项目与创作', h('div', {}, PROJECTS.map((p) => item(p.yr, p.h, p.p)))),
          section('04 技能 / 软件能力', h('div', { class: 'skill-list' }, SKILLS.map((s) => h('span', { class: 'tag' }, s)))),
          section('04 创作方向', h('ul', { class: 'direction-list' }, DIR.map((d) => h('li', {}, d)))),
          section('05 荣誉', h('div', {}, [
            h('div', {}, HONORS.map((a) => item(a.y, a.t, ''))),
            h('p', { class: 'secondary', style: { margin: 'var(--s4) 0 var(--s5)' } }, '少年时期于省市级美术赛事中连续获得金奖（具体证书未随附，仅作经历说明，不作图片展示）。'),
            h('p', { class: 'secondary', style: { marginBottom: 'var(--s4)' } }, '以下为已附证书（点击可放大查看；证书为辅助材料，视觉权重低于作品）：'),
            certGrid,
          ])),
        ]),
      ]),
    ]),
  ]);
}
