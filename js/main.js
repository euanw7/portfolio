/* Portfolio site behaviour: languages, theme, nav, project cards and the
   project details dialog. Content lives in index.html, data/projects.js
   and lang/*.js; you shouldn't need to edit this file unless you want to
   change how things work. */
(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[ch]);

  /* ---------------------------------------------------------------
     Languages
     English is written straight into index.html. Other languages live
     in lang/<code>.js and are swapped in here; anything they don't
     translate stays in English.
     --------------------------------------------------------------- */
  const LANGS = window.LANGUAGES || {};
  const DEFAULT_LANG = "en";
  let lang = DEFAULT_LANG;
  const missing = new Set(); // untranslated keys, reported in the console

  // Labels written by this script. {name}-style placeholders are filled from vars.
  const t = (key, vars = {}) =>
    String(LANGS[lang]?.ui?.[key] ?? LANGS[DEFAULT_LANG]?.ui?.[key] ?? key)
      .replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

  // The English version of everything we translate, so we can switch back
  const originals = new Map();
  const original = (el, what, read) => {
    if (!originals.has(el)) originals.set(el, {});
    const saved = originals.get(el);
    if (!(what in saved)) saved[what] = read();
    return saved[what];
  };

  function translatePage() {
    const strings = lang === DEFAULT_LANG ? {} : LANGS[lang]?.page || {};
    const lookup = (key) => {
      const v = strings[key];
      if (v == null && lang !== DEFAULT_LANG) missing.add(key);
      return v;
    };

    // data-i18n="key": the element's contents
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const prop = el.tagName === "TITLE" ? "textContent" : "innerHTML";
      const english = original(el, "contents", () => el[prop]);
      const v = lookup(el.dataset.i18n);
      el[prop] = v == null ? english
        : Array.isArray(v) ? v.map((item) => `<li>${item}</li>`).join("")
        : v;
    });

    // data-i18n-attr="attribute:key, attribute:key": attributes such as aria-label
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const english = original(el, `@${attr}`, () => el.getAttribute(attr));
        el.setAttribute(attr, lookup(key) ?? english);
      });
    });

    // <time datetime="2025-11">: month names from the language file, or
    // failing that the browser's own (not every browser knows every language)
    const names = LANGS[lang]?.months;
    const intl = lang !== DEFAULT_LANG && !names && Intl.DateTimeFormat.supportedLocalesOf(lang).length
      ? new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" })
      : null;
    document.querySelectorAll("time[datetime]").forEach((el) => {
      const english = original(el, "contents", () => el.textContent);
      const [y, m] = el.getAttribute("datetime").split("-").map(Number);
      el.textContent = lang === DEFAULT_LANG || !m ? english
        : names ? `${names[m - 1]} ${y}`
        : intl ? intl.format(Date.UTC(y, m - 1))
        : english;
    });
  }

  const LINK_ORDER = ["website", "demo", "repo", "writeup"];
  // The first of these a project has also goes on its card
  const CARD_LINKS = ["website", "demo"];

  const sortedLinks = (links) =>
    Object.entries(links)
      .filter(([, url]) => url)
      .sort(([a], [b]) => (LINK_ORDER.indexOf(a) + 1 || 99) - (LINK_ORDER.indexOf(b) + 1 || 99));

  // A project in the current language, with defaults filled in
  const localise = (p) => {
    let tr = {};
    if (lang !== DEFAULT_LANG) {
      tr = LANGS[lang]?.projects?.[p.name];
      if (!tr) missing.add(`projects["${p.name}"]`);
    }
    const q = { ...p, ...tr };
    return {
      ...q,
      accent: q.accent === "blue" ? "blue" : "orange",
      stack: q.stack || [],
      highlights: q.highlights || [],
      links: q.links || {},
    };
  };

  const meta = (p) => [p.type, p.year].filter((x) => x != null && x !== "").map(esc).join(" &middot; ");

  const PAUSE_ICON = `<svg class="icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>`;
  const PLAY_ICON = `<svg class="icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>`;

  // A project's image, or a looping video (with the image as its poster)
  const media = (p, cls) => {
    if (!p.image && !p.video) return "";
    const imgAlt = esc(p.imageAlt ?? t("screenshotOf", { name: p.name }));
    const wrap = (inner, extra = "") =>
      `<div class="${cls}${p.duotone ? " is-duotone" : ""}${extra}">${inner}</div>`;
    if (!p.video) return wrap(`<img src="${esc(p.image)}" alt="${imgAlt}" loading="lazy">`);
    return wrap(
      `<video src="${esc(p.video)}"${p.image ? ` poster="${esc(p.image)}"` : ""} data-alt="${imgAlt}"
        aria-label="${esc(p.imageAlt ?? t("videoOf", { name: p.name }))}" muted loop playsinline preload="metadata"></video>
      <button class="media-toggle" type="button" aria-label="${esc(t("playVideo"))}">${PAUSE_ICON}${PLAY_ICON}</button>`,
      " has-video is-paused");
  };

  // Videos play only while on screen, never if the visitor has asked for
  // reduced motion (they can still press play), and stay paused once paused.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting && !v.dataset.userPaused && !reduceMotion.matches) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.25 });

  // Wire up images and videos in a freshly rendered container
  const setupMedia = (container) => {
    // If an image path is wrong, drop the image rather than show an empty box
    container.querySelectorAll("img").forEach((img) =>
      img.addEventListener("error", () => img.parentElement.remove(), { once: true }));

    container.querySelectorAll("video").forEach((v) => {
      const wrap = v.parentElement;
      const btn = wrap.querySelector(".media-toggle");
      const sync = () => {
        wrap.classList.toggle("is-paused", v.paused);
        btn.setAttribute("aria-label", t(v.paused ? "playVideo" : "pauseVideo"));
      };
      v.addEventListener("play", sync);
      v.addEventListener("pause", sync);
      btn.addEventListener("click", () => {
        if (v.paused) {
          delete v.dataset.userPaused;
          v.play().catch(() => {});
        } else {
          v.dataset.userPaused = "true";
          v.pause();
        }
      });
      // Broken video path: fall back to the poster image, or drop it entirely
      v.addEventListener("error", () => {
        videoObserver.unobserve(v);
        const poster = v.getAttribute("poster");
        if (!poster) return wrap.remove();
        const img = new Image();
        img.src = poster;
        img.alt = v.dataset.alt;
        img.addEventListener("error", () => wrap.remove(), { once: true });
        v.replaceWith(img);
        btn.remove();
        wrap.classList.remove("has-video", "is-paused");
      }, { once: true });
      videoObserver.observe(v);
    });
  };

  const stackList = (stack) =>
    stack.length
      ? `<ul class="inline-list" aria-label="${esc(t("builtWith"))}">${stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
      : "";

  /* ---------------------------------------------------------------
     Project cards
     --------------------------------------------------------------- */
  const grid = document.getElementById("project-grid");
  let projects = [];
  let cardsShown = false;

  function renderProjects() {
    if (!grid) return;
    projects = (window.PROJECTS || []).map(localise);
    grid.querySelectorAll("video").forEach((v) => videoObserver.unobserve(v));
    grid.innerHTML = projects
      .map((p, i) => {
        const [linkKey, linkUrl] = sortedLinks(p.links).find(([k]) => CARD_LINKS.includes(k)) || [];
        return `
        <article class="project reveal" data-accent="${p.accent}" style="--delay:${Math.min(i, 8) * 70}ms">
          ${media(p, "project-img")}
          <div class="project-body">
            <p class="project-meta">${meta(p)}</p>
            <h3 class="project-title">${esc(p.name)}</h3>
            <p class="project-summary">${esc(p.summary)}</p>
            ${stackList(p.stack)}
            <div class="project-foot">
              <button class="project-open" type="button" aria-haspopup="dialog">
                ${esc(t("readMore"))}<span class="visually-hidden"> ${esc(t("readMoreAbout", { name: p.name }))}</span> <span aria-hidden="true">&rarr;</span>
              </button>
              ${linkUrl ? `<a class="project-link" href="${esc(linkUrl)}" target="_blank" rel="noopener">${esc(t(linkKey))}<span class="visually-hidden">: ${esc(p.name)} (${esc(t("newTab"))})</span> <span aria-hidden="true">&nearr;</span></a>` : ""}
            </div>
          </div>
        </article>`;
      })
      .join("");

    // Only animate the cards in the first time, not on every language switch
    if (cardsShown) grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    cardsShown = true;

    setupMedia(grid);
    grid.querySelectorAll(".project-open").forEach((btn, i) =>
      btn.addEventListener("click", () => openProject(projects[i], btn)));
  }

  /* ---------------------------------------------------------------
     Project details dialog
     --------------------------------------------------------------- */
  const dialog = document.getElementById("project-dialog");
  const dialogContent = document.getElementById("project-dialog-content");
  let returnFocusTo = null;

  function openProject(p, opener) {
    returnFocusTo = opener;
    const links = sortedLinks(p.links)
      .map(([k, url], i) =>
        `<a class="btn btn-small${i === 0 ? " btn-solar" : ""}" href="${esc(url)}" target="_blank" rel="noopener">${esc(t(k))} <span aria-hidden="true">&nearr;</span></a>`)
      .join("");

    dialog.dataset.accent = p.accent;
    dialogContent.querySelectorAll("video").forEach((v) => videoObserver.unobserve(v));
    dialogContent.innerHTML = `
      <p class="project-meta">${meta(p)}</p>
      <h2 class="pd-title" id="project-dialog-title">${esc(p.name)}</h2>
      ${media(p, "pd-img")}
      ${p.description ? `<p class="pd-description">${esc(p.description)}</p>` : ""}
      ${p.highlights.length ? `<h3 class="pd-subhead">${esc(t("highlights"))}</h3><ul class="entry-points">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
      ${p.stack.length ? `<h3 class="pd-subhead">${esc(t("builtWith"))}</h3>${stackList(p.stack)}` : ""}
      ${links ? `<div class="pd-links">${links}</div>` : ""}`;
    setupMedia(dialogContent);

    dialog.showModal();
    dialog.scrollTop = 0;
  }

  if (dialog) {
    dialog.querySelector(".pd-close").addEventListener("click", () => dialog.close());
    // Clicking the dimmed area outside the panel closes it
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      // The close event is async; if another project was opened in the
      // meantime, leave it alone.
      if (dialog.open) return;
      dialogContent.querySelectorAll("video").forEach((v) => v.pause());
      if (returnFocusTo) returnFocusTo.focus();
    });
  }

  /* ---------------------------------------------------------------
     Theme toggle
     --------------------------------------------------------------- */
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const syncThemeMeta = () => {
    if (themeMeta) themeMeta.content = root.dataset.theme === "dark" ? "#1a1917" : "#f3eee3";
  };
  syncThemeMeta();
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* storage unavailable */ }
    syncThemeMeta();
  });

  /* ---------------------------------------------------------------
     Mobile nav
     --------------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const setNav = (open) => {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", t(open ? "closeMenu" : "openMenu"));
  };
  navToggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  /* ---------------------------------------------------------------
     Language switcher (only shown when there's more than one language)
     --------------------------------------------------------------- */
  const codes = Object.keys(LANGS);
  const langSwitch = document.createElement("div");
  if (codes.length > 1) {
    langSwitch.className = "lang-switch";
    langSwitch.setAttribute("role", "group");
    langSwitch.innerHTML = codes
      .map((c) => `<button type="button" lang="${esc(c)}" data-lang="${esc(c)}" aria-label="${esc(LANGS[c].name || c)}" title="${esc(LANGS[c].name || c)}">${esc(LANGS[c].short || c.toUpperCase())}</button>`)
      .join("");
    document.querySelector(".nav-actions")?.prepend(langSwitch);
    langSwitch.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (btn && btn.dataset.lang !== lang) setLanguage(btn.dataset.lang, true);
    });
  }

  /* Misregistered "overprint" headings copy their own text for the offset layer */
  const syncOverprint = () =>
    document.querySelectorAll(".overprint").forEach((el) => { el.dataset.text = el.textContent.trim(); });

  function setLanguage(code, chosen) {
    lang = LANGS[code] ? code : DEFAULT_LANG;
    missing.clear();
    root.lang = lang;

    translatePage();
    renderProjects();
    setNav(nav.classList.contains("is-open"));
    syncOverprint();
    langSwitch.setAttribute("aria-label", t("language"));
    langSwitch.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    root.classList.remove("lang-pending");

    if (missing.size) console.info(`[lang] No "${lang}" translation for:\n  ${[...missing].join("\n  ")}`);

    // Remember the visitor's choice, and keep the address shareable (?lang=cy)
    if (chosen) {
      try { localStorage.setItem("lang", lang); } catch (e) { /* storage unavailable */ }
      try {
        const url = new URL(location.href);
        if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
        else url.searchParams.set("lang", lang);
        history.replaceState(null, "", url);
      } catch (e) { /* e.g. opened from a file */ }
    }
  }

  let startLang = null;
  try { startLang = new URLSearchParams(location.search).get("lang") || localStorage.getItem("lang"); } catch (e) { /* storage unavailable */ }
  setLanguage(startLang || DEFAULT_LANG, false);

  /* Analytics consent */
  const consentBanner = document.getElementById("cookie-consent");
  const consentSettings = document.getElementById("cookie-settings");
  const consentChoice = (granted) => {
    try { localStorage.setItem("analytics-consent", granted ? "granted" : "denied"); } catch (e) { /* storage unavailable */ }
    window.setAnalyticsConsent(granted);
    consentBanner.hidden = true;
    consentSettings.focus();
  };
  document.getElementById("accept-analytics").addEventListener("click", () => consentChoice(true));
  document.getElementById("reject-analytics").addEventListener("click", () => consentChoice(false));
  consentSettings.addEventListener("click", () => {
    consentBanner.hidden = false;
    document.getElementById("accept-analytics").focus();
  });
  try {
    if (localStorage.getItem("analytics-consent") !== "granted"
      && localStorage.getItem("analytics-consent") !== "denied") {
      consentBanner.hidden = false;
    }
  } catch (e) {
    consentBanner.hidden = false;
  }

  /* ---------------------------------------------------------------
     Highlight the nav link for the section in view
     --------------------------------------------------------------- */
  const navLinks = new Map(
    [...document.querySelectorAll('.nav-links a[href^="#"]')].map((a) => [a.getAttribute("href").slice(1), a]));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = navLinks.get(entry.target.id);
      if (link && entry.isIntersecting) {
        navLinks.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) sectionObserver.observe(s);
  });

  /* ---------------------------------------------------------------
     Reveal-on-scroll
     --------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* Footer year */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
