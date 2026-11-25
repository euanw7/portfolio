/* =====================================================================
   CYMRAEG / WELSH
   Drafted by Claude: please check it (or have a fluent speaker check
   it) before relying on it.

   HOW TRANSLATIONS WORK
   ---------------------
   page      Text on the page. Each key matches a data-i18n="..." (or
             data-i18n-attr="attribute:...") in index.html. Values are
             HTML, so they can contain tags like <em>, and an "&" must be
             written as "&amp;". A list (like a set of bullet points) is
             an array, one string per item.
   months    Short month names, used for the dates in Experience.
   ui        Labels written by js/main.js. Same keys as lang/en.js.
   projects  Keyed by the project's English name in data/projects.js.
             Any field can be translated (name, type, summary,
             description, highlights, imageAlt...); anything left out
             stays in English. These are plain text, so "&" is just "&". If you rename a project in projects.js,
             rename its key here too.

   Anything missing falls back to English, and the browser console
   lists what's missing (press F12 to see it).

   ADDING ANOTHER LANGUAGE
   -----------------------
   1. Copy this file to lang/<code>.js, using the language's two-letter
      code (e.g. "ga" for Irish, "fr" for French).
   2. Change LANGUAGES.cy to LANGUAGES.<code>, set name and short, and
      translate the text.
   3. Add <script src="lang/<code>.js" defer></script> to index.html,
      after the other language files.
   ===================================================================== */

