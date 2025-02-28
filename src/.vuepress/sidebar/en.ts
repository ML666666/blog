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
      text: "设计模式",
      icon: "laptop-code",
      prefix: "patterns/",
      link: "patterns/",
      children: "structure",
    },
    {
      text: "软件测试",
      icon: "laptop-code",
      prefix: "softwareTesting/",
      link: "softwareTesting/",
      children: "structure",
    },
    {
      text: "杂项",
      icon: "laptop-code",
      prefix: "someThing/",
      link: "someThing/",
      children: "structure",
    },
    "intro",
  ],
});
