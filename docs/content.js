/* ============================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT
   ============================================================================

   Everything the site displays lives in this file. Replace the values inside
   the square brackets with your own information. Keep the quotes and commas.

   The site shows:
   • a hero at the top
   • about
   • projects (each title opens a side drawer)
   • writing
   • a small footer line

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
    description: "I am a 19 year old engineering student just building what i like :)",
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
     The description is shown in the list. The longDescription, media, tags,
     and links are shown when the title opens the side drawer.
     ----------------------------------------------------------------------- */
  projects: {
    items: [
      {
        title: "[PROJECT TITLE 01]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION SHOWN INSIDE THE DRAWER — THE PROBLEM, YOUR APPROACH, AND THE RESULT.]",

        // Tags shown in the list and the drawer.
        skills: ["[TAG 01]", "[TAG 02]", "[TAG 03]"],

        // Optional image or video. Put files in docs/assets/.
        // Example: media: "assets/project-01.jpg"
        media: "",

        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "visit project",
      },
      {
        title: "[PROJECT TITLE 02]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION SHOWN INSIDE THE DRAWER.]",
        skills: ["[TAG 01]", "[TAG 02]"],
        media: "",
        href: "[PROJECT LINK]",
        repo: "[REPOSITORY LINK]",
        linkLabel: "visit project",
      },
      {
        title: "[PROJECT TITLE 03]",
        year: "[YEAR]",
        description: "[SHORT DESCRIPTION FOR THE PROJECT LIST.]",
        longDescription: "[LONGER DESCRIPTION SHOWN INSIDE THE DRAWER.]",
        skills: ["[TAG 01]", "[TAG 02]"],
        media: "",
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

  /* -----------------------------------------------------------------------
     FOOTER
     ----------------------------------------------------------------------- */
  footer: {
    builtWith: "HTML · CSS · vanilla JS · no trackers",
    lastUpdated: "[MONTH YEAR]",
  },
};
