import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Obsidian Docs",
  description: "Developer documentation for Obsidian",
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://obsidian-production.ams3.cdn.digitaloceanspaces.com/assets/favicon_ob.ico",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    logo: "https://obsidian-production.ams3.cdn.digitaloceanspaces.com/assets/Obsidian_Yellow_Logo_Beta.png",
    nav: [
      { text: "Obsidian Home", link: "https://obsidianlaunch.co" },
      { text: "Docs", link: "/" },
    ],
    sidebar: [
      {
        text: "Intro",
        items: [
          { text: "What is Obsidian?", link: "/what-is-obsidian" },
          { text: "Quickstart", link: "/quickstart" },
          { text: "Best Practices", link: "/best-practices" },
        ],
      },
      {
        text: "Setting up Obsidian",
        items: [
          { text: "REST API", link: "/guides/rest" },
          { text: "Segment Webhook", link: "/guides/segment" },
          { text: "Javascript", link: "/guides/languages/javascript" },
          { text: "Typescript", link: "/guides/languages/typescript" },
          { text: "Python", link: "/guides/languages/python" },
          { text: "Ruby on Rails", link: "/guides/languages/rails" },
          { text: "Golang", link: "/guides/languages/golang" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    footer: {
      message: "Obsidian",
      copyright: "Copyright © 2023-present Thursday Analytics Limited",
    },
  },
  sitemap: {
    hostname: "https://docs.obsidianlaunch.co",
  },
  cleanUrls: true,
});
