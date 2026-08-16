// ============================================================
// about.js — 个人介绍 / 编辑式履历页（邱钰真 真实简历 V3）
//  · 桌面：左编号栏（吸顶）+ 右内容（学校 / 经历 / 技能 / 荣誉）
//  · 手机：紧凑纵向时间线（编号并入各段标题）
//  · 无肖像占位；全部使用真实作品与真实简历数据
// ============================================================
import { h } from '../../core/dom.js';
import { repo } from '../../data/services.js';
import { imgEl } from '../components/media.js';

const NEUTRAL_BIO = '以插画与漫画为主要创作方向，关注角色、叙事与氛围表达。';

const EDU = [
  { yr: '2017.9 – 2021.7', h: '中国传媒大学南广学院 · 漫画与插画｜本科', p: '本科阶段主修漫画叙事与插画创作，毕业设计为 42 页漫画。' },
  { yr: '2024.4 – 2026.3', h: '日本代代木动画学院（代々木アニメーション学院）· 漫画（进修）｜专门学校', p: '漫画专业进修；毕业制作（2026 年 2 月）共 27 页。' },
];

const SKILLS = ['CLIP STUDIO PAINT（CSP）', 'SAI', 'Photoshop', '日语 JLPT N2'];
const DIRECTIONS = ['插画创作', '漫画 / 图像小说', '油画'];

// 03 项目与创作（均依据真实作品，不作虚构）
const PROJECTS = [
  { yr: '2026', h: '代代木动画学院 毕业制作', p: '27 页漫画毕业设计（日本 · 代代木动画学院）。' },
  { yr: '2024', h: 'CP30 同人志《舞机》', p: '13 页同人志创作（Fan Work，不拥有原作 IP）。' },
  { yr: '2021', h: '大学毕业设计', p: '42 页漫画（中国传媒大学南广学院）。' },
  { yr: '2020', h: '24 小时国际漫画马拉松', p: '8 页参赛漫画，获三等奖。' },
  { yr: '2020', h: '大学漫画课程作业', p: '正文 20 页，另含封面与封底。' },
];

// 05 重点荣誉（职业相关，依据真实证书）
const HONORS = [
  { t: '2013 四川省中小学生优秀艺术人才大赛（资阳赛区）美术专业 初中组 一等奖', y: '2013' },
  { t: '2014 全国少年儿童绘画绘本创作大赛 中学绘本组 三等奖', y: '2014' },
  { t: '2018 学院作品永久收藏', y: '2018' },
  { t: '2020 第四届吉林动画学院 24 小时国际漫画马拉松 三等奖', y: '2020' },
];

const CONTACT = [{ k: '邮箱', v: '2219528116@qq.com' }];

function section(id, num, title, body) {
  return h('section', { class: 'about__sec reveal', id }, [
    h('div', { class: 'about__sec-head' }, [h('span', { class: 'about__sec-num' }, num), h('span', { class: 'about__sec-title' }, title)]),
    body,
  ]);
}
function item(yr, head, p) {
  return h('div', { class: 'cv-item' }, [
    h('div', { class: 'cv-item__yr' }, yr),
    h('div', { class: 'cv-item__body' }, [h('h4', {}, head), p ? h('p', {}, p) : null]),
  ]);
}
function railLink(num, title, targetId) {
  return h('button', {
    class: 'about__rail-link', type: 'button',
    on: { click: () => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) },
  }, [h('span', {}, num), ' ', title]);
}

/** 轻量灯箱：点击证书放大查看 */
function openLightbox(src, alt) {
  const overlay = h('div', { class: 'modal-overlay', on: { click: (e) => { if (e.target === overlay) overlay.remove(); } } },
    h('div', { class: 'lightbox', onclick: (e) => e.stopPropagation() }, [
      imgEl(src, null, alt, { w: 800, h: 1100 }),
      h('button', { class: 'lightbox__close', on: { click: () => overlay.remove() } }, '×'),
    ]));
  document.body.appendChild(overlay);
}

