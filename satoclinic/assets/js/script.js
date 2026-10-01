(function () {
  var body = document.body;
  var desktopNav = document.querySelector('.global-nav');
  var drawer = document.querySelector('.mobile-drawer');
  var drawerNav = document.querySelector('.drawer-nav');
  var overlay = document.querySelector('.drawer-overlay');
  var toggle = document.querySelector('.menu-toggle');
  var close = document.querySelector('.drawer-close');
  // The mobile drawer must remain usable even if the desktop nav is not
  // available while the page is being inspected in responsive mode.
  if (!body || !drawer || !drawerNav || !overlay || !toggle || !close) return;

  var greetingToggle = document.querySelector('.greeting-copy-toggle');
  var greetingMore = document.querySelector('#director-message-more');
  if (greetingToggle && greetingMore) {
    greetingToggle.addEventListener('click', function () {
      var expanded = greetingToggle.getAttribute('aria-expanded') === 'true';
      greetingToggle.setAttribute('aria-expanded', String(!expanded));
      greetingMore.classList.toggle('is-expanded', !expanded);
      greetingToggle.innerHTML = (!expanded ? '閉じる ' : '全文を表示 ') + '<span aria-hidden="true">' + (!expanded ? '▲' : '▼') + '</span>';
    });
  }

  var revealTargets = document.querySelectorAll(
    '.section-title, .news-card, .greeting-photo-card, .greeting-copy-card, .medical-card, .about-grid > *, .staff-card, .department-html-card, .access-grid > *, .faq-group'
  );
  if ('IntersectionObserver' in window && revealTargets.length) {
    body.classList.add('reveal-ready');
    revealTargets.forEach(function (element, index) {
      element.classList.add('reveal');
      if (element.matches('.medical-card, .staff-card, .department-html-card')) {
        element.style.setProperty('--reveal-delay', Math.min(index % 5, 4) * 80 + 'ms');
      }
    });
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (element) { revealObserver.observe(element); });
  }

  if (desktopNav) drawerNav.innerHTML = desktopNav.innerHTML;

  var header = document.querySelector('.site-header');
  var headerInner = document.querySelector('.header-inner');
  function updateHeaderMode() {
    if (!header || !headerInner) return;
    header.classList.remove('compact-header');
    var needsCompact = headerInner.scrollWidth > headerInner.clientWidth + 1;
    header.classList.toggle('compact-header', needsCompact);
    body.classList.add('nav-ready');
  }
  if (window.ResizeObserver && headerInner) {
    var headerObserver = new ResizeObserver(updateHeaderMode);
    headerObserver.observe(headerInner);
  }
  window.addEventListener('resize', updateHeaderMode);
  requestAnimationFrame(updateHeaderMode);

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
    });

    var shouldStackAll = staffNames.some(function (name) {
      return name.scrollWidth > name.clientWidth;
    });
    if (shouldStackAll) {
      staffNames.forEach(function (name) { name.classList.add('is-stacked'); });
    }
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

  var contactModal = document.querySelector('.contact-modal');
  var contactOverlay = document.querySelector('.contact-overlay');
  var contactForm = document.querySelector('.contact-form');
  var contactFormView = document.querySelector('.contact-form-view');
  var contactConfirmView = document.querySelector('.contact-confirm-view');
  var contactConfirmList = document.querySelector('.contact-confirm-list');
  var contactClose = document.querySelector('.contact-modal-close');
  var contactEdit = document.querySelector('.contact-edit');
  if (contactModal && contactOverlay && contactForm && contactFormView && contactConfirmView && contactConfirmList && contactClose && contactEdit) {
    function closeContact() {
      body.classList.remove('modal-open');
      contactModal.hidden = true;
      contactOverlay.hidden = true;
      contactFormView.hidden = false;
      contactConfirmView.hidden = true;
    }
    function openContact() {
      setMenu(false);
      body.classList.add('modal-open');
      contactOverlay.hidden = false;
      contactModal.hidden = false;
      contactFormView.hidden = false;
      contactConfirmView.hidden = true;
      var firstInput = contactForm.querySelector('input');
      if (firstInput) firstInput.focus();
    }
    document.addEventListener('click', function (event) {
      var contactLink = event.target.closest('a[href="#contact"]');
      if (contactLink) {
        event.preventDefault();
        openContact();
      }
    });
    contactClose.addEventListener('click', closeContact);
    contactOverlay.addEventListener('click', closeContact);
    contactModal.addEventListener('click', function (event) { event.stopPropagation(); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !contactModal.hidden) closeContact();
    });
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactConfirmList.innerHTML = '';
      Array.prototype.forEach.call(contactForm.querySelectorAll('input, textarea'), function (field) {
        var row = document.createElement('div');
        var label = contactForm.querySelector('label[for="' + field.id + '"]');
        var labelText = label ? label.textContent.replace('必須', '').trim() : field.name;
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        dt.textContent = labelText;
        dd.textContent = field.value;
        row.append(dt, dd);
        contactConfirmList.append(row);
      });
      contactFormView.hidden = true;
      contactConfirmView.hidden = false;
      contactModal.scrollTop = 0;
    });
    contactEdit.addEventListener('click', function () {
      contactConfirmView.hidden = true;
      contactFormView.hidden = false;
      contactModal.scrollTop = 0;
    });
  }
})();
