// ============================================================
// site.js — 站点框架：导航 + 页脚（邱钰真 正式版）
// ============================================================
import { h } from '../../core/dom.js';

export function renderNav() {
  const hash = location.hash.slice(1) || '/';
  const is = (p) => (p === '/' ? hash === '/' : hash.startsWith(p));
  const links = [
    { href: '#/works', label: '作品' },
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
        h('span', { class: 'brand__mark' }, 'QIU YUZHEN'),
        h('span', { class: 'brand__sub' }, '插画 · 漫画'),
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
      col('导航', [['#/', '首页'], ['#/works', '作品库'], ['#/about', '关于艺术家']]),
      col('作品', [['#/works/illustration', '插画'], ['#/works/comic', '漫画'], ['#/works/oil', '油画']]),
      col('联系', [['mailto:2219528116@qq.com', '2219528116@qq.com']]),
      h('div', { class: 'site-footer__note' }, [
        '© 2026 QIU YUZHEN · 邱钰真 — 插画 / 漫画 / 油画作品集',
      ]),
    ]));
}
