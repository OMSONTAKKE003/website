/* main.js: renders the about, projects, and writing pages from content.js. */
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
      /^(https?:\/\/|mailto:|tel:|#|\/|\.{1,2}\/|[a-z0-9_-]+\/)/i.test(href.trim());
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

  function isPlaceholder(src) {
    return typeof src !== 'string' || !src.trim() || /[\[\]<>]/.test(src);
  }

  var M = C.meta || {};
  var H = C.hero || {};
  var page = document.body.dataset.page || 'about';
  var navItems = [
    ['about', 'about', 'index.html#about'],
    ['projects', 'projects', 'projects.html'],
    ['writing', 'writing', 'writing.html'],
  ];

  /* ------------------------------------------------------------------------
     Metadata
     ------------------------------------------------------------------------ */
  var pageTitles = { projects: 'Projects', writing: 'Writing' };
  if (pageTitles[page]) {
    document.title = pageTitles[page] + (M.name ? ' — ' + M.name : '');
  } else if (M.siteTitle) {
    document.title = M.siteTitle;
  }

  var md = document.querySelector('meta[name="description"]');
  if (md && M.description) md.setAttribute('content', M.description);

  /* ------------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------------ */
  var navEl = $('nav');
  if (navEl) {
    navEl.innerHTML = '';
    navItems.forEach(function (item) {
      var a = h('a', item[0] === page ? 'active' : '', item[1]);
      a.href = item[2];
      if (item[0] === page) a.setAttribute('aria-current', 'page');
      navEl.appendChild(a);
    });
  }

  /* ------------------------------------------------------------------------
     Hero + About (landing page)
     ------------------------------------------------------------------------ */
  function renderHero() {
    setText('hero-title', H.headline || M.name || '');
    setText('hero-lede', H.typedLine || '');
    setText('hero-summary', H.summary || '');

    var avatar = $('hero-avatar');
    var avatarSrc = M.avatar || M.profileImage || H.avatar;
    if (avatar && !isPlaceholder(avatarSrc)) {
      avatar.src = avatarSrc.trim();
      avatar.alt = M.name ? 'Portrait of ' + M.name : 'Portrait';
      avatar.hidden = false;
    }
  }

  function renderAbout() {
    var A = C.about || {};
    var body = $('about-body');
    if (body) {
      (A.paragraphs || []).forEach(function (text) {
        body.appendChild(h('p', '', text));
      });
    }

    var facts = $('about-facts');
    if (facts && A.facts) {
      A.facts.forEach(function (fact) {
        var li = h('li');
        li.appendChild(h('strong', '', fact.label + '. '));
        li.appendChild(document.createTextNode(fact.value));
        facts.appendChild(li);
      });
    }

    var photoSlot = $('about-photo');
    if (photoSlot && !isPlaceholder(A.photo)) {
      var figure = h('figure', 'about-photo');
      var img = document.createElement('img');
      img.src = A.photo.trim();
      img.alt = A.photoAlt || (M.name ? 'Portrait of ' + M.name : 'Portrait');
      img.loading = 'lazy';
      img.decoding = 'async';
      figure.appendChild(img);
      if (A.photoCaption) figure.appendChild(h('figcaption', '', A.photoCaption));
      photoSlot.appendChild(figure);
    }
  }

  /* ------------------------------------------------------------------------
     Projects page
     ------------------------------------------------------------------------ */
  function mediaSources(project) {
    if (Array.isArray(project.media)) return project.media.filter(Boolean);
    return project.media ? [project.media] : [];
  }

  function renderProjects() {
    var root = $('projects-list');
    if (!root) return;

    var items = (C.projects && C.projects.items) || [];
    if (!items.length) {
      root.appendChild(h('p', 'empty', 'No projects yet. Add one in content.js.'));
      return;
    }

    items.forEach(function (p, index) {
      var article = h('article', 'project');

      var top = h('div', 'project-top');
      top.appendChild(h('span', 'project-index', 'P' + String(index + 1).padStart(2, '0')));
      top.appendChild(h('span', '', p.year || ''));
      article.appendChild(top);

      article.appendChild(h('h2', 'project-title', p.title || '[PROJECT TITLE]'));

      var body = h('div', 'project-body');
      var copy = h('div', 'project-copy');

      var description = p.longDescription || p.description;
      if (description) {
        copy.appendChild(h('p', 'project-desc', description));
      }

      var tags = p.skills || p.stack || [];
      if (tags.length) {
        copy.appendChild(h('p', 'project-tags', tags.join(' · ')));
      }

      var links = h('div', 'project-links');
      if (p.href) links.appendChild(link(p.href, (p.linkLabel || 'visit project') + ' ↗'));
      if (p.repo) links.appendChild(link(p.repo, 'github ↗'));
      if (links.children.length) copy.appendChild(links);

      body.appendChild(copy);

      var sources = mediaSources(p);
      if (sources.length) {
        article.classList.add('has-media');
        var mediaWrap = h('div', 'project-media-wrap');
        var gallery = h('div', 'project-media');
        sources.forEach(function (src) {
          if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
            var video = document.createElement('video');
            video.src = src.trim();
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            gallery.appendChild(video);
          } else {
            var img = document.createElement('img');
            img.src = src.trim();
            img.alt = p.mediaAlt || p.title || 'Project media';
            img.loading = 'lazy';
            img.decoding = 'async';
            gallery.appendChild(img);
          }
        });
        mediaWrap.appendChild(gallery);
        if (p.mediaCaption) {
          mediaWrap.appendChild(h('p', 'project-caption', p.mediaCaption));
        }
        body.appendChild(mediaWrap);
      }

      article.appendChild(body);
      root.appendChild(article);
    });
  }

  /* ------------------------------------------------------------------------
     Writing page
     ------------------------------------------------------------------------ */
  function renderWriting() {
    var root = $('writing-list');
    if (!root) return;

    var items = (C.writing && C.writing.items) || [];
    if (!items.length) {
      root.appendChild(h('p', 'empty', 'No writing yet. Add a post in content.js.'));
      return;
    }

    items.forEach(function (post) {
      var entry = h('article', 'entry');
      entry.appendChild(link(post.href, post.title || '[POST TITLE]', 'entry-title'));
      if (post.summary) entry.appendChild(h('p', 'entry-desc', post.summary));
      if (post.date) entry.appendChild(h('p', 'entry-meta', post.date));
      root.appendChild(entry);
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  renderHero();
  renderAbout();
  renderProjects();
  renderWriting();
})();
