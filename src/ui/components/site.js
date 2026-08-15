// ============================================================
// site.js — 站点框架：导航 + 页脚
// ============================================================
import { h } from '../../core/dom.js';

export function renderNav() {
  const hash = location.hash.slice(1) || '/';
  const is = (p) => (p === '/' ? hash === '/' : hash.startsWith(p));
  const links = [
    { href: '#/', label: '首页' },
    { href: '#/works', label: '全部作品' },
    { href: '#/works/illustration', label: '插画' },
    { href: '#/works/comic', label: '漫画' },
    { href: '#/works/oil', label: '油画' },
    { href: '#/works/certificate', label: '证书' },
    { href: '#/about', label: '关于' },
  ];
  const navLinks = h('nav', { class: 'nav-links', id: 'navLinks' },
    links.map((l) => h('a', {
      href: l.href, class: is(l.href.slice(1)) ? 'is-active' : '',
      on: { click: () => navLinks.classList.remove('is-open') },
    }, l.label)));
  const toggle = h('button', {
    class: 'nav-toggle', 'aria-label': '菜单',
    on: { click: () => navLinks.classList.toggle('is-open') },
  }, '☰');
  return h('header', { class: 'site-nav' },
    h('div', { class: 'container site-nav__inner' }, [
      h('a', { class: 'brand', href: '#/' }, [
        h('span', { class: 'brand__mark' }, '砚秋'),
        h('span', { class: 'brand__sub' }, 'Artfolio'),
      ]),
      navLinks, toggle,
    ]));
}

export function renderFooter() {
  const col = (title, items) => h('div', { class: 'site-footer__col' }, [
    h('h4', {}, title),
    ...items.map(([href, label]) => h('a', { href }, label)),
  ]);
  return h('footer', { class: 'site-footer' },
    h('div', { class: 'container site-footer__inner' }, [
      col('导航', [['#/', '首页'], ['#/works', '全部作品'], ['#/about', '关于艺术家']]),
      col('作品', [['#/works/illustration', '插画'], ['#/works/comic', '漫画'], ['#/works/oil', '油画'], ['#/works/certificate', '证书']]),
      col('联系', [['mailto:demo@example.com', 'demo@example.com'], ['#/', 'Instagram'], ['#/', '微博']]),
      h('div', { class: 'site-footer__note' }, [
        h('span', { class: 'demo-flag' }, 'DEMO'),
        '本站为演示版本，所有作品、文字与图片均为占位示意，正式上线前整体替换。',
      ]),
    ]));
}
