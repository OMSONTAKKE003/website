/* ============================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT
   ============================================================================

   Everything the site displays lives in this file. Replace the values inside
   the square brackets with your own information. Keep the quotes and commas.
   Nothing here is sent anywhere: this is a static site with no backend.

   Rules of thumb:
   • Plain text only inside quotes. Use \n for a line break if you need one.
   • To add an item, copy an existing { ... } block and edit it.
   • To remove a section, set its array to [] (e.g. writing.items = []).
   • Links: replace the whole [SQUARE BRACKET] value with a real URL.
     Placeholder links are rendered as plain text instead of dead links.
   • Project skills should match names in skills.groups EXACTLY. The
     attention map uses these matches to connect projects to skills.
   • Save the file, refresh the page. No build step.

   TIP: search this file for "[SKILL 01]" and replace all occurrences at once
   to keep the project ↔ skill attention map working.
   ============================================================================ */

window.SITE_CONTENT = {
  /* -----------------------------------------------------------------------
     SITE METADATA
     Used for the browser tab, search results, and social previews.
     ----------------------------------------------------------------------- */
  meta: {
    name: "[YOUR NAME]",
    role: "[YOUR ROLE]",
    siteTitle: "[YOUR NAME] — [YOUR ROLE]",
    description: "[ONE SENTENCE ABOUT WHAT YOU DO AND WHO YOU HELP.]",
    location: "[CITY, COUNTRY]",
    availability: "[OPEN TO — e.g. full-time roles, freelance, collaborations]",
    // Used in the Contact section. Replace with your real address.
    email: "[YOUR EMAIL]",
    // Optional. Link to a PDF resume. Leave as a placeholder to hide the link.
    resumeUrl: "[LINK TO YOUR RESUME PDF]",
    // Your published GitHub Pages URL (used for social preview tags).
    siteUrl: "https://<username>.github.io/<repo>/",
  },

  /* -----------------------------------------------------------------------
     HERO — L0 · EMBEDDING
     The first screen. The headline is split into tokens automatically.
     ----------------------------------------------------------------------- */
  hero: {
    kicker: "L0 · EMBEDDING",
    headline: "[YOUR NAME]",
    // This line types itself out token by token. Keep it short.
    typedLine: "[I BUILD THINGS WITH MODELS, DATA, AND CARE.]",
    // A slightly longer introduction under the typed line.
    summary: "[TWO SENTENCES ABOUT YOUR WORK, YOUR FOCUS, AND WHAT YOU ARE LOOKING FOR.]",
    primaryCta: { label: "See the work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    status: "[CURRENTLY — e.g. building X, open to Y]",
    // Explains the temperature slider. Edit freely.
    temperatureNote: "Temperature changes how sharply the attention heatmap responds to your cursor.",
    panelLabel: "HEAD 03 · LAYER 02",
    panelCaption: "simulated self-attention · move your cursor",
    panelAxes: { x: "keys →", y: "queries ↓" },
    scrollCue: "scroll = forward pass",
  },

  /* -----------------------------------------------------------------------
     ABOUT — L1 · FEED-FORWARD
     ----------------------------------------------------------------------- */
  about: {
    kicker: "L1 · FEED-FORWARD",
    heading: "The human in the loop",
    // Add or remove paragraphs freely.
    paragraphs: [
      "[PARAGRAPH ONE — WHO YOU ARE, WHAT YOU WORK ON, AND WHAT YOU CARE ABOUT.]",
      "[PARAGRAPH TWO — HOW YOU GOT HERE, AND THE KIND OF PROBLEMS YOU LIKE.]",
      "[PARAGRAPH THREE — SOMETHING HUMAN: WHAT YOU DO OUTSIDE OF WORK.]",
    ],
    heading2: "Residual stream",
    // Small facts shown in the sidebar. Keep values short.
    facts: [
      { label: "Based in", value: "[CITY, COUNTRY]" },
      { label: "Focus", value: "[YOUR FOCUS AREA]" },
      { label: "Currently", value: "[WHAT YOU ARE DOING NOW]" },
      { label: "Off-screen", value: "[A HOBBY OR INTEREST]" },
    ],
    // Optional pull quote. Leave the text as a placeholder to hide the block.
    quote: "[A SHORT LINE YOU ACTUALLY SAY — OR DELETE THIS FIELD.]",
    quoteAttribution: "[YOUR NAME]",
  },

  /* -----------------------------------------------------------------------
     PROJECTS — L2 · ATTENTION
     Each project "attends to" the skills listed in `skills`. The first skill
     gets the strongest visual weight. Skill names must match skills.groups.
     ----------------------------------------------------------------------- */
  projects: {
    kicker: "L2 · ATTENTION",
    heading: "Selected work",
    intro: "[ONE OR TWO SENTENCES ABOUT THE THREAD CONNECTING THESE PROJECTS.]",
    attentionNote: "Select a project or a skill to trace the connections.",
    items: [
      {
        title: "[PROJECT TITLE 01]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION — THE PROBLEM, YOUR APPROACH, AND THE RESULT. TWO OR THREE SENTENCES MAX.]",
        // Order matters: the first skill is visualized as the strongest.
        skills: ["[SKILL 01]", "[SKILL 02]", "[SKILL 04]"],
        stack: ["[TECH 01]", "[TECH 02]", "[TECH 03]"],
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "View project",
        repoLabel: "Code",
        featured: true, // true = card spans the full width of the project grid
      },
      {
        title: "[PROJECT TITLE 02]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION — THE PROBLEM, YOUR APPROACH, AND THE RESULT.]",
        skills: ["[SKILL 02]", "[SKILL 03]", "[SKILL 05]", "[SKILL 06]"],
        stack: ["[TECH 01]", "[TECH 02]"],
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "View project",
        repoLabel: "Code",
        featured: false,
      },
      {
        title: "[PROJECT TITLE 03]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION — THE PROBLEM, YOUR APPROACH, AND THE RESULT.]",
        skills: ["[SKILL 01]", "[SKILL 04]", "[SKILL 07]"],
        stack: ["[TECH 02]", "[TECH 03]"],
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "View project",
        repoLabel: "Code",
        featured: false,
      },
      {
        title: "[PROJECT TITLE 04]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION — THE PROBLEM, YOUR APPROACH, AND THE RESULT.]",
        skills: ["[SKILL 03]", "[SKILL 05]", "[SKILL 08]"],
        stack: ["[TECH 01]", "[TECH 04]"],
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "View project",
        repoLabel: "Code",
        featured: false,
      },
    ],
  },

  /* -----------------------------------------------------------------------
     SKILLS — L3 · KEY / VALUE SPACE
     Group skills however you like. Project skill names must match these.
     ----------------------------------------------------------------------- */
  skills: {
    kicker: "L3 · KEY / VALUE",
    heading: "What I work with",
    intro: "[A SHORT SENTENCE ABOUT HOW YOU THINK ABOUT YOUR TOOLKIT.]",
    note: "Select a skill to see which projects attend to it.",
    groups: [
      {
        name: "Modeling",
        items: ["[SKILL 01]", "[SKILL 02]", "[SKILL 03]"],
      },
      {
        name: "Engineering",
        items: ["[SKILL 04]", "[SKILL 05]", "[SKILL 06]"],
      },
      {
        name: "Tools",
        items: ["[SKILL 07]", "[SKILL 08]"],
      },
    ],
  },

  /* -----------------------------------------------------------------------
     EXPERIENCE — L4 · RESIDUAL STREAM
     ----------------------------------------------------------------------- */
  experience: {
    kicker: "L4 · RESIDUAL",
    heading: "Experience",
    items: [
      {
        period: "[MONTH YEAR — PRESENT]",
        role: "[YOUR ROLE]",
        org: "[COMPANY / ORGANIZATION]",
        summary: "[ONE OR TWO SENTENCES ABOUT WHAT YOU DID AND WHAT CHANGED BECAUSE OF IT.]",
        tags: ["[TAG]", "[TAG]"],
      },
      {
        period: "[MONTH YEAR — MONTH YEAR]",
        role: "[YOUR ROLE]",
        org: "[COMPANY / ORGANIZATION]",
        summary: "[ONE OR TWO SENTENCES ABOUT THE WORK AND ITS IMPACT.]",
        tags: ["[TAG]", "[TAG]"],
      },
    ],
  },

  /* -----------------------------------------------------------------------
     EDUCATION
     ----------------------------------------------------------------------- */
  education: {
    heading: "Education",
    items: [
      {
        period: "[YEAR — YEAR]",
        role: "[DEGREE / PROGRAM]",
        org: "[SCHOOL / INSTITUTION]",
        summary: "[FOCUS AREA, THESIS, OR A LINE ABOUT WHAT YOU STUDIED.]",
      },
    ],
  },

  /* -----------------------------------------------------------------------
     WRITING — L5 · OUTPUT TOKENS  (optional)
     Set items: [] to hide this section and its nav link.
     ----------------------------------------------------------------------- */
  writing: {
    kicker: "L5 · OUTPUT",
    heading: "Writing",
    intro: "[A SHORT SENTENCE ABOUT WHAT YOU WRITE ABOUT.]",
    items: [
      {
        date: "[MONTH YEAR]",
        title: "[POST TITLE 01]",
        summary: "[ONE SENTENCE ABOUT THE POST.]",
        href: "[POST LINK]",
        label: "Read",
      },
      {
        date: "[MONTH YEAR]",
        title: "[POST TITLE 02]",
        summary: "[ONE SENTENCE ABOUT THE POST.]",
        href: "[POST LINK]",
        label: "Read",
      },
    ],
  },

  /* -----------------------------------------------------------------------
     CONTACT — L6 · OUTPUT / SOFTMAX
     ----------------------------------------------------------------------- */
  contact: {
    kicker: "L6 · OUTPUT",
    heading: "Let's build something",
    blurb: "[ONE OR TWO SENTENCES INVITING THE RIGHT KIND OF CONVERSATION. SAY WHAT YOU ARE OPEN TO.]",
    emailLabel: "Email",
    // Replace with your real email. This is used for the mailto link.
    email: "[YOUR EMAIL]",
    links: [
      { label: "GitHub", href: "[YOUR GITHUB URL]" },
      { label: "LinkedIn", href: "[YOUR LINKEDIN URL]" },
      { label: "X / Twitter", href: "[YOUR X URL]" },
      { label: "Résumé", href: "[LINK TO YOUR RESUME PDF]" },
    ],
    closing: "[A SHORT CLOSING LINE.]",
  },

  /* -----------------------------------------------------------------------
     FOOTER / MODEL CARD
     ----------------------------------------------------------------------- */
  footer: {
    // Muted metadata. Edit or remove entries.
    fields: [
      { label: "model", value: "[YOUR NAME]" },
      { label: "parameters", value: "[ONE HUMAN]" },
      { label: "context", value: "[CITY, COUNTRY]" },
      { label: "license", value: "[LICENSE — e.g. CC BY 4.0]" },
    ],
    builtWith: "HTML · CSS · vanilla JS · no trackers",
    lastUpdated: "[MONTH YEAR]",
  },
};
