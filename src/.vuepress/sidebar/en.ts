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
      icon: "code",
      prefix: "patterns/",
      link: "patterns/",
      children: "structure",
    },
    {
      text: "软件测试",
      icon: "spell-check",
      prefix: "softwareTesting/",
      link: "softwareTesting/",
      children: "structure",
    },
    {
      text: "python",
      icon: "check",
      prefix: "python/",
      link: "python/",
      children: "structure",
    },
    {
      text: "杂项",
      icon: "layer-group",
      prefix: "someThing/",
      link: "someThing/",
      children: "structure",
    },
    "intro",
  ],
});
