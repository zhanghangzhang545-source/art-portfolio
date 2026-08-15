// ============================================================
// types.js — 领域模型定义与常量（数据访问层，纯描述，不依赖 UI）
// ============================================================

/**
 * @typedef {Object} Work
 * @property {string} id
 * @property {'illustration'|'comic'|'oil'|'certificate'} type
 * @property {string} title
 * @property {string} intro
 * @property {number} year            创作年份（用于“创作时间”筛选）
 * @property {string} date            'YYYY-MM-DD' 展示用
 * @property {string} stage           创作阶段，如 '学校时期'
 * @property {string[]} tags
 * @property {number} sort            自定义排序权重
 * @property {boolean} public         是否公开
 * @property {boolean} featured       是否精选
 * @property {string|DemoImage} cover 封面（dataURL / http(s) / Demo 描述符）
 * @property {string[]|DemoImage[]} [images]   插画/油画多图
 * @property {ComicPage[]} [pages]    漫画多页（一部漫画=一个作品）
 * @property {string} [issuer]        证书颁发机构
 * @property {string} [certDate]      证书获得日期
 */

/**
 * @typedef {Object} ComicPage
 * @property {string} id
 * @property {number} order
 * @property {string|DemoImage} image
 */

/** @typedef {{demo:true, seed:string, ratio:string, label:string}} DemoImage */

export const WORK_TYPES = [
  { id: 'illustration', name: '插画',   en: 'Illustration', color: 'var(--cat-illustration)' },
  { id: 'comic',        name: '漫画',   en: 'Comic',        color: 'var(--cat-comic)' },
  { id: 'oil',          name: '油画',   en: 'Oil Painting', color: 'var(--cat-oil)' },
  { id: 'certificate',  name: '证书',   en: 'Certificate',  color: 'var(--cat-certificate)' },
];

export const STAGES = ['学校时期', '职业早期', '成熟期', '近期创作'];

export const SORT_OPTIONS = [
  { id: 'newest',    name: '最新创作' },
  { id: 'oldest',    name: '最早创作' },
  { id: 'sort-asc',  name: '自定义升序' },
  { id: 'sort-desc', name: '自定义降序' },
];

export function typeName(id) {
  const t = WORK_TYPES.find((t) => t.id === id);
  return t ? t.name : id;
}

export function typeColor(id) {
  const t = WORK_TYPES.find((t) => t.id === id);
  return t ? t.color : 'var(--ink-3)';
}
