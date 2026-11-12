/* main.js: renders the unboxed two-column editorial portfolio, writing index, and project side drawer. */
(function () {
  'use strict';

  var C = window.SITE_CONTENT || (typeof SITE_CONTENT !== 'undefined' ? SITE_CONTENT : null);
  if (!C) {
    console.error('SITE_CONTENT not found. Ensure content.js loads before main.js.');
    return;
  }

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, val) {
    var el = $(id);
    if (el) el.textContent = val || '';
  }

  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function real(href) {
    return typeof href === 'string' && !/[\[\]<>]/.test(href) &&
      /^(https?:\/\/|mailto:|tel:|#|\/|\.{1,2}\/)/i.test(href.trim());
  }

  function link(href, label, cls) {
    var ok = real(href);
    var n = h(ok ? 'a' : 'span', cls || '', label);
    if (ok) {
      n.href = href.trim();
      if (/^https?:/i.test(n.href) && n.href.indexOf(location.origin) !== 0) {
        n.target = '_blank';
        n.rel = 'noopener noreferrer';
      }
    } else {
      n.classList.add('pending');
      n.title = 'Add a real link in content.js';
    }
    return n;
  }

  var sectionsRoot = $('sections');
  if (!sectionsRoot) return;
  sectionsRoot.innerHTML = '';

  /* --- Project Side Drawer --- */
  var drawer = $('project-drawer');
  var backdrop = $('drawer-backdrop');
  var closeBtn = $('drawer-close');
  var lastFocus = null;

  function openDrawer(p) {
    lastFocus = document.activeElement;
    setText('drawer-year', p.year || 'project');
    setText('drawer-title', p.title || '');
    setText('drawer-desc', p.longDescription || p.description || '');

    var mediaBox = $('drawer-media');
    if (mediaBox) {
      mediaBox.innerHTML = '';
      var src = p.media || p.image || p.img;
      if (src) {
        if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
          var vid = document.createElement('video');
          vid.src = src;
          vid.autoplay = true;
          vid.loop = true;
          vid.muted = true;
          vid.playsInline = true;
          vid.controls = true;
          mediaBox.appendChild(vid);
        } else {
          var img = document.createElement('img');
          img.src = src;
          img.alt = p.title || 'Project media';
          mediaBox.appendChild(img);
        }
        mediaBox.hidden = false;
      } else {
        mediaBox.hidden = true;
      }
    }

    var tagsBox = $('drawer-tags');
    if (tagsBox) {
      var list = p.skills || p.stack || [];
      tagsBox.textContent = list.length ? list.join(' · ') : '';
    }

    var linksBox = $('drawer-links');
    if (linksBox) {
      linksBox.innerHTML = '';
      if (p.repo) {
        linksBox.appendChild(link(p.repo, 'github ↗'));
      }
      if (p.href) {
        linksBox.appendChild(link(p.href, (p.linkLabel || 'live demo').toLowerCase() + ' ↗'));
      }
    }

    if (backdrop && drawer) {
      backdrop.hidden = false;
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-open');
      requestAnimationFrame(function () {
        backdrop.classList.add('open');
        drawer.classList.add('open');
      });
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeDrawer() {
    if (!backdrop || !drawer) return;
    backdrop.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    setTimeout(function () {
      backdrop.hidden = true;
    }, 220);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* Helper to create each section with a horizontal label and full-width content */
  function makeRow(id, label) {
    var sec = h('section', 'row');
    sec.id = id;
    var heading = h('h2', 'section-label', label);
    var right = h('div', 'col-right');
    sec.appendChild(heading);
    sec.appendChild(right);
    sectionsRoot.appendChild(sec);
    return right;
  }

  /* Meta & Hero */
  var M = C.meta || {};
  var H = C.hero || {};
  var nav = [];

  if (M.siteTitle) document.title = M.siteTitle;
  var md = document.querySelector('meta[name="description"]');
  if (md && M.description) md.setAttribute('content', M.description);

  var avatarSrc = M.avatar || M.profileImage || H.avatar;
  var av = $('hero-avatar');
  if (av && avatarSrc) {
    av.src = avatarSrc;
    av.alt = M.name || 'Portrait';
    av.hidden = false;
  }

  setText('hero-title', H.headline || H.typedLine || M.name || '');
  setText('hero-lede', H.headline && H.typedLine ? H.typedLine : '');
  setText('hero-summary', H.summary || '');

  /* About */
  if (C.about) {
    var A = C.about;
    var abRight = makeRow('about', 'About');
    var prose = h('div', 'prose');
    (A.paragraphs || []).forEach(function (p) {
      prose.appendChild(h('p', '', p));
    });
    abRight.appendChild(prose);

    if (A.facts && A.facts.length) {
      var ul = h('ul', 'facts');
      A.facts.forEach(function (f) {
        var li = h('li');
        var b = h('strong', '', f.label + '. ');
        li.appendChild(b);
        li.appendChild(document.createTextNode(f.value));
        ul.appendChild(li);
      });
      abRight.appendChild(ul);
    }
    nav.push(['about', 'about']);
  }

  /* Projects (Clicking title opens side drawer with media + GitHub link) */
  var P = C.projects;
  if (P && P.items && P.items.length) {
    var pRight = makeRow('projects', 'Projects');
    var pList = h('div', 'entry-list');

    P.items.forEach(function (p) {
      var item = h('article', 'entry');
      var btn = h('button', 'entry-title', p.title);
      btn.type = 'button';
      btn.addEventListener('click', function () {
        openDrawer(p);
      });
      item.appendChild(btn);

      if (p.description) {
        item.appendChild(h('p', 'entry-desc', p.description));
      }

      var metaBits = [p.year].concat(p.skills || p.stack || []).filter(Boolean);
      if (metaBits.length) {
        item.appendChild(h('p', 'entry-meta', metaBits.join(' · ')));
      }

      pList.appendChild(item);
    });

    pRight.appendChild(pList);
    nav.push(['projects', 'projects']);
  }

  /* Writing / Blogs */
  var W = C.writing;
  if (W && W.items && W.items.length) {
    var wRight = makeRow('writing', 'Writing');
    var wList = h('div', 'entry-list');

    W.items.forEach(function (post) {
      var item = h('article', 'entry');
      var titleEl = link(post.href, post.title, 'entry-title');
      item.appendChild(titleEl);

      if (post.summary) {
        item.appendChild(h('p', 'entry-desc', post.summary));
      }
      if (post.date) {
        item.appendChild(h('p', 'entry-meta', post.date));
      }

      wList.appendChild(item);
    });

    wRight.appendChild(wList);
    nav.push(['writing', 'writing']);
  }

  /* Top Navigation */
  var navEl = $('nav');
  if (navEl) {
    navEl.innerHTML = '';
    nav.forEach(function (n) {
      var a = h('a', '', n[1]);
      a.href = '#' + n[0];
      navEl.appendChild(a);
    });
  }

  /* Minimal Footer */
  var F = C.footer;
  var ft = $('footer');
  var ftRow = $('footer-row');
  if (F && ft && ftRow && (F.builtWith || F.lastUpdated)) {
    ftRow.hidden = false;
    ft.textContent = [F.builtWith, F.lastUpdated ? 'updated ' + F.lastUpdated : ''].filter(Boolean).join(' · ');
  }
})();