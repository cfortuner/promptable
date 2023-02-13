// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Promptable.js",
  tagline: "Create AI-first apps in Typescript",
  url: "https://promptable.ai",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "promptable", // Usually your GitHub org/user name.
  projectName: "promptable", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  clientModules: [require.resolve("./docusaurus.preferredTheme.js")],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: "https://github.com/bridge-codes/bridge/tree/main/www",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        // Not sure how reliable this path is (it's relative from the preset package)?
        // None of the light themes had good support for `diff` mode, so had to patch my own theme
        themes: ["nord"],
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-google-analytics",
      {
        trackingID: "UA-141789564-1",
        anonymizeIP: true,
      },
    ],

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
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    disableSwitch: true,
    respectPrefersColorScheme: false,
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
            // {
            //   label: "Blog",
            //   to: "/blog",
            //   className: "flex items-center",
            // },
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
      { content: "https://bridge.codes/twitter.png", name: "twitter:image" },
      { content: "https://bridge.codes/twitter.png", property: "og:image" },
      {
        content:
          "The Typescript API framework that enhances developer productivity",
        name: "description",
      },
      {
        content:
          "The Typescript API framework that enhances developer productivity",
        property: "og:description",
      },
      {
        content:
          "max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        name: "robots",
      },
      { content: "width=device-width, initial-scale=1.0", name: "viewport" },
      { content: "@vercel", name: "twitter:site" },
      { content: "Bridge", name: "apple-mobile-web-app-title" },
      { content: "var(--geist-background)", name: "theme-color" },
      { content: "#000000", name: "msapplication-TileColor" },
    ],
  },
};

module.exports = config;
