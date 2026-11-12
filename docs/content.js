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
    typedLine: "The only way out is through",
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
      "Hello !,I am Om ,a 19 year old engineering student working on language models and robotics",
      "Apart from work i like playing chess(terible at it) and travel."
    ],

    // Small facts shown under the paragraphs. Keep values short.
    facts: [
      { label: "Based in", value: "Mumbai, India" },
      { label: "Currently", value: "Working on language models and  intelligence" },
      { label: "Skill", value: "Python,Reinforcement learning,LLMs." },
    ],

    // Links shown under a horizontal line at the end of About.
    // Replace the placeholder URLs with your real profiles.
    connect: [
      { label: "email", href: "mailto:sontakkeom80@gmail.com" },
      { label: "github", href: "https://github.com/OMSONTAKKE003" },
      { label: "linkedin", href: "[LINKEDIN URL]" },
      { label: "x/twitter", href: "https://x.com/0mSontakke" },
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
        title: "Amazedex",
        year: "2026",
        description: "",
        longDescription: "Training a multi-fingered robotic hand to autonomously rotate a cube to any target orientation using deep reinforcement learning, on the Amazing Hand",

        // Tags shown under the description.
       

        // Put files in docs/assets/ and list them here. Images and
        // .mp4 / .webm / .ogg videos are supported.
        // Example: media: ["assets/project-01.jpg", "assets/demo.mp4"]
        media: [],
        mediaAlt: "Screenshot of [PROJECT TITLE 01]",
        mediaCaption: "", // optional line under the media

        repo: "https://github.com/OMSONTAKKE003/AmazeDex",
        linkLabel: "visit project",
      },
    ],
  },

  /* -----------------------------------------------------------------------
     WRITING
     Set items: [] to hide this section and its tab.
     ----------------------------------------------------------------------- */
  writing: {
    // Shown on writing.html while there are no posts.
    empty: "stay tuned :)",

    items: [],
  },
};
