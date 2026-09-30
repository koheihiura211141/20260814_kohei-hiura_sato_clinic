(function () {
  var body = document.body;
  var desktopNav = document.querySelector('.global-nav');
  var drawer = document.querySelector('.mobile-drawer');
  var drawerNav = document.querySelector('.drawer-nav');
  var overlay = document.querySelector('.drawer-overlay');
  var toggle = document.querySelector('.menu-toggle');
  var close = document.querySelector('.drawer-close');
  if (!body || !desktopNav || !drawer || !drawerNav || !overlay || !toggle || !close) return;

  drawerNav.innerHTML = desktopNav.innerHTML;
  var staffNames = Array.prototype.slice.call(document.querySelectorAll('.staff-heading h3'));
  staffNames.forEach(function (name) {
    var text = name.textContent.trim();
    var separatorIndex = text.indexOf('\uff1a');
    if (separatorIndex < 0) separatorIndex = text.indexOf(':');
    if (separatorIndex < 0) return;
    var roleSpan = document.createElement('span');
    roleSpan.className = 'staff-role';
    roleSpan.textContent = text.slice(0, separatorIndex);
    var personSpan = document.createElement('span');
    personSpan.className = 'staff-person-name';
    personSpan.textContent = text.slice(separatorIndex + 1).trim();
    name.classList.add('staff-name');
    name.textContent = '';
    name.append(roleSpan, personSpan);
  });

  function updateStaffNames() {
    staffNames.forEach(function (name) {
      name.classList.remove('is-stacked');
      name.style.width = '100%';
      name.style.maxWidth = '100%';
      name.style.minWidth = '0';
      if (name.scrollWidth > name.clientWidth) name.classList.add('is-stacked');
    });
  }
  if (window.ResizeObserver) {
    var observer = new ResizeObserver(updateStaffNames);
    staffNames.forEach(function (name) { observer.observe(name); });
  }
  window.addEventListener('resize', updateStaffNames);
  requestAnimationFrame(updateStaffNames);

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'menu close' : 'menu open');
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
