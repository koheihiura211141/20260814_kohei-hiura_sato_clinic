/*
 * 佐藤医院 Webサイト
 * 現在は JavaScript を使用していません。
 * 将来、必要なインタラクションを追加する場合のみ使用してください。
 */

(function () {
  const body = document.body;
  const desktopNav = document.querySelector('.global-nav');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerNav = document.querySelector('.drawer-nav');
  const overlay = document.querySelector('.drawer-overlay');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.drawer-close');

  if (!body || !desktopNav || !drawer || !drawerNav || !overlay || !toggle || !close) return;

  drawerNav.innerHTML = desktopNav.innerHTML;

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    drawer.setAttribute('aria-hidden', String(!open));
    overlay.hidden = false;
    if (!open) window.setTimeout(function () { overlay.hidden = true; }, 250);
    if (open) drawer.focus();
  }

  toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  close.addEventListener('click', function () { setMenu(false); });
  overlay.addEventListener('click', function () { setMenu(false); });
  drawerNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });
})();
