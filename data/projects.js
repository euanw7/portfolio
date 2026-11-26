/* =====================================================================
   PROJECTS
   Each entry becomes a card in the Projects section; clicking a card
   opens the full details. No build step: save and refresh.

   FIELDS
   ------
   name        Project title.
   type        Short label, e.g. "Web App", "Game", "Dissertation".
   year        Year or any short label (e.g. "2024–25"), or null.
   accent      "orange" or "blue": the card's ink colour.
   image       Optional screenshot, e.g. "assets/projects/foo.png".
               Shown at the top of the card and in the details view.
               Landscape images around 16:10 fit best (e.g. 1600x1000);
               other shapes are cropped to fit. null for none.
               Paths are case-sensitive on GitHub Pages.
   video       Optional looping clip used instead of the image, e.g.
               "assets/projects/foo.mp4". Plays muted and on repeat
               while on screen, with a pause button. If you also set
               image, it's shown while the video loads and to visitors
               who've turned off animations. Keep clips short and small
               (ideally under 5 MB) and save them as MP4 (H.264).
   status      Optional. Set to "comingSoon" to show a Coming Soon
               banner instead of the project's image or video.
   imageAlt    Optional. Describes the image or video for screen
               readers. Defaults to "Screenshot of <name>" (or
               "Video of <name>").
   duotone     Optional. true prints the image or video in the accent
               ink (riso style) instead of full colour.
   summary     One or two sentences shown on the card.
   description Longer text shown in the details view.
   highlights  Bullet points shown in the details view.
   stack       Technologies used.
   links       Optional. Any of:
                 website  the live site, e.g. "https://example.com"
                 demo     a live demo or playable build
                 repo     source code
                 writeup  a blog post or write-up
               Leave out what you don't have. A website (or, failing
               that, a demo) also gets a "Visit site" / "Live demo"
               link right on the card; all links appear in the details.
               e.g. links: { website: "https://example.com", repo: "https://github.com/..." }
   ===================================================================== */