window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.cy = {
  name: "Cymraeg",
  short: "CY",
  // Short month names, January to December, for the dates in Experience
  months: ["Ion", "Chwef", "Maw", "Ebr", "Mai", "Meh", "Gorff", "Awst", "Medi", "Hyd", "Tach", "Rhag"],

  page: {
    "meta.title": "Euan Watkins — Peiriannydd Meddalwedd",
    "meta.description": "Euan Watkins, peiriannydd meddalwedd. CV, profiad, sgiliau a phrosiectau.",
    "skip": "Neidio i'r cynnwys",

    // Header
    "nav.label": "Prif ddewislen",
    "nav.about": "Amdanaf i",
    "nav.projects": "Prosiectau",
    "nav.experience": "Profiad",
    "nav.skills": "Sgiliau",
    "nav.contact": "Cysylltu",
    "nav.theme": "Newid y modd tywyll",

    // Hero
    "hero.statement": "yn <em>beiriannydd meddalwedd</em> yng Nghymru.",
    "hero.lede":
      "Graddedig Dosbarth Cyntaf mewn Peirianneg Meddalwedd o Brifysgol Abertawe, sydd bellach yn Ddatblygwr Meddalwedd Iau yn Stroomworks, yn gweithio ar Stroom, platfform dadansoddi data ar raddfa fawr.",
    "hero.download": "Lawrlwytho CV",
    "hero.projects": "Gweld prosiectau",
    "hero.elsewhere": "Mewn mannau eraill",
    "hero.email": "E-bost",

    // About
    "about.title": "Amdanaf i",
    "about.lead":
      "Rwy'n beiriannydd meddalwedd gyda sylfaen gadarn mewn rhaglennu gwrthrych-gyfeiriadol a phrofiad ymarferol o ddarparu cymwysiadau pentwr llawn, bwrdd gwaith a data.",
    "about.p1":
      "Rwyf wedi gweithio gyda C#, Java, Python a thechnolegau gwe modern, o apiau WPF sy'n rhedeg ar beiriannau gweithgynhyrchu yn Renishaw i system rheoli warws a adeiladwyd gyda React a Node.js. Rwy'n gyfforddus mewn timau Agile ac yn gweithio'n uniongyrchol gyda rhanddeiliaid, boed hynny'n arwain cyfarfodydd stand-up neu'n cyflwyno gwaith i gleient.",
    "about.p2":
      "Rwy'n cael fy ysgogi gan ddatrys problemau, dysgu parhaus, a chreu meddalwedd ddibynadwy sy'n hawdd ei chynnal ar gyfer gwaith sy'n hanfodol i fusnesau.",
    "about.basedIn": "Lleoliad",
    "about.basedInValue": "Caerffili, Cymru",
    "about.currently": "Ar hyn o bryd",
    "about.currentlyValue": "Datblygwr Meddalwedd Iau yn Stroomworks",
    "about.degree": "Gradd",
    "about.degreeValue": "BSc Peirianneg Meddalwedd, Dosbarth Cyntaf",
    "about.focus": "Ffocws",
    "about.focusValue": "Pentwr llawn, bwrdd gwaith a data",

    // Projects
    "projects.title": "Prosiectau",
    "projects.note": "Agorwch brosiect i weld y manylion.",

    // Experience
    "experience.title": "Profiad",
    "experience.now": "nawr",
    "experience.technologies": "Technolegau",

    "exp.stroomworks.role": "Datblygwr Meddalwedd Iau",
    "exp.stroomworks.org": "Stroomworks Ltd, Bryste",
    "exp.stroomworks.intro":
      "Gweithio ar Stroom, platfform dadansoddi data ar raddfa fawr a ddatblygwyd yn wreiddiol gan GCHQ.",
    "exp.stroomworks.points": [
      "Cynnal ac ehangu Stroom gan ddefnyddio Java a fframwaith gwe GWT.",
      "Cyflwyno prosiect Python annibynnol sy'n cynhyrchu rheolau dadansoddi Stroom drwy gyfuno a normaleiddio data o MITRE ATT&amp;CK a SigmaHQ, gan alluogi canfod ystod eang o weithgarwch maleisus mewn Logiau Digwyddiadau Windows.",
      "Dylunio ac adeiladu sgriptiau awtomeiddio sy'n troi setiau data gwybodaeth am fygythiadau yn rheolau canfod y gellir eu defnyddio.",
      "Cyflwyno gwaith technegol yn uniongyrchol i'r cleient, casglu adborth ac addasu'r gwaith i fodloni gofynion gweithredol.",
      "Gweithio mewn tîm Agile gyda chyfarfodydd stand-up dyddiol ac adolygiadau wythnosol, gan gyflawni i derfynau amser tynn a chadw ansawdd y cod a'r ddogfennaeth yn uchel.",
    ],

    "exp.tps.role": "Datblygwr Gwe Pentwr Llawn",
    "exp.tps.org": "Total Protective Solutions 360 Ltd, Caerffili",
    "exp.tps.intro": "Dylunio ac adeiladu system rheoli warws bwrpasol gyda rhanddeiliaid y cwmni.",
    "exp.tps.points": [
      "Darparu olrhain stoc, rheoli mynediad ar sail rôl, diweddariadau amser real ac archebu stoc yn ôl swydd.",
      "Adeiladu rhyngwyneb ymatebol, seiliedig ar gydrannau gyda React Hooks i gefnogi llifoedd gwaith effeithlon a hawdd eu defnyddio.",
      "Adeiladu APIs RESTful gyda chronfa ddata MySQL i reoli data stoc a defnyddwyr yn ddiogel.",
      "Datblygu nodweddion drwy adborth uniongyrchol gan randdeiliaid, gan reoli straeon defnyddwyr yn Jira.",
      "Cadw ansawdd y cod yn uchel drwy ddylunio modiwlaidd a rheoli fersiynau gyda Git a GitHub.",
    ],

    "exp.renishaw.role": "Peiriannydd Meddalwedd, Lleoliad Diwydiannol",
    "exp.renishaw.intro": "Blwyddyn mewn tîm peirianneg o chwech yn adeiladu cymwysiadau bwrdd gwaith WPF.",
    "exp.renishaw.points": [
      "Datblygu cymwysiadau bwrdd gwaith WPF gan ddefnyddio C#, XAML a phensaernïaeth MVVM.",
      "Cynnal a gwella dwy system fewnosodedig fyw sy'n rhedeg ar beiriannau gweithgynhyrchu, ar gyfer adrodd ar statws peiriannau a ffurfweddu cylchoedd gwaith.",
      "Cyd-ddatblygu rhaglen annibynnol ar gyfer rheoli trwyddedau, gan weithio'n agos gyda dylunwyr UX a pherchnogion cynnyrch.",
      "Cymryd rhan yng nghylch Scrum cyfan (stand-ups, cynllunio sbrintiau, adolygiadau a sesiynau ôl-sylliad) ac arwain y stand-up bob wythnos.",
      "Ymchwilio i fframweithiau gwe (Vue, React, Blazor) i gefnogi symud o'r bwrdd gwaith i'r we yn y dyfodol.",
    ],

    // Education
    "education.title": "Addysg",
    "edu.degree.title": "BSc Peirianneg Meddalwedd, Anrhydedd Dosbarth Cyntaf",
    "edu.degree.org": "Prifysgol Abertawe",
    "edu.degree.detail":
      "Modiwlau gorau: Rhaglennu Gemau Fideo (86%), Data Mawr a Dysgu Peirianyddol (85%), Datblygu Cymwysiadau Gwe (84%), Rhaglennu Gwrthrych-gyfeiriadol Uwch (79%).",
    "edu.alevels.title": "Safon Uwch",
    "edu.alevels.org": "Ysgol Gyfun Cwm Rhymni (Chweched Dosbarth)",
    "edu.alevels.detail": "4 Safon Uwch: 3 A* ac un A.",
    "edu.gcse.title": "TGAU",
    "edu.gcse.detail": "14 TGAU: 5 A*, 7 A, un B ac un C.",

    // Skills
    "skills.title": "Sgiliau",
    "skills.languages": "Ieithoedd",
    "skills.frameworks": "Fframweithiau",
    "skills.tools": "Data ac offer",
    "skills.ways": "Ffyrdd o weithio",
    "skills.waysList": [
      "Agile a Scrum",
      "Datrys problemau",
      "Dogfennaeth ac ansawdd cod",
      "Rheoli prosiectau ac amser",
      "Cydweithio a chyfathrebu",
      "Dysgu parhaus",
    ],

    // Contact and footer
    "contact.title": "Dywedwch helo",
    "contact.lead":
      "Boed yn swydd, yn brosiect neu'n gwestiwn am rywbeth ar y dudalen hon, byddwn yn falch o glywed gennych.",
    "footer.top": "Yn ôl i'r brig",

    // The CV the download buttons give. Leave these out to offer the English CV.
    "cv.file": "assets/cv-cy.pdf",
    "cv.filename": "Euan-Watkins-CV-Cymraeg.pdf",
    "dialog.close": "Cau",
  },

  ui: {
    language: "Iaith",
    openMenu: "Agor y ddewislen",
    closeMenu: "Cau'r ddewislen",

    readMore: "Darllen mwy",
    readMoreAbout: "am {name}",
    newTab: "yn agor mewn tab newydd",
    highlights: "Uchafbwyntiau",
    builtWith: "Adeiladwyd gyda",
    website: "Gweld y wefan",
    demo: "Demo byw",
    repo: "Cod ffynhonnell",
    writeup: "Erthygl",

    screenshotOf: "Sgrinlun o {name}",
    videoOf: "Fideo o {name}",
    playVideo: "Chwarae'r fideo",
    pauseVideo: "Oedi'r fideo",
  },

  projects: {
    "Draig360": {
      type: "Ap Gwe",
      summary:
        "Cymhwysiad gwe pentwr llawn i gwmnïau adeiladu, ar gyfer rheoli swyddi, gweithwyr a deunyddiau.",
      description: "Prosiect llawrydd sy'n seiliedig ar fy nhraethawd hir.",
      highlights: [
        "Cymhwysiad byw gyda nifer o gwsmeriaid.",
        "Rheolaeth dros stoc a deunyddiau'r warws.",
        "Rheoli cylch bywyd swyddi ac ansawdd o'r dechrau i'r diwedd.",
        "Amserlennu gweithwyr, cofnodi amser a neilltuo swyddi.",
        "Allforio adroddiadau i PDF ac Excel.",
        "Dangosfyrddau a dadansoddeg y gellir eu haddasu.",
        "Dyluniad ymatebol ar gyfer ffonau symudol a thabledi.",
        "Dilysu defnyddwyr a rheoli mynediad ar sail rôl.",
      ],
    },
    "Concrete Barbers Website": {
      name: "Gwefan Concrete Barbers",
      type: "Gwefan",
      summary:
        "Gwefan fodern i siop barbwr leol, yn arddangos ei gwasanaethau a'i manylion cyswllt.",
      description:
        "Prosiect llawrydd i siop barbwr leol. Mae gan y wefan ddyluniad glân a modern, gyda llywio hawdd a chynllun ymatebol.",
      highlights: [
        "Dyluniad modern ac ymatebol",
        "Llywio hawdd a rhyngwyneb hawdd ei ddefnyddio",
        "Arddangos gwasanaethau a phrisiau",
      ],
    },
    "Detection Rule Generator": {
      name: "Generadur Rheolau Canfod",
      type: "Awtomeiddio",
      summary:
        "Offer Python sy'n troi data MITRE ATT&CK a SigmaHQ yn rheolau canfod Stroom ar gyfer Logiau Digwyddiadau Windows.",
      description:
        "Prosiect annibynnol yn Stroomworks. Mae'n cyfuno ac yn normaleiddio gwybodaeth am fygythiadau o MITRE ATT&CK a SigmaHQ, yna'n cynhyrchu rheolau dadansoddi y gall Stroom eu defnyddio, fel bod modd canfod ystod eang o weithgarwch maleisus mewn Logiau Digwyddiadau Windows.",
      highlights: [
        "Cyfuno a normaleiddio dwy ffynhonnell o wybodaeth am fygythiadau",
        "Sgriptiau awtomeiddio sy'n cynhyrchu rheolau canfod y gellir eu defnyddio",
        "Cyflwyno i'r cleient a gwella'r gwaith yn ôl eu hadborth",
      ],
    },
    "Site Management App": {
      name: "Ap Rheoli Safleoedd",
      type: "Traethawd Hir",
      summary:
        "Ap gwe pentwr llawn a ddaeth ag offer gwasgaredig a phrosesau llaw cwmni adeiladu at ei gilydd mewn un platfform.",
      description:
        "Fy nhraethawd hir: cymhwysiad gwe pwrpasol i gwmni adeiladu lleol. Daeth â sawl offeryn tameidiog a phroses law ynghyd mewn platfform canolog a hawdd ei ddefnyddio, wedi'i deilwra i'r ffordd y mae'r cwmni'n gweithio o ddydd i ddydd, gan wella cydlynu tasgau, cywirdeb data ac effeithlonrwydd cyffredinol.",
      highlights: [
        "Rheoli cylch bywyd swyddi o'r dechrau i'r diwedd",
        "Olrhain sicrwydd ansawdd",
        "Amserlennu gweithwyr a neilltuo swyddi",
        "Cofnodi amser yn erbyn prosiectau penodol",
        "Allforio adroddiadau i PDF ac Excel",
      ],
    },
    "Stealth Side-Scroller": {
      name: "Gêm Sleifio Ochr-sgrolio",
      type: "Gêm 2D",
      summary:
        "Gêm sleifio a gweithredu 2D lle mae gelynion deallusrwydd artiffisial yn patrolio, yn hela'r chwaraewr ac yn ymladd yn ôl.",
      description:
        "Wedi'i hadeiladu yn Unity gyda C# ar gyfer modiwl prifysgol mewn datblygu gemau fideo. Mae gan y gêm system sleifio wedi'i dylunio'n arbennig a gelynion deallusrwydd artiffisial sy'n ymateb yn ddeinamig i'r hyn y mae'r chwaraewr yn ei wneud, gan greu gêm ddifyr a heriol.",
      highlights: [
        "System sleifio wedi'i dylunio'n arbennig",
        "Deallusrwydd artiffisial y gelynion ar gyfer canfod y chwaraewr, patrolio ac ymladd",
        "Mae'r deallusrwydd artiffisial yn ymateb yn ddeinamig i weithredoedd y chwaraewr",
      ],
    },
    "Web Chat App": {
      name: "Ap Sgwrsio Gwe",
      type: "Ap Gwe",
      summary:
        "Ap Laravel lle mae defnyddwyr yn postio testun a delweddau, yn hoffi ac yn ymateb i bostiadau ei gilydd, ac yn rheoli eu proffiliau.",
      description:
        "Ap sgwrsio cymdeithasol syml wedi'i adeiladu gyda Laravel, sy'n ymdrin â blociau adeiladu craidd datblygu gwe: llwybro, integreiddio cronfa ddata a dilysu.",
      highlights: [
        "Postiadau gyda thestun a delweddau",
        "Hoffi ac ymateb i bostiadau defnyddwyr eraill",
        "Rheoli proffiliau",
        "Llwybro, integreiddio cronfa ddata a dilysu",
      ],
    },
  },
};
