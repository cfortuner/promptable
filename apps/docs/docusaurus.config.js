// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Promptable.js",
  tagline: "Create AI-first apps in Typescript",
  url: "https://promptable.ai",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
      },
    ],
  ],
  plugins: [
    async function myPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS, AutoPrefixer & CSSNano.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          if (process.env.NODE_ENV === "production") {
            postcssOptions.plugins.push(require("cssnano"));
          }
          return postcssOptions;
        },
      };
    },
  ],
  themeConfig: {
    navbar: {
      title: "Promptable",
      logo: {
        src: "img/promptable-icon.png",
        width: 32,
        srcDark: "img/promptable-icon.png",
      },
      items: [
        {
          to: "docs/introduction",
          label: "Docs",
        },
        {
          to: "docs/quickstart",
          label: "Quickstart",
        },
        {
          href: "https://github.com/cfortuner/promptable",
          position: "right",
          className: "header-social-link header-github-link",
          "aria-label": "GitHub",
        },
        {
          href: "https://twitter.com/promptableai",
          position: "right",
          className: "header-social-link header-twitter-link",
          "aria-label": "Twitter",
        },
        {
          href: "https://discord.gg/SYmACWTf6V",
          position: "right",
          className: "header-social-link header-discord-link",
          "aria-label": "Discord",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/SYmACWTf6V",
              className: "flex items-center",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/promptableai",
              className: "flex items-center",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/cfortuner/promptable",
              className: "flex items-center",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Colin Fortuner`,
    },

    metadata: [
      {
        content: "Build AI-first apps in Typescript with Promptable.js",
        name: "description",
      },
      {
        content: "Build AI-first apps in Typescript with Promptable.js",
        property: "og:description",
      },
      {
        content:
          "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        name: "robots",
      },
      { content: "width=device-width, initial-scale=1.0", name: "viewport" },
      { content: "@vercel", name: "twitter:site" },
      { content: "Promptable", name: "apple-mobile-web-app-title" },
      { content: "var(--geist-background)", name: "theme-color" },
      { content: "#000000", name: "msapplication-TileColor" },
    ],
  },
};

module.exports = config;
