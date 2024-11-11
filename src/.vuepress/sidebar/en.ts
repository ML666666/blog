import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "node",
      icon: "blog",
      prefix: "node/",
      link: "node/",
      children: "structure",
    },
    {
      text: "设计模式",
      icon: "fire",
      prefix: "patterns/",
      link: "patterns/",
      children: "structure",
    },
    {
      text: "测试",
      icon: "pen-nib",
      prefix: "softwareTesting/",
      link: "softwareTesting/",
      children: "structure",
    },
    {
      text: "杂项",
      icon: "ghost",
      prefix: "someThing/",
      link: "someThing/",
      children: "structure",
    },
    {
      text: "关于我和这里",
      icon: "location-pin",
      link: "intro.md",
    },
  ],
});
