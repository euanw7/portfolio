/* =====================================================================
   ENGLISH (the default language)
   The English page text lives in index.html itself, so this file only
   holds the labels that js/main.js writes into the page: project card
   buttons, video controls and so on.

   Other languages copy this file's "ui" section and add a "page" and
   "projects" section too; see lang/cy.js.
   ===================================================================== */

window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.en = {
  name: "English", // shown to screen readers in the language switcher
  short: "EN",     // shown on the switcher button

  ui: {
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",

    // Project cards and details. {name} is replaced with the project's name.
    readMore: "Read more",
    readMoreAbout: "about {name}",
    newTab: "opens in a new tab",
    highlights: "Highlights",
    builtWith: "Built with",
    website: "Visit site",
    demo: "Live demo",
    repo: "Source code",
    writeup: "Write-up",

    // Images and videos
    screenshotOf: "Screenshot of {name}",
    videoOf: "Video of {name}",
    playVideo: "Play video",
    pauseVideo: "Pause video",
  },
};
