/* ============================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT
   ============================================================================

   Everything the site displays lives in this file. Replace the values inside
   the square brackets with your own information. Keep the quotes and commas.

   The site shows:
   • a hero at the top
   • about
   • projects (with optional images/videos)
   • writing

   Rules of thumb:
   • Plain text only inside quotes.
   • To add an item, copy an existing { ... } block and edit it.
   • Set writing.items to [] to hide the Writing section and its tab.
   • Links: replace the whole [SQUARE BRACKET] value with a real URL.
     Placeholder links are rendered as plain text instead of dead links.
   • Save the file, refresh the page. No build step.
   ============================================================================ */

window.SITE_CONTENT = {
  /* -----------------------------------------------------------------------
     SITE METADATA
     Used for the browser tab, search results, and social previews.
     ----------------------------------------------------------------------- */
  meta: {
    name: "Om Sontakke",
    role: "SY Extc",
    siteTitle: "Om Sontakke — SY Extc",
    description: "A Fellow :)",
    location: "Mumbai, India",

    // Optional small portrait beside the hero. Leave empty to hide it.
    // Put the file in docs/assets/ and use "assets/your-photo.jpg".
    avatar: "",
  },

  /* -----------------------------------------------------------------------
     HERO
     The first block at the top of the page.
     ----------------------------------------------------------------------- */
  hero: {
    // Large heading.
    headline: "Om Sontakke",
    // One line under the heading.
    typedLine: "I am a 19 year old engineering student just building what i like :)",
    // Optional second line. Leave empty to hide it.
    summary: "",
  },

  /* -----------------------------------------------------------------------
     ABOUT
     The photo is optional and appears below the paragraphs and facts,
     before Projects.
     ----------------------------------------------------------------------- */
  about: {
    // Add or remove paragraphs freely.
    paragraphs: [
      "[PARAGRAPH ONE — WHO YOU ARE, WHAT YOU WORK ON, AND WHAT YOU CARE ABOUT.]",
      "[PARAGRAPH TWO — HOW YOU GOT HERE, AND THE KIND OF PROBLEMS YOU LIKE.]",
      "[PARAGRAPH THREE — SOMETHING HUMAN: WHAT YOU DO OUTSIDE OF WORK.]",
    ],

    // Small facts shown under the paragraphs. Keep values short.
    facts: [
      { label: "Based in", value: "Mumbai, India" },
      { label: "Focus", value: "[YOUR FOCUS AREA]" },
      { label: "Currently", value: "[WHAT YOU ARE DOING NOW]" },
      { label: "Off-screen", value: "[A HOBBY OR INTEREST]" },
    ],

    // Your photo. Put the image in docs/assets/ and use a path like
    // "assets/me.jpg". Leave photo empty to hide it.
    // It is capped at 340px wide and keeps its aspect ratio.
    photo: "",
    photoAlt: "Portrait of Om Sontakke",
    photoCaption: "", // optional line under the photo
  },

  /* -----------------------------------------------------------------------
     PROJECTS
     Each item appears on projects.html. Add one or more images/videos to
     `media` and they are shown under the project title.
     ----------------------------------------------------------------------- */
  projects: {
    items: [
      {
        title: "[PROJECT TITLE 01]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION — THE PROBLEM, YOUR APPROACH, AND THE RESULT.]",

        // Tags shown under the description.
        skills: ["[TAG 01]", "[TAG 02]", "[TAG 03]"],

        // Put files in docs/assets/ and list them here. Images and
        // .mp4 / .webm / .ogg videos are supported.
        // Example: media: ["assets/project-01.jpg", "assets/demo.mp4"]
        media: [],
        mediaAlt: "Screenshot of [PROJECT TITLE 01]",
        mediaCaption: "", // optional line under the media

        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "visit project",
      },
      {
        title: "[PROJECT TITLE 02]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION.]",
        skills: ["[TAG 01]", "[TAG 02]"],
        media: [],
        mediaAlt: "Screenshot of [PROJECT TITLE 02]",
        mediaCaption: "",
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "visit project",
      },
      {
        title: "[PROJECT TITLE 03]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION.]",
        skills: ["[TAG 01]", "[TAG 02]"],
        media: [],
        mediaAlt: "Screenshot of [PROJECT TITLE 03]",
        mediaCaption: "",
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "visit project",
      },
    ],
  },

  /* -----------------------------------------------------------------------
     WRITING
     Set items: [] to hide this section and its tab.
     ----------------------------------------------------------------------- */
  writing: {
    items: [
      {
        date: "[MONTH YEAR]",
        title: "[POST TITLE 01]",
        summary: "[ONE SENTENCE ABOUT THE POST.]",
        href: "[POST LINK]",
      },
      {
        date: "[MONTH YEAR]",
        title: "[POST TITLE 02]",
        summary: "[ONE SENTENCE ABOUT THE POST.]",
        href: "[POST LINK]",
      },
    ],
  },
};
