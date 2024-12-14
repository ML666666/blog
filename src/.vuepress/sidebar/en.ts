import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "node",
      icon: "laptop-code",
      prefix: "node/",
      link: "node/",
      children: "structure",
    },
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
  ],
});
