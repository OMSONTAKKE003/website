/* ============================================================================
   main.js — behavior for the portfolio
   Reads window.SITE_CONTENT (content.js) and renders the page.
   No dependencies. No build step.
   ========================================================================== */

(function () {
  'use strict';

  var C = window.SITE_CONTENT;
  if (!C) {
    console.error('content.js did not load. Check that docs/content.js exists.');
    return;
  }

  /* ------------------------------------------------------------------------
     Tiny helpers
     ------------------------------------------------------------------------ */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function setText(id, text) {
    var node = document.getElementById(id);
    if (node && text !== undefined && text !== null) node.textContent = text;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function isPlaceholder(value) {
    return typeof value === 'string' && /^\s*\[[\s\S]*\]\s*$/.test(value.trim());
  }

  function isRealHref(href) {
    if (typeof href !== 'string') return false;
    var value = href.trim();
    if (!value || /[\[\]<>]/.test(value)) return false;
    return /^(https?:\/\/|mailto:|tel:|#|\/|\.{1,2}\/)/i.test(value);
  }

  function isValidEmail(value) {
    return typeof value === 'string' &&
      /^[^\s@\[\]<>]+@[^\s@\[\]<>]+\.[^\s@\[\]<>]+$/.test(value.trim());
  }

  function createLink(href, label, className) {
    var valid = isRealHref(href);
    var node = document.createElement(valid ? 'a' : 'span');
    if (className) node.className = className;
    node.textContent = label;

    if (valid) {
      node.href = href.trim();
      if (/^https?:/i.test(href.trim())) {
        node.target = '_blank';
        node.rel = 'noopener noreferrer';
      }
    } else {
      node.classList.add('link-pending');
      node.title = 'Add a real link in docs/content.js';
    }
    return node;
  }

  function withArrow(node) {
    if (!node) return node;
    var arrow = el('span', 'btn-arrow', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    node.appendChild(document.createTextNode(' '));
    node.appendChild(arrow);
    return node;
  }

  function hideSection(id) {
    var section = document.getElementById(id);
    if (!section) return;
    section.hidden = true;

    var navLink = $('.site-nav a[href="#' + id + '"]');
    if (navLink) navLink.remove();

    var railNode = $('.rail-node[data-section="' + id + '"]');
    if (railNode) railNode.remove();
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var root = document.documentElement;
  var projectItems = (C.projects && Array.isArray(C.projects.items)) ? C.projects.items : [];
  var attention = {
    cols: [],
    selectedProject: 0,
    selectedSkill: null,
  };

  /* ------------------------------------------------------------------------
     Metadata, theme, navigation
     ------------------------------------------------------------------------ */
  function initMeta() {
    if (C.meta.siteTitle) document.title = C.meta.siteTitle;
    setText('brand-name', C.meta.name || '[YOUR NAME]');

    var description = C.meta.description || '';
    var metaDescription = $('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute('content', description);

    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle && C.meta.siteTitle) ogTitle.setAttribute('content', C.meta.siteTitle);
    var ogDescription = $('meta[property="og:description"]');
    if (ogDescription && description) ogDescription.setAttribute('content', description);

    var ogUrl = $('meta[property="og:url"]');
    if (ogUrl && isRealHref(C.meta.siteUrl) && /^https?:/i.test(C.meta.siteUrl.trim())) {
      ogUrl.setAttribute('content', C.meta.siteUrl.trim());
    }
  }

  function applyTheme(theme) {
    var isLight = theme === 'light';
    root.dataset.theme = isLight ? 'light' : 'dark';

    var toggle = $('#theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isLight));
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }

    var themeColor = $('#theme-color-meta');
    if (themeColor) themeColor.setAttribute('content', isLight ? '#F6F0E4' : '#070A0F');

    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) { /* storage may be blocked */ }
  }

  function initTheme() {
    var toggle = $('#theme-toggle');
    if (!toggle) return;

    applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

    toggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }

  function initNav() {
    var toggle = $('#nav-toggle');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;

    function setNav(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });

    var desktop = window.matchMedia('(min-width: 901px)');
    var onChange = function (event) { if (event.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ------------------------------------------------------------------------
     Hero
     ------------------------------------------------------------------------ */
  function renderHero() {
    var hero = C.hero || {};
    setText('hero-kicker', hero.kicker);
    setText('hero-role', C.meta.role);
    setText('hero-location', C.meta.location);
    setText('hero-summary', hero.summary);
    setText('hero-status', hero.status);
    setText('panel-label', hero.panelLabel);
    setText('panel-caption', hero.panelCaption);
    setText('scroll-cue', hero.scrollCue);
    setText('temp-note', hero.temperatureNote);
    setText('hero-lede-sr', hero.typedLine);

    if (hero.panelAxes) {
      setText('axis-x', hero.panelAxes.x);
      setText('axis-y', hero.panelAxes.y);
    }

    var status = $('#hero-status');
    if (status && (!hero.status || !hero.status.trim())) status.hidden = true;

    var headline = hero.headline || C.meta.name || '[YOUR NAME]';
    var h1 = $('#hero-title');
    if (h1) {
      h1.textContent = '';
      h1.setAttribute('aria-label', headline);
      headline.split(/\s+/).filter(Boolean).forEach(function (word, index, words) {
        var token = el('span', 'token', word);
        token.setAttribute('aria-hidden', 'true');
        h1.appendChild(token);
        if (index < words.length - 1) h1.appendChild(document.createTextNode(' '));
      });
    }

    var actions = $('#hero-actions');
    if (actions && hero.primaryCta) {
      actions.appendChild(withArrow(
        createLink(hero.primaryCta.href, hero.primaryCta.label, 'btn btn--primary')
      ));
      if (hero.secondaryCta) {
        actions.appendChild(withArrow(
          createLink(hero.secondaryCta.href, hero.secondaryCta.label, 'btn btn--ghost')
        ));
      }
    }
  }

  function initTyping() {
    var target = $('#hero-typed');
    var caret = $('#hero-caret');
    var source = (C.hero && C.hero.typedLine) || '';
    if (!target) return;

    target.textContent = '';
    if (!source) {
      if (caret) caret.hidden = true;
      return;
    }

    if (reducedMotion.matches) {
      target.textContent = source;
      if (caret) caret.hidden = true;
      return;
    }

    var i = 0;
    function step() {
      var size = Math.random() < 0.18 ? 2 : 1;
      i = Math.min(source.length, i + size);
      target.textContent = source.slice(0, i);

      if (i < source.length) {
        window.setTimeout(step, 16 + Math.random() * 30);
      } else if (caret) {
        caret.classList.add('is-done');
      }
    }

    window.setTimeout(step, 420);

    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener('change', function (event) {
        if (!event.matches) return;
        target.textContent = source;
        if (caret) {
          caret.hidden = true;
          caret.classList.add('is-done');
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     Temperature + token attention
     ------------------------------------------------------------------------ */
  function getTemperature() {
    var input = $('#temperature');
    var value = input ? parseFloat(input.value) : 0.9;
    return Number.isFinite(value) ? value : 0.9;
  }

  function tempBand(value) {
    if (value < 0.65) return 'focused';
    if (value < 1.25) return 'balanced';
    return 'diffuse';
  }

  function tempCopy(value) {
    var band = tempBand(value);
    if (band === 'focused') return 'Focused: a few tokens hold most of the attention.';
    if (band === 'diffuse') return 'Diffuse: attention softens and spreads across the line.';
    return 'Balanced: attention moves across the line without collapsing to one token.';
  }

  function initTemperature() {
    var input = $('#temperature');
    var output = $('#temp-value');
    var note = $('#temp-note');
    if (!input) return;

    function update(announce) {
      var value = getTemperature();
      root.style.setProperty('--temp', value.toFixed(2));
      if (output) output.textContent = value.toFixed(2);
      input.setAttribute('aria-valuetext', value.toFixed(2) + ' — ' + tempBand(value));
      if (announce && note) note.textContent = tempCopy(value);
      if (window.__portfolioRedrawAttention) window.__portfolioRedrawAttention();
      if (window.__portfolioRedrawTokens) window.__portfolioRedrawTokens();
    }

    root.style.setProperty('--temp', getTemperature().toFixed(2));
    update(false);

    input.addEventListener('input', function () { update(true); });
    input.addEventListener('change', function () { update(true); });
  }

  function initHeroTokens() {
    var hero = $('#hero');
    var h1 = $('#hero-title');
    if (!hero || !h1) return;

    var tokens = $$('.token', h1);
    if (!tokens.length) return;

    var pointer = null;
    var frame = 0;

    function paint() {
      frame = 0;

      if (!pointer) {
        tokens.forEach(function (token) {
          token.style.setProperty('--heat', '0');
          token.classList.remove('is-peak');
        });
        return;
      }

      var temp = getTemperature();
      var sigma = 100 + temp * 130;
      var values = [];
      var max = 0;

      tokens.forEach(function (token) {
        var rect = token.getBoundingClientRect();
        var dx = pointer.x - (rect.left + rect.width / 2);
        var dy = pointer.y - (rect.top + rect.height / 2);
        var value = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        values.push(value);
        if (value > max) max = value;
      });

      tokens.forEach(function (token, index) {
        var value = max > 0 ? values[index] / max : 0;
        if (value < 0.04) value = 0;
        token.style.setProperty('--heat', value.toFixed(3));
        token.classList.toggle('is-peak', value > 0.55);
      });
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    }

    hero.addEventListener('pointermove', function (event) {
      if (event.pointerType === 'touch' || reducedMotion.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    });

    hero.addEventListener('pointerleave', function () {
      pointer = null;
      schedule();
    });

    window.__portfolioRedrawTokens = schedule;
    schedule();
  }

  /* ------------------------------------------------------------------------
     Attention canvas (hero)
     ------------------------------------------------------------------------ */
  function initAttentionCanvas() {
    var canvas = $('#attention-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.hidden = true;
      return;
    }

    var COLS = 22;
    var ROWS = 12;
    var state = {
      x: 0.64,
      y: 0.38,
      active: false,
      visible: true,
    };
    var frame = 0;
    var seeded = [
      [0.14, 0.26],
      [0.44, 0.16],
      [0.76, 0.32],
      [0.28, 0.68],
      [0.58, 0.78],
      [0.88, 0.62],
    ];

    function rgb(name, fallback) {
      var raw = getComputedStyle(root).getPropertyValue(name).trim();
      var parts = raw.split(',').map(function (part) { return parseFloat(part); });
      if (parts.length === 3 && parts.every(Number.isFinite)) return parts.join(', ');
      return fallback;
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var width = Math.round(rect.width * dpr);
      var height = Math.round(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }

    function cell(x, y, width, height, radius) {
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, width, height);
      }
    }

    function draw() {
      frame = 0;
      if (!state.visible) return;
      if (!resize()) return;

      var rect = canvas.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var temp = getTemperature();
      var sigma = 0.045 + temp * 0.052;
      var points = seeded.slice();

      if (state.active) points.push([state.x, state.y]);

      ctx.clearRect(0, 0, width, height);

      var colWidth = width / COLS;
      var rowHeight = height / ROWS;
      var gap = Math.max(1.5, Math.min(3, colWidth * 0.16));
      var weights = [];
      var max = 0;

      for (var row = 0; row < ROWS; row += 1) {
        for (var col = 0; col < COLS; col += 1) {
          var px = (col + 0.5) / COLS;
          var py = (row + 0.5) / ROWS;
          var best = 0;

          for (var p = 0; p < points.length; p += 1) {
            var dx = px - points[p][0];
            var dy = py - points[p][1];
            var value = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
            if (value > best) best = value;
          }

          // A little fixed texture so the grid does not look mechanically smooth.
          var noise = Math.abs(Math.sin((col + 1) * 12.9898 + (row + 1) * 78.233) * 43758.5453) % 1;
          best *= 0.94 + noise * 0.11;

          weights.push(best);
          if (best > max) max = best;
        }
      }

      var cool = rgb('--attn-rgb', '94, 234, 212');
      var warm = rgb('--attn2-rgb', '245, 184, 106');

      for (var index = 0; index < weights.length; index += 1) {
        var weight = max > 0 ? weights[index] / max : 0;
        if (weight < 0.045) continue;

        var alpha = 0.04 + weight * 0.76;
        var color = weight > 0.84 ? warm : cool;
        ctx.fillStyle = 'rgba(' + color + ', ' + alpha.toFixed(3) + ')';
        cell(
          (index % COLS) * colWidth + gap / 2,
          Math.floor(index / COLS) * rowHeight + gap / 2,
          colWidth - gap,
          rowHeight - gap,
          2
        );
      }
    }

    function schedule() {
      if (frame || !state.visible) return;
      frame = window.requestAnimationFrame(draw);
    }

    function pointFromEvent(event) {
      var rect = canvas.getBoundingClientRect();
      state.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      state.y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      state.active = true;
      schedule();
    }

    var figure = canvas.closest('.attention-figure');
    if (figure) {
      figure.addEventListener('pointermove', function (event) {
        if (event.pointerType === 'touch' || reducedMotion.matches) return;
        pointFromEvent(event);
      });
      figure.addEventListener('pointerleave', function () {
        state.active = false;
        schedule();
      });
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(schedule).observe(canvas);
    } else {
      window.addEventListener('resize', schedule);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      new IntersectionObserver(function (entries) {
        state.visible = entries[0].isIntersecting;
        if (state.visible) schedule();
      }, { threshold: 0 }).observe(canvas);
    }

    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(schedule).observe(root, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    window.__portfolioRedrawAttention = schedule;
    schedule();
  }

  /* ------------------------------------------------------------------------
     About
     ------------------------------------------------------------------------ */
  function renderAbout() {
    var about = C.about || {};
    setText('about-kicker', about.kicker);
    setText('about-heading', about.heading);
    setText('about-heading2', about.heading2);

    var body = $('#about-body');
    if (body) {
      body.textContent = '';
      (about.paragraphs || []).forEach(function (text) {
        body.appendChild(el('p', '', text));
      });
    }

    var facts = $('#about-facts');
    if (facts) {
      facts.textContent = '';
      (about.facts || []).forEach(function (fact) {
        var item = el('li');
        item.appendChild(el('span', 'fact-label', fact.label));
        item.appendChild(el('span', 'fact-value', fact.value));
        facts.appendChild(item);
      });
    }

    var quote = $('#about-quote');
    if (quote) {
      if (about.quote && !isPlaceholder(about.quote)) {
        setText('about-quote-text', about.quote);
        setText('about-quote-cite', about.quoteAttribution || '');
        quote.hidden = false;
      } else {
        quote.hidden = true;
      }
    }
  }

  /* ------------------------------------------------------------------------
     Projects
     ------------------------------------------------------------------------ */
  function skillWeight(project, skill) {
    var skills = Array.isArray(project.skills) ? project.skills : [];
    var index = skills.indexOf(skill);
    if (index < 0) return 0;
    return Math.max(0.35, 1 - index * 0.18);
  }

  function formatProjectAttention(project) {
    var skills = (project.skills || []).filter(function (skill) {
      return attention.cols.indexOf(skill) !== -1;
    });
    if (!skills.length) return 'no mapped skills yet';
    return skills.map(function (skill) {
      return skill + ' (' + Math.round(skillWeight(project, skill) * 100) + '%)';
    }).join(', ');
  }

  function projectCard(project, index) {
    var card = el('article', 'project-card reveal');
    card.dataset.index = String(index);
    card.style.setProperty('--d', (index * 55) + 'ms');
    if (project.featured) card.classList.add('is-featured');

    var top = el('div', 'card-top');
    top.appendChild(el('span', 'card-index', 'P' + pad(index + 1)));
    var meta = [project.year, project.featured ? 'featured' : 'project'].filter(Boolean).join(' · ');
    top.appendChild(el('span', '', meta));

    card.appendChild(top);
    card.appendChild(el('h3', '', project.title || '[PROJECT TITLE]'));
    card.appendChild(el('p', '', project.description || ''));

    var stack = el('ul', 'stack');
    (project.stack || []).forEach(function (tech) {
      stack.appendChild(el('li', '', tech));
    });
    if (stack.children.length) card.appendChild(stack);

    var links = el('div', 'card-links');
    links.appendChild(createLink(project.href, project.linkLabel || 'View project', 'card-link'));
    if (project.repo) {
      links.appendChild(createLink(project.repo, project.repoLabel || 'Code', 'card-link'));
    }
    card.appendChild(links);

    card.addEventListener('pointerenter', function () {
      selectProject(index);
    });

    card.addEventListener('focusin', function () {
      selectProject(index);
    });

    card.addEventListener('pointermove', function (event) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width) * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (((event.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%');
    });

    return card;
  }

  function renderProjects() {
    var projects = C.projects || {};
    setText('projects-kicker', projects.kicker);
    setText('projects-heading', projects.heading);
    setText('projects-intro', projects.intro);
    setText('attn-note', projects.attentionNote);

    var grid = $('#projects-grid');
    if (!grid) return false;

    if (!projectItems.length) {
      hideSection('projects');
      return false;
    }

    projectItems.forEach(function (project, index) {
      grid.appendChild(projectCard(project, index));
    });

    var unique = [];
    projectItems.forEach(function (project) {
      (project.skills || []).forEach(function (skill) {
        if (unique.indexOf(skill) === -1) unique.push(skill);
      });
    });
    attention.cols = unique.slice(0, 10);

    setText(
      'projects-count',
      pad(projectItems.length) + ' projects · ' + pad(attention.cols.length) + ' skills mapped'
    );

    buildAttentionMatrix();
    return true;
  }

  function buildAttentionMatrix() {
    var grid = $('#attn-grid');
    var tabs = $('#attn-tabs');
    if (!grid || !tabs) return;

    grid.textContent = '';
    tabs.textContent = '';
    grid.style.setProperty('--cols', String(Math.max(1, attention.cols.length)));

    var corner = el('span', 'attn-corner');
    corner.setAttribute('aria-hidden', 'true');
    grid.appendChild(corner);

    attention.cols.forEach(function (skill, index) {
      var label = el('span', 'attn-col-label', 'S' + (index + 1));
      label.title = skill;
      label.setAttribute('aria-hidden', 'true');
      grid.appendChild(label);
    });

    projectItems.forEach(function (project, projectIndex) {
      var row = el('div', 'attn-row');
      row.dataset.project = String(projectIndex);

      var label = el('span', 'attn-row-label', 'P' + pad(projectIndex + 1));
      label.title = project.title || '';
      label.setAttribute('aria-hidden', 'true');
      row.appendChild(label);

      attention.cols.forEach(function (skill, skillIndex) {
        var weight = skillWeight(project, skill);
        var cell = el('span', 'attn-cell');
        if (!weight) cell.classList.add('is-zero');
        if (weight >= 1) cell.classList.add('is-hot');
        cell.style.setProperty('--w', weight.toFixed(2));
        cell.dataset.project = String(projectIndex);
        cell.dataset.skill = String(skillIndex);
        cell.title = weight
          ? (project.title || 'Project') + ' → ' + skill + ' (' + Math.round(weight * 100) + '%)'
          : 'No attention: ' + (project.title || 'Project') + ' → ' + skill;
        cell.setAttribute('aria-hidden', 'true');
        row.appendChild(cell);
      });

      grid.appendChild(row);

      var tab = el('button', 'attn-tab', 'P' + pad(projectIndex + 1));
      tab.type = 'button';
      tab.setAttribute('aria-pressed', 'false');
      tab.title = project.title || '';
      tab.addEventListener('click', function () {
        selectProject(projectIndex);
      });
      tabs.appendChild(tab);
    });
  }

  function renderAttentionState() {
    var grid = $('#attn-grid');
    var readout = $('#attn-readout');
    if (!grid || !readout) return;

    var selected = attention.selectedProject;
    var skill = attention.selectedSkill;
    var skillIndex = skill ? attention.cols.indexOf(skill) : -1;
    var project = projectItems[selected];
    var readoutText = '';
    var activeRows = [];

    $$('.attn-row', grid).forEach(function (row, rowIndex) {
      var rowLabel = $('.attn-row-label', row);
      var rowProject = projectItems[rowIndex];
      var isProjectRow = rowIndex === selected;
      var matchesSkill = skill && rowProject && (rowProject.skills || []).indexOf(skill) !== -1;

      if (isProjectRow) activeRows.push('P' + pad(rowIndex + 1));
      if (matchesSkill) activeRows.push('P' + pad(rowIndex + 1));
      if (rowLabel) {
        rowLabel.classList.toggle('is-active', Boolean(isProjectRow || matchesSkill));
      }

      $$('.attn-cell', row).forEach(function (cell, cellIndex) {
        var on = skill
          ? cellIndex === skillIndex
          : isProjectRow && (projectItems[rowIndex].skills || []).indexOf(attention.cols[cellIndex]) !== -1;
        cell.classList.toggle('is-active', Boolean(on));
      });
    });

    grid.classList.toggle('is-dimmed', Boolean(skill));

    var cards = $$('.project-card');
    if (skill) {
      var matches = [];
      projectItems.forEach(function (item, index) {
        if ((item.skills || []).indexOf(skill) !== -1) matches.push(index);
      });

      cards.forEach(function (card, index) {
        card.classList.remove('is-selected');
        card.classList.toggle('is-attended', matches.indexOf(index) !== -1);
        card.classList.toggle('is-dimmed', matches.indexOf(index) === -1);
      });

      readoutText = matches.length
        ? 'Projects attending to ' + skill + ': ' +
          matches.map(function (index) { return projectItems[index].title; }).join(', ') + '.'
        : 'No projects list ' + skill + ' yet. Add it to a project in content.js.';
    } else if (project) {
      cards.forEach(function (card, index) {
        card.classList.remove('is-attended', 'is-dimmed');
        card.classList.toggle('is-selected', index === selected);
      });
      readoutText = 'P' + pad(selected + 1) + ' · ' + project.title +
        ' attends to ' + formatProjectAttention(project) + '.';
    }

    readout.textContent = readoutText;
    grid.setAttribute(
      'aria-label',
      'Attention map. Rows are projects ' + projectItems.map(function (_, index) {
        return 'P' + pad(index + 1);
      }).join(', ') + '. Columns are skills ' + attention.cols.join(', ') + '. ' + readoutText
    );

    $$('.skill-token').forEach(function (chip) {
      var chipSkill = chip.dataset.skill;
      var related = project ? (project.skills || []).indexOf(chipSkill) !== -1 : false;
      chip.classList.toggle('is-related', Boolean(related && !skill));
      chip.classList.toggle('is-dimmed', Boolean(skill && chipSkill !== skill));
      chip.setAttribute('aria-pressed', String(chipSkill === skill));
    });

    var status = $('#skills-status');
    if (status) {
      if (skill) {
        var count = projectItems.filter(function (item) {
          return (item.skills || []).indexOf(skill) !== -1;
        }).length;
        status.textContent = count + ' project' + (count === 1 ? '' : 's') + ' attend to ' + skill + '.';
      } else {
        status.textContent = (C.skills && C.skills.note) || '';
      }
    }
  }

  function selectProject(index) {
    if (!projectItems[index]) return;
    attention.selectedProject = index;
    attention.selectedSkill = null;

    $$('.attn-tab').forEach(function (tab, tabIndex) {
      tab.setAttribute('aria-pressed', String(tabIndex === index));
    });

    renderAttentionState();
  }

  function selectSkill(skill) {
    attention.selectedSkill = attention.selectedSkill === skill ? null : skill;

    $$('.attn-tab').forEach(function (tab, index) {
      tab.setAttribute(
        'aria-pressed',
        String(!attention.selectedSkill && index === attention.selectedProject)
      );
    });

    renderAttentionState();
  }

  function initProjectAttention() {
    if (!projectItems.length) return;

    $$('.attn-tab').forEach(function (tab, index) {
      tab.title = projectItems[index].title || '';
    });

    selectProject(0);

    // Describe the first project only after the map is in the page.
    var readout = $('#attn-readout');
    if (readout && !readout.textContent) readout.textContent = 'Select a project or skill.';

    window.__portfolioSelectProject = selectProject;
  }

  /* ------------------------------------------------------------------------
     Skills
     ------------------------------------------------------------------------ */
  function renderSkills() {
    var skills = C.skills || {};
    setText('skills-kicker', skills.kicker);
    setText('skills-heading', skills.heading);
    setText('skills-intro', skills.intro);
    setText('skills-status', skills.note);

    var groups = $('#skill-groups');
    if (!groups) return;

    var source = Array.isArray(skills.groups) ? skills.groups : [];
    if (!source.length) {
      hideSection('skills');
      return;
    }

    source.forEach(function (group) {
      var section = el('div', 'skill-group reveal');
      section.appendChild(el('h3', '', group.name || 'Skills'));

      var tokens = el('div', 'skill-tokens');
      (group.items || []).forEach(function (skill) {
        var button = el('button', 'skill-token', skill);
        button.type = 'button';
        button.dataset.skill = skill;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', function () {
          selectSkill(skill);
        });
        tokens.appendChild(button);
      });

      section.appendChild(tokens);
      groups.appendChild(section);
    });
  }

  /* ------------------------------------------------------------------------
     Experience & education
     ------------------------------------------------------------------------ */
  function timelineItem(item, compact) {
    var article = el('article', 'timeline-item reveal');

    if (item.period) article.appendChild(el('p', 'period', item.period));

    var heading = el('h3');
    heading.appendChild(document.createTextNode(item.role || '[ROLE]'));
    if (item.org) {
      heading.appendChild(document.createTextNode(' '));
      heading.appendChild(el('span', 'org', '@ ' + item.org));
    }
    article.appendChild(heading);

    if (item.summary) article.appendChild(el('p', '', item.summary));

    if (!compact && Array.isArray(item.tags) && item.tags.length) {
      var tags = el('ul', 'tags');
      item.tags.forEach(function (tag) {
        tags.appendChild(el('li', '', tag));
      });
      article.appendChild(tags);
    }

    return article;
  }

  function renderExperience() {
    var experience = C.experience || {};
    setText('experience-kicker', experience.kicker);
    setText('experience-heading', experience.heading);

    var list = $('#experience-list');
    if (!list) return;

    var items = Array.isArray(experience.items) ? experience.items : [];
    if (!items.length) {
      var section = document.getElementById('experience');
      var educationStillHasItems = C.education && Array.isArray(C.education.items) && C.education.items.length;
      if (!educationStillHasItems) hideSection('experience');
      if (section) section.hidden = !educationStillHasItems;
      return;
    }

    items.forEach(function (item) {
      list.appendChild(timelineItem(item, false));
    });
  }

  function renderEducation() {
    var education = C.education || {};
    var heading = $('#education-heading');
    if (heading) heading.textContent = education.heading || 'Education';

    var list = $('#education-list');
    if (!list) return;

    var items = Array.isArray(education.items) ? education.items : [];
    if (!items.length) {
      var block = $('.education-block');
      if (block) block.hidden = true;
      return;
    }

    items.forEach(function (item) {
      list.appendChild(timelineItem(item, true));
    });
  }

  /* ------------------------------------------------------------------------
     Writing
     ------------------------------------------------------------------------ */
  function renderWriting() {
    var writing = C.writing || {};
    var items = Array.isArray(writing.items) ? writing.items : [];
    if (!items.length) {
      hideSection('writing');
      return;
    }

    setText('writing-kicker', writing.kicker);
    setText('writing-heading', writing.heading);
    setText('writing-intro', writing.intro);

    var list = $('#writing-list');
    if (!list) return;

    items.forEach(function (item) {
      var valid = isRealHref(item.href);
      var row = document.createElement(valid ? 'a' : 'div');
      row.className = 'writing-link' + (valid ? '' : ' is-pending');

      if (valid) {
        row.href = item.href.trim();
        if (/^https?:/i.test(item.href.trim())) {
          row.target = '_blank';
          row.rel = 'noopener noreferrer';
        }
      } else {
        row.title = 'Add a real link in docs/content.js';
      }

      row.appendChild(el('span', 'writing-date', item.date || ''));
      var main = document.createElement('span');
      main.appendChild(el('span', 'writing-title', item.title || '[POST TITLE]'));
      main.appendChild(el('span', 'writing-summary', item.summary || ''));
      row.appendChild(main);
      row.appendChild(el('span', 'writing-label', valid ? (item.label || 'Read') : 'Add link'));

      var li = el('li', 'writing-item reveal');
      li.appendChild(row);
      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------
     Contact & footer
     ------------------------------------------------------------------------ */
  function renderContact() {
    var contact = C.contact || {};
    setText('contact-kicker', contact.kicker);
    setText('contact-heading', contact.heading);
    setText('contact-blurb', contact.blurb);
    setText('contact-closing', contact.closing);

    var actions = $('#contact-actions');
    if (actions) {
      actions.textContent = '';

      if (isValidEmail(contact.email)) {
        var email = contact.email.trim();
        var mail = createLink('mailto:' + email, 'Email me', 'btn btn--primary');
        withArrow(mail);
        actions.appendChild(mail);
      } else {
        var pending = el('span', 'btn btn--ghost link-pending', 'Add your email in content.js');
        pending.title = 'Set contact.email in docs/content.js';
        actions.appendChild(pending);
      }
    }

    var links = $('#contact-links');
    if (links) {
      links.textContent = '';
      (contact.links || []).forEach(function (item) {
        var li = el('li');
        li.appendChild(createLink(item.href, item.label, ''));
        links.appendChild(li);
      });
    }
  }

  function renderFooter() {
    var footer = C.footer || {};
    var card = $('#model-card');
    if (card) {
      card.textContent = '';
      (footer.fields || []).forEach(function (field) {
        var item = el('div', 'model-field');
        item.appendChild(el('span', '', field.label));
        item.appendChild(el('span', '', field.value));
        card.appendChild(item);
      });
      if (!card.children.length) card.hidden = true;
    }

    setText('footer-name', C.meta.name || '[YOUR NAME]');
    setText('footer-built', footer.builtWith);
    setText('footer-updated', footer.lastUpdated);
    setText('year', String(new Date().getFullYear()));
  }

  /* ------------------------------------------------------------------------
     Scroll: reveals, active nav, loss curve
     ------------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) { observer.observe(item); });
  }

  function initNavigationState() {
    var sections = $$('main section[id]');
    var navLinks = $$('.site-nav a[href^="#"]');
    var railNodes = $$('.rail-node');
    if (!sections.length) return;

    if (typeof IntersectionObserver === 'undefined') return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;

        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });

        railNodes.forEach(function (node) {
          node.classList.toggle('is-active', node.dataset.section === id);
        });
      });
    }, { rootMargin: '-42% 0px -53% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function initLossCurve() {
    var divider = $('.loss-divider');
    if (!divider) return;

    if (typeof IntersectionObserver === 'undefined') {
      divider.classList.add('is-visible');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        divider.classList.add('is-visible');
        observer.disconnect();
      });
    }, { threshold: 0.35 });

    observer.observe(divider);
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  initMeta();
  initTheme();
  initNav();
  renderHero();
  renderAbout();
  var hasProjects = renderProjects();
  renderSkills();
  renderExperience();
  renderEducation();
  renderWriting();
  renderContact();
  renderFooter();

  initTyping();
  initTemperature();
  initHeroTokens();
  initAttentionCanvas();
  if (hasProjects) initProjectAttention();

  initReveal();
  initNavigationState();
  initLossCurve();
})();
