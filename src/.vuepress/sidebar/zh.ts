import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "node",
      icon: "laptop-code",
      prefix: "node/",
      link: "node/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
  ],
});
