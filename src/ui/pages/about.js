// ============================================================
// about.js — 个人介绍 / 简历式页面（Demo 占位，待真实简历替换）
// ============================================================
import { h } from '../../core/dom.js';
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

function section(title, body) { return h('div', { class: 'resume__section' }, [h('h3', {}, title), body]); }
function item(yr, head, p) {
  return h('div', { class: 'resume__item' }, [
    h('span', { class: 'yr' }, yr),
    h('div', {}, [h('h4', {}, head), p ? h('p', {}, p) : null]),
  ]);
}

export async function aboutView() {
  const avatar = { demo: true, seed: 'avatar', ratio: '1/1', label: '艺术家照片' };
  return h('div', { class: 'container' }, [
    h('div', { style: { padding: '24px 0 8px' } }, h('div', { class: 'eyebrow' }, '个人介绍')),
    h('div', { class: 'resume' }, [
      h('div', { class: 'resume__profile' }, [
        h('div', { class: 'resume__avatar' }, imgEl(avatar, null, '艺术家照片')),
        h('div', { class: 'resume__name' }, '林砚秋'),
        h('div', { class: 'resume__role' }, '视觉创作者 · 插画 / 漫画 / 油画'),
        h('p', { class: 'resume__bio' }, 'Demo 简介：专注以安静、克制的笔触记录日常生活与光影。此处为占位文本，正式简历到达后整体替换。'),
        h('div', { style: { marginTop: '16px' } }, h('span', { class: 'demo-flag' }, 'DEMO')),
      ]),
      h('div', {}, [
        section('教育经历', h('div', {}, EDU.map((e) => item(e.yr, e.h, e.p)))),
        section('技能', h('div', { class: 'skill-list' }, SKILLS.map((s) => h('span', { class: 'tag tag--accent' }, s)))),
        section('创作方向', h('ul', { class: 'direction-list' }, DIR.map((d) => h('li', {}, d)))),
        section('获奖与证书', h('div', {}, [
          ...AWARDS.map((a) => h('div', { class: 'resume__item' }, [h('span', { class: 'yr' }, a.y), h('div', {}, h('h4', {}, a.t))])),
          h('a', { class: 'award-link', style: { marginTop: '12px', display: 'inline-flex' }, href: '#/works/certificate' }, '查看证书存档 →'),
        ])),
      ]),
    ]),
  ]);
}