window.PROJECTS = [
  {
    name: "Coach Carys Website",
    type: "Website",
    year: 2026,
    company: "Freelance",
    accent: "orange",
    summary:
      "A modern website for a personal trainer, showcasing services and contact information.",
    description:
      "A freelance project for a personal trainer at a local gym. The website features a clean, modern design with easy navigation and responsive layout.",
    highlights: [
      "Modern, responsive design",
      "Easy navigation and user-friendly interface",
      "Showcase of services and pricing",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    // links: {website:"https://coachcarys.co.uk/"},
    image: "assets/projects/coach-carys-website.png",
    status: "comingSoon",
  },
  {
    name: "Charity Website",
    type: "Website",
    year: 2026,
    company: "Freelance",
    accent: "blue",
    summary:
      "A modern website for a local charity, showcasing services and contact information.",
    description:
      "A freelance project for a local charity. The website features a clean, modern design with easy navigation and responsive layout.",
    highlights: [
      "Modern, responsive design",
      "Easy navigation and user-friendly interface",
      "Showcase of services and pricing",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    // links: {website:"https://charity.co.uk/"},
    image: "assets/projects/charity-website.png",
    status: "comingSoon",
  },
  {
    name: "Concrete Barbers Website",
    type: "Website",
    year: 2026,
    company: "Freelance",
    accent: "orange",
    summary:
      "A modern website for a local barber shop, showcasing services and contact information.",
    description:
      "A freelance project for a local barber shop. The website features a clean, modern design with easy navigation and responsive layout.",
    highlights: [
      "Modern, responsive design",
      "Easy navigation and user-friendly interface",
      "Showcase of services and pricing",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    // links: {website:"https://concretebarbers.co.uk/"},
    image: "assets/projects/concrete-barbers-website.png",
    status: "comingSoon",
  },
  {
    name: "Draig360",
    type: "Web App",
    year: 2026,
    company: "Freelance",
    accent: "blue",
    image: null,
    summary:
      "A full-stack web application for construction companies, built to manage jobs, employees and materials.",
    description:
      "A freelance project based on my dissertation. ",
    highlights: [
      "Continued development.",
      "Live application with multiple customers.",
      "Control over warehouse stock and materials.",
      "End-to-end job lifecycle and quality management.",
      "Employee scheduling, time logging, and job assignment.",
      "Report exports to PDF and Excel.",
      "Customisable dashboards and analytics.",
      "Responsive design for mobile and tablet.",
      "User authentication and role-based access control.",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    links: {website:"https://draig360.co.uk/"},
    image: "assets/projects/draig360-landing-page.png",
  },
  {
    name: "Lunar Lander",
    type: "2D Game",
    year: 2026,
    company: "Personal",
    accent: "orange",
    image: null,
    summary:
      "A 2D lunar lander game developed in Unity.",
    description:
      "A 2D lunar lander game built in Unity where the player controls a spacecraft and can fly around a 2D environment of planets, moons, and asteroids. ",
    highlights: [
      "Custom-built gravity and physics-based flight mechanics",
      "Fuel management and boost power-ups",
      "Multiple planets, moons, and asteroids that orbit each other"
    ],
    stack: ["C#", "Unity"],
    video: "assets/projects/lunar-lander.mp4",
  },
  {
    name: "Detection Rule Generator",
    type: "Automation",
    year: 2025,
    company: "Stroomworks",
    accent: "blue",
    image: null,
    summary:
      "Python tooling that turns MITRE ATT&CK and SigmaHQ data into Stroom detection rules for Windows Event Logs.",
    description:
      "An independent project at Stroomworks. It combines and normalises threat intelligence from MITRE ATT&CK and SigmaHQ, then generates analytic rules that Stroom can deploy, so a broad range of malicious activity can be detected in Windows Event Logs.",
    highlights: [
      "Combines and normalises two threat-intelligence sources",
      "Automation scripts produce deployable detection rules",
      "Presented to the client and iterated on their feedback",
    ],
    stack: ["Python", "MITRE ATT&CK", "SigmaHQ", "Stroom"],
    links: {},
  },
  {
    name: "Site Management App",
    type: "Dissertation",
    year: 2025,
    accent: "orange",
    image: null,
    summary:
      "A full-stack web app that brought a construction company's scattered tools and manual processes into one platform.",
    description:
      "My dissertation: a custom web application for a local construction company. It consolidated several fragmented tools and manual processes into a centralised, user-friendly platform tailored to how the company works day to day, improving task coordination, data accuracy and overall efficiency.",
    highlights: [
      "End-to-end job lifecycle management",
      "Quality assurance tracking",
      "Employee scheduling and job assignment",
      "Time logging against specific projects",
      "Report exports to PDF and Excel",
    ],
    stack: ["Laravel", "MySQL", "Tailwind CSS"],
    links: {repo:"https://github.com/euanw7/site-manager"},
  },
  {
    name: "Game Compilation",
    type: "2D Games",
    year: 2025,
    company: "Personal",
    accent: "blue",
    image: null,
    summary:
      "A compilation of 2D games built in Unity.",
    description:
      "A collection of 2D games developed in Unity, showcasing various gameplay mechanics and design principles. Created as a personal project to refresh and expand my skills in game development.",
    highlights: [
      "A menu to select from a variety of 2D games",
      "Games include Pong, Snake, Breakout, and Flappy Bird clones",
      "Each game demonstrates different gameplay mechanics and design principles",
      "Each game has separate highscores and settings",
      "The Flappy Bird clone has a character customiser"
    ],
    stack: ["C#", "Unity"],
    video: "assets/projects/beginner-games.mp4",
  },
  {
    name: "Language Learning App",
    type: "Desktop App",
    year: 2025,
    company: "University",
    accent: "orange",
    image: null,
    summary:
      "A desktop application for language learning using a local AI model to generate conversations.",
    description:
      "Built in Python using Tkinter for the GUI and various packages for text to speech and natural language processing.",
    highlights: [
      "A desktop application for language learning",
      "Uses a local AI model to generate conversations",
      "Uses Google Text-to-Speech for audio output",
      "Uses Google Translate for translations.",
      "Supports any language supported by Google Translate",
      "Allows users to keep a dictionary of words and phrases they want to learn",
    ],
    stack: ["Python", "Tkinter"],
    image: "assets/projects/language-learning.png",
  },
  {
    name: "Stealth Side-Scroller",
    type: "2D Game",
    year: 2025,
    company: "University",
    accent: "blue",
    image: null,
    summary:
      "A 2D stealth-action game where enemy AI patrols, hunts for the player and fights back.",
    description:
      "Built in Unity with C# for a university module in video game development. The game has a custom-designed stealth system and enemy AI that responds dynamically to what the player does, making for engaging, challenging gameplay.",
    highlights: [
      "Custom-designed stealth system",
      "Enemy AI for player detection, patrolling and combat",
      "AI reacts dynamically to the player's actions",
    ],
    stack: ["C#", "Unity"],
    links: {repo:"https://github.com/euanw7/Night-Knight"},
    video: "assets/projects/stealth-side-scroller.mp4",
  },
  {
    name: "Web Chat App",
    type: "Web App",
    year: 2024,
    accent: "orange",
    image: null,
    summary:
      "A Laravel app where users post text and images, like and comment on each other's posts, and manage their profiles.",
    description:
      "A simple social chat application built with Laravel, covering the core building blocks of web development: routing, database integration and authentication.",
    highlights: [
      "Posts with text and images",
      "Likes and comments on other users' posts",
      "Profile management",
      "Routing, database integration and authentication",
    ],
    stack: ["PHP", "Laravel"],
    links: {},
  },
];
