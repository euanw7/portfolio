# portfolio

A static portfolio site (CV, experience, skills and projects) built for GitHub Pages.
It's plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Structure

```
index.html          Page content: hero, about, experience, skills, contact
data/projects.js    Project cards and their details
lang/               Translations: en.js (labels), cy.js (Welsh)
css/style.css       All styles (colour tokens at the top)
js/main.js          Behaviour (languages, project cards, details dialog, theme, nav)
assets/cv.pdf       Your CV, linked from the Download CV buttons
assets/cv-cy.pdf    Welsh CV, offered instead when the site is in Welsh
cv/cv.html          CV source (print it to PDF to update assets/cv.pdf)
cv/cv-cy.html       Welsh CV source (prints to assets/cv-cy.pdf)
cv/cv.css           Styles shared by both CVs
cv/private/         Git-ignored: CV copies with your phone number
assets/img/         Avatar / social preview images
assets/projects/    Project screenshots and videos
assets/favicon.svg  Browser tab icon
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Filling it in

1. **Text content**: edit `index.html`. Search for `TODO` (here and in `data/projects.js`)
   to find what's still left to fill in.
   - Experience and Education: copy a `<li class="entry">` block for each role or qualification.
   - Skills: edit the lists. Set `data-accent="solar"` (orange) or `"volt"` (blue) on a group to pick its colour.
   - The big name in the hero gets its orange "misprint" automatically, so just edit the text.
2. **CV**: the source is `cv/cv.html`, styled to match the site. To update the PDF, edit
   that file, open it in Chrome or Edge, and **Print → Save as PDF** with paper A4,
   margins None and **Background graphics** ticked. Save it over `assets/cv.pdf`.
   Visitors download it as `Euan-Watkins-CV.pdf` (set by the `download` attribute in `index.html`).
   - The Welsh CV works the same way: `cv/cv-cy.html` prints to `assets/cv-cy.pdf`. When you
     change one CV, change the other too. The site offers the Welsh one when Welsh is selected
     (set by `cv.file` and `cv.filename` in `lang/cy.js`).
   - The public CV has no phone number, because everything in this repo is public on
     GitHub Pages. For applications, add your number to the contact list (there's a
     comment showing where) and save that PDF in `cv/private/`, which is git-ignored.
3. **Projects**: edit `data/projects.js`. The comment at the top explains each field.
   - `accent`: `orange` or `blue`, the card's ink colour.
   - `image`: optional screenshot. Landscape images around 16:10 fit best.
   - `video`: optional looping clip (MP4) shown instead of the image; the image becomes its poster.
   - `duotone: true`: prints the image in the accent ink, like a riso print.
4. **Photo**: the hero shows your initials. To use a photo, put it at `assets/img/avatar.jpg`
   and follow the comment in `index.html` (search for `portrait`). It's printed in blue ink.
5. **Languages**: the site is in English, with Welsh as an option (the switcher in
   the header). English is the text in `index.html` and `data/projects.js`; other
   languages live in `lang/` (`lang/cy.js` for Welsh), keyed by the `data-i18n`
   attributes in `index.html` and by project name.
   - When you change English text, update the same key in `lang/cy.js`. Anything
     without a translation is shown in English, and the browser console (F12) lists
     what's missing.
   - To add a language, follow the steps at the top of `lang/cy.js`.
   - Visitors' choice is remembered, and links like `?lang=cy` open the site in Welsh.
6. **Colours**: change the tokens at the top of `css/style.css`. The site opens in the
   paper (light) theme; visitors can switch to dark with the toggle in the header.

## Previewing locally

Opening `index.html` directly works. A local server is closer to how GitHub Pages
serves the site:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
