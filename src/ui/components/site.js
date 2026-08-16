// ============================================================
// site.js — 站点框架：导航 + 页脚（邱钰真 正式版）
// ============================================================
import { h } from '../../core/dom.js';

let effectsInited = false;
let revealObserver = null;

export function renderNav() {
  const hash = location.hash.slice(1) || '/';
  const is = (p) => (p === '/' ? hash === '/' : hash.startsWith(p));
  const isHome = hash === '/';
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
  const cls = ['site-nav', isHome ? 'site-nav--hero' : ''].filter(Boolean).join(' ');
  return h('header', { class: cls },
    h('div', { class: 'container site-nav__inner' }, [
      h('a', { class: 'brand', href: '#/' }, [
        h('span', { class: 'brand__mark' }, 'QIU YUZHEN'),
        h('span', { class: 'brand__sub' }, '插画 · 漫画'),
      ]),
      navLinks, toggle,
    ]));
}

function updateNavScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const isHome = (location.hash.slice(1) || '/') === '/';
  const threshold = window.innerHeight * 0.72;
  nav.classList.toggle('site-nav--scrolled', isHome && window.scrollY > threshold);
}

export function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  document.querySelectorAll('.reveal').forEach((el) => {
    if (!el.classList.contains('is-visible')) revealObserver.observe(el);
  });
}

export function initSiteEffects() {
  if (effectsInited) return;
  effectsInited = true;
  window.addEventListener('scroll', updateNavScroll, { passive: true });
  window.addEventListener('resize', updateNavScroll, { passive: true });
  updateNavScroll();
  observeReveals();
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
