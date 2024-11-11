import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "设计模式",
      icon: "laptop-code",
      prefix: "patterns/",
      link: "patterns/",
      children: "structure",
    },
    "intro",
  ],
});
