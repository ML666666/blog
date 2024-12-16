import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
    {
      text: "主页",
      link: "/",
      icon: "home",
    },
    {
      text: "node",
      link: "/node/",
      icon: "laptop-code",
      activeMatch: "^/node",
    },
    {
      text: "设计模式",
      link: "/patterns/",
      icon: "code",
      activeMatch: "^/patterns",
    },
    {
      text: "测试",
      link: "/softwareTesting/",
      icon: "spell-check",
      activeMatch: "^/softwareTesting",
    },
    {
      text: "杂项",
      link: "/someThing/",
      icon: "layer-group",
      activeMatch: "^/someThing",
    },
  ]);
