// ============================================================
// seed.js — Demo 演示数据（占位示意，上线前整体替换）
//   12 插画 · 4 漫画（各含多页）· 2 油画 · 8 证书
// 图片均以 Demo 描述符存储，由 UI 层渲染为带“DEMO 占位”标识的占位图。
// ============================================================

const d = (seed, ratio, label) => ({ demo: true, seed, ratio, label });

export function buildSeed() {
  const works = [];
  let n = 0;
  const push = (w) => { w.id = w.id || `w${(++n).toString().padStart(3, '0')}`; works.push(w); };

  // —— 12 插画 ——
  const illus = [
    { title: '《雾屿晨光》', year: 2019, stage: '职业早期', tags: ['风景', '水彩'], ratio: '4/5', featured: true,  intro: '清晨薄雾里若隐若现的礁岛，是这组海景练习的第一张。' },
    { title: '《拾穗的午后》', year: 2017, stage: '学校时期', tags: ['人物', '速写'], ratio: '3/4', featured: false, intro: '田间速写课上的作业，线条还带着生涩的痕迹。' },
    { title: '《第七页》',     year: 2021, stage: '成熟期',   tags: ['叙事', '黑白'], ratio: '1/1', featured: false, intro: '为一篇短篇小说所作的扉页插图，尝试纯黑白语言。' },
    { title: '《候鸟》',       year: 2020, stage: '职业早期', tags: ['自然', '水彩'], ratio: '4/5', featured: true,  intro: '关于迁徙与归处的意象，蓝绿色调里藏着一点暖。' },
    { title: '《旧书店》',     year: 2018, stage: '学校时期', tags: ['场景', '钢笔'], ratio: '3/4', featured: false, intro: '钢笔淡彩，记录巷尾那家快要关门的书店。' },
    { title: '《潮汐表》',     year: 2022, stage: '成熟期',   tags: ['概念', '蓝调'], ratio: '16/9', featured: false, intro: '为海洋主题展览创作的概念图，节奏来自潮汐线。' },
    { title: '《无题·红》',    year: 2023, stage: '近期创作', tags: ['抽象'],         ratio: '1/1', featured: false, intro: '实验性的色块练习，暂不公开，留作自我对照。', pub: false },
    { title: '《巷口》',       year: 2016, stage: '学校时期', tags: ['街景', '水彩'], ratio: '4/5', featured: false, intro: '第一张被老师贴到走廊的写生作业。' },
    { title: '《猫与午后》',   year: 2021, stage: '成熟期',   tags: ['动物', '治愈'], ratio: '3/4', featured: false, intro: '窗台上的橘猫，属于“日常小确幸”系列。' },
    { title: '《山外山》',     year: 2024, stage: '近期创作', tags: ['风景', '大幅'], ratio: '4/5', featured: true,  intro: '近期大幅创作，试图把层叠的山势画成呼吸的节奏。' },
    { title: '《镜中人》',     year: 2022, stage: '成熟期',   tags: ['人物', '肖像'], ratio: '1/1', featured: false, intro: '自画像练习，光线来自左侧的一盏台灯。' },
    { title: '《雪落无声》',   year: 2025, stage: '近期创作', tags: ['风景', '冬'],   ratio: '16/9', featured: false, intro: '今年初雪后的写生，几乎全靠冷灰与留白。' },
  ];
  illus.forEach((it, i) => push({
    type: 'illustration', title: it.title, intro: it.intro, year: it.year, stage: it.stage, tags: it.tags,
    date: `${it.year}-${String((i % 12) + 1).padStart(2, '0')}-15`,
    sort: i + 1, public: it.pub !== false, featured: !!it.featured,
    cover: d(`ill-${i}`, it.ratio, it.title),
    images: [it.ratio, '3/4', '1/1'].map((r, k) => d(`ill-${i}-${k}`, r, it.title)),
  }));

  // —— 4 漫画（一部漫画 = 一个作品，含多页） ——
  const comics = [
    { title: '《长夜行》',     year: 2020, stage: '职业早期', tags: ['奇幻', '长篇'], pages: 8,  featured: false, intro: '少年在永夜之城寻找黎明，第一部长篇连载。' },
    { title: '《街角面包店》', year: 2022, stage: '成熟期',   tags: ['日常', '治愈'], pages: 6,  featured: true,  intro: '一家小面包店与街坊们的温柔日常。' },
    { title: '《十三月的雨》', year: 2023, stage: '近期创作', tags: ['青春', '情感'], pages: 10, featured: true,  intro: '关于错过与重逢的青春物语，目前连载中。' },
    { title: '《机械之心》',   year: 2021, stage: '成熟期',   tags: ['科幻', '动作'], pages: 7,  featured: false, intro: '废土背景下的机甲冒险，暂作内部打磨。', pub: false },
  ];
  comics.forEach((c, i) => {
    const pages = [];
    for (let p = 0; p < c.pages; p++) {
      pages.push({ id: `c${i}-p${p}`, order: p + 1, image: d(`comic-${i}-${p}`, '3/4', `${c.title} · 第${p + 1}页`) });
    }
    push({
      type: 'comic', title: c.title, intro: c.intro, year: c.year, stage: c.stage, tags: c.tags,
      date: `${c.year}-0${i + 1}-10`, sort: i + 1, public: c.pub !== false, featured: !!c.featured,
      cover: d(`comic-${i}-cover`, '3/4', c.title), pages,
    });
  });

  // —— 2 油画 ——
  const oils = [
    { title: '《静物·陶与光》', year: 2019, stage: '职业早期', tags: ['静物', '光影'], ratio: '4/5', featured: false, intro: '布面油画，练习单一光源下的陶器体积。' },
    { title: '《黄昏的港口》',   year: 2023, stage: '近期创作', tags: ['风景', '油画'], ratio: '16/9', featured: true,  intro: '布面油画，记录渔船归港前那十分钟的金红。' },
  ];
  oils.forEach((o, i) => push({
    type: 'oil', title: o.title, intro: o.intro, year: o.year, stage: o.stage, tags: o.tags,
    date: `${o.year}-0${i + 3}-20`, sort: i + 1, public: true, featured: !!o.featured,
    cover: d(`oil-${i}`, o.ratio, o.title),
    images: [o.ratio, '4/5'].map((r, k) => d(`oil-${i}-${k}`, r, o.title)),
  }));

  // —— 8 证书 ——
  const certs = [
    { title: '学院年度创作金奖',       issuer: '某美术学院',     certDate: '2018-06-20', year: 2018, featured: false },
    { title: '全国插画双年展 入选',     issuer: '中国插画协会',   certDate: '2020-09-12', year: 2020, featured: false },
    { title: '商业插画师认证',         issuer: '某设计联盟',     certDate: '2021-03-05', year: 2021, featured: false },
    { title: '漫画新人奖 优胜',         issuer: '某漫画周刊',     certDate: '2022-11-18', year: 2022, featured: true },
    { title: '个人画展《在场》参展证明', issuer: '某美术馆',       certDate: '2023-05-09', year: 2023, featured: false },
    { title: '数字绘画高级证书',       issuer: '某艺术学院',     certDate: '2021-07-22', year: 2021, featured: false },
    { title: '国际绘本大赛 提名',       issuer: '某童书基金会',   certDate: '2024-02-14', year: 2024, featured: false },
    { title: '艺术驻留项目 完成证',     issuer: '某艺术中心',     certDate: '2025-04-30', year: 2025, featured: false },
  ];
  certs.forEach((c, i) => push({
    type: 'certificate', title: c.title, intro: `由 ${c.issuer} 颁发。`, year: c.year, stage: '',
    tags: ['证书'], date: c.certDate, sort: i + 1, public: true, featured: !!c.featured,
    cover: d(`cert-${i}`, '3/4', c.title), issuer: c.issuer, certDate: c.certDate,
  }));

  return works;
}
