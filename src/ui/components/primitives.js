// ============================================================
// primitives.js — 复用原子：分类标签 / 空状态 / 确认弹窗 / Toast
// ============================================================
import { h, raw } from '../../core/dom.js';
import { typeName, typeColor } from '../../data/types.js';

export function catTag(type) {
  return h('span', { class: 'tag tag--cat', style: { background: typeColor(type) } }, typeName(type));
}

export function emptyState(title, desc, actionNode) {
  return h('div', { class: 'empty' }, [
    h('h3', { class: 'display' }, title),
    desc ? h('p', {}, desc) : null,
    actionNode ? h('div', { style: { marginTop: '20px' } }, actionNode) : null,
  ]);
}

/** 确认弹窗（非裸表单，带遮罩与操作） */
export function confirmModal({ title, message, okText = '确定', danger = false, onOk }) {
  const overlay = h('div', { class: 'modal-overlay' });
  const close = () => overlay.remove();
  const ok = h('button', {
    class: danger ? 'btn btn--danger' : 'btn btn--primary',
    on: { click: () => { close(); onOk && onOk(); } },
  }, okText);
  const cancel = h('button', { class: 'btn', on: { click: close } }, '取消');
  overlay.appendChild(h('div', { class: 'modal' }, [
    h('div', { class: 'modal__title' }, title),
    h('p', { class: 'secondary' }, message),
    h('div', { class: 'modal__actions' }, [cancel, ok]),
  ]));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
  return overlay;
}

let toastWrap = null;
export function toast(msg) {
  if (!toastWrap || !document.body.contains(toastWrap)) {
    toastWrap = h('div', { class: 'toast-wrap' });
    document.body.appendChild(toastWrap);
  }
  const t = h('div', { class: 'toast' }, msg);
  toastWrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2400);
}
