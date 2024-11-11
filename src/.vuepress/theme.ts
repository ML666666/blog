import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",
  author: {
    name: "Mr.JackLi",
    // url: "https://mister-hope.com",
  },
  iconAssets: "fontawesome",
  logo: "/logo.svg",
  // repo: "https://gitee.com/ljj6666666666666/blog-of-output-optimization",
  docsDir: "src",
  blog: {
    avatar: "myAvatar.png",
    roundAvatar: true,
  },
  darkmode: 'toggle',
  fullscreen: true,
  pure: true,
  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Copyright © Open Your Mind",

      displayFooter: true,

      blog: {
        description: "A person who loves life",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navba
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "Copyright © Open Your Mind",

      displayFooter: true,

      blog: {
        description: "一个热爱生活的人",
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  plugins: {
    blog: true,
    photoSwipe: false,
    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      demo: true,
      echarts: false,
      figure: true,
      flowchart: false,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: false,
      mark: true,
      mermaid: false,
      playground: {
        presets: ["ts", "vue"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
