// ============================================================
// seed.js — 邱钰真（QIU YUZHEN）真实作品数据 · 客户12 正式版
// 图片路径来自 assets.gen.js（真实素材优化版，已排除敏感水印/副本页）
// 严禁虚构：标题 / 年份 / 阶段 / 页数 均依据客户提供的真实资料。
// 插画与油画逐件年份客户未提供 → 留空（year: null），不推测。
// 证书 public:false → 不进入公开作品库，仅在「关于」荣誉区展示。
// ============================================================

import { ASSET } from './assets.gen.js';

// 精选（首页 SELECTED 区块）：4 件插画 + 1 幅油画，编辑式呈现
const ILLU_FEATURED = new Set(['i09', 'i01', 'i12', 'i13']); // 旅途 / 接雨草树林2.0ver / 梦里的风景 / 献上战舞
const OIL_FEATURED = new Set(['oil1']);                       // 拐弯处的光

function wrap(t) {
  return t.startsWith('《') || t.startsWith('[') ? t : `《${t}》`;
}

export function buildSeed() {
  const works = [];
  let n = 0;
  const push = (w) => { w.id = w.id || `w${(++n).toString().padStart(3, '0')}`; works.push(w); };

  // —— 插画（18 件，真实素材；年份/阶段未逐件提供，留空不虚构） ——
  ASSET.illustrations.forEach((a) => {
    const featured = ILLU_FEATURED.has(a.id);
    push({
      type: 'illustration',
      id: a.id,
      title: wrap(a.title),
      intro: '',
      year: null,
      stage: '',
      tags: [],
      date: '',
      sort: featured ? 200 - [...ILLU_FEATURED].indexOf(a.id) * 2 : 60 + n,
      public: true,
      featured,
      cover: a.file,
      coverW: a.w,
      coverH: a.h,
      images: [a.file],
    });
  });

  // —— 油画（2 幅；年份客户要求不推测 → 留空） ——
  ASSET.oils.forEach((o, i) => {
    const featured = OIL_FEATURED.has(o.id);
    push({
      type: 'oil',
      id: o.id,
      title: wrap(o.title),
      intro: '',
      year: null,
      stage: '',
      tags: ['油画'],
      date: '',
      sort: featured ? 190 : 55 - i,
      public: true,
      featured,
      cover: o.file,
      coverW: o.w,
      coverH: o.h,
      images: [o.file],
    });
  });

  // —— 漫画（5 部，一部 = 一个作品；页数/年份/阶段均依据真实资料） ——
  const comics = [
    {
      key: 'course2020', id: 'comic-course2020', title: wrap('漫画课程作业'),
      year: 2020, stage: '大学时期',
      intro: '中国传媒大学南广学院 漫画与插画专业 课程作业（2020 年 4 月），含封面与封底共 20 页。',
      sort: 76,
    },
    {
      key: 'marathon2020', id: 'comic-marathon2020', title: wrap('24 小时漫画马拉松'),
      year: 2020, stage: '大学时期',
      intro: '第四届吉林动画学院 24 小时国际漫画马拉松 参赛作品（2020 年 12 月），共 8 页；获三等奖。',
      sort: 72,
    },
    {
      key: 'grad2021', id: 'comic-grad2021', title: wrap('毕业设计'),
      year: 2021, stage: '大学时期',
      intro: '中国传媒大学南广学院 毕业设计（2021 年 4 月），正文 1–42 页。',
      sort: 84,
    },
    {
      key: 'cp30', id: 'comic-cp30', title: wrap('舞机'),
      year: 2024, stage: '个人创作',
      intro: 'CP30 同人志创作（2024 年 10 月），正文 13 页。本作为同人志（Fan Work），不拥有原作 IP，仅作个人创作展示。',
      sort: 80,
    },
    {
      key: 'yoyogi2026', id: 'comic-yoyogi2026', title: wrap('毕业制作'),
      year: 2026, stage: '留学时期',
      intro: '日本代代木动画学院 漫画专业 毕业设计（2026 年 2 月），共 27 页。',
      sort: 88,
    },
  ];
  comics.forEach((c) => {
    const src = ASSET.comics[c.key];
    const pages = src.pages.map((p, i) => ({ id: `${c.key}-p${i + 1}`, order: i + 1, image: p.file }));
    push({
      type: 'comic',
      id: c.id,
      title: c.title,
      intro: c.intro,
      year: c.year,
      stage: c.stage,
      tags: ['漫画'],
      date: `${c.year}-01-01`,
      sort: c.sort,
      public: true,
      featured: false,
      cover: src.cover,
      coverW: src.coverW,
      coverH: src.coverH,
      pages,
    });
  });

  // —— 证书（7 张真实荣誉；仅用于「关于」荣誉展示，不进入公开作品库） ——
  ASSET.certs.forEach((c, i) => {
    push({
      type: 'certificate',
      id: `cert-${c.id}`,
      title: c.title,
      intro: '',
      year: null,
      stage: '',
      tags: ['证书'],
      date: '',
      sort: 10 + i,
      public: false, // 隐藏于公开 Works，仅在 About 展示
      featured: false,
      cover: c.file,
      coverW: c.w,
      coverH: c.h,
      issuer: '',
      certDate: '',
    });
  });

  return works;
}