export async function aboutView() {
  const all = await repo.list();
  const certs = all.filter((w) => w.type === 'certificate');
  const comics = all.filter((w) => w.type === 'comic');
  const illustrations = all.filter((w) => w.type === 'illustration');
  const oils = all.filter((w) => w.type === 'oil');

  const certGrid = certs.length
    ? h('div', { class: 'cv-cert-grid' },
        certs.map((c) =>
          h('button', { class: 'cv-cert', type: 'button', on: { click: () => openLightbox(c.cover, c.title) } }, [
            h('div', { class: 'cv-cert__media' }, imgEl(c.cover, null, c.title, { w: c.coverW, h: c.coverH })),
            h('div', { class: 'cv-cert__title' }, c.title),
            c.certDate ? h('div', { class: 'cv-cert__date' }, c.certDate) : null,
          ])))
    : h('p', { class: 'secondary' }, '暂无证书。');

  return h('div', { class: 'container' }, [
    h('section', { class: 'about' }, [
      h('div', { class: 'about__head reveal' }, [
        h('div', { class: 'eyebrow' }, '个人介绍 · ABOUT'),
        h('h1', { class: 'about__name' }, '邱钰真'),
        h('div', { class: 'about__role' }, 'QIU YUZHEN · 插画 / 漫画 / 油画'),
        h('p', { class: 'about__lead' }, `${NEUTRAL_BIO} 创作涵盖插画、漫画与油画。`),
      ]),
      h('div', { class: 'about__stats reveal' }, [
        h('div', {}, [h('div', { class: 'about__stat-num' }, String(EDU.length)), h('div', { class: 'about__stat-label' }, '所院校学习经历')]),
        h('div', {}, [h('div', { class: 'about__stat-num' }, String(comics.length)), h('div', { class: 'about__stat-label' }, '部漫画作品')]),
        h('div', {}, [h('div', { class: 'about__stat-num' }, String(illustrations.length + oils.length)), h('div', { class: 'about__stat-label' }, '件插画与油画')]),
        h('div', {}, [h('div', { class: 'about__stat-num' }, String(certs.length)), h('div', { class: 'about__stat-label' }, '项荣誉证书')]),
      ]),
      h('div', { class: 'about__body' }, [
        h('aside', { class: 'about__rail' }, [
          railLink('01', 'INTRO', 'sec-intro'),
          railLink('02', 'EDUCATION', 'sec-edu'),
          railLink('03', 'EXPERIENCE', 'sec-exp'),
          railLink('04', 'SKILLS', 'sec-skills'),
          railLink('05', 'HONORS', 'sec-honors'),
        ]),
        h('div', { class: 'about__content' }, [
          section('sec-intro', '01', 'INTRO', h('div', {}, [
            h('p', { class: 'serif-lead' }, '插画与漫画创作者'),
            h('p', { class: 'secondary', style: { marginTop: 'var(--s4)', lineHeight: '1.8' } }, '本科毕业于中国传媒大学南广学院漫画与插画专业，后于日本代代木动画学院进修漫画。创作涵盖插画、漫画与油画，持续探索角色、叙事与氛围表达。'),
            h('div', { class: 'about__contact', style: { marginTop: 'var(--s5)' } }, CONTACT.map((c) =>
              h('div', { class: 'about__contact-row' }, [h('span', { class: 'k' }, c.k), h('span', {}, c.v)]))),
          ])),
          section('sec-edu', '02', 'EDUCATION', h('div', {}, EDU.map((e) => item(e.yr, e.h, e.p)))),
          section('sec-exp', '03', 'EXPERIENCE · PROJECTS', h('div', {}, PROJECTS.map((p) => item(p.yr, p.h, p.p)))),
          section('sec-skills', '04', 'SKILLS', h('div', {}, [
            h('div', { class: 'skill-list', style: { marginBottom: 'var(--s5)' } }, SKILLS.map((s) => h('span', { class: 'tag' }, s))),
            h('ul', { class: 'direction-list' }, DIRECTIONS.map((d) => h('li', {}, d))),
          ])),
          section('sec-honors', '05', 'HONORS', h('div', {}, [
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
