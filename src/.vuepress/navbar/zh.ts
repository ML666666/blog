import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    link: "/zh/",
    icon: "home",
  },
  {
    text: "node",
    link: "/zh/node/",
    icon: "laptop-code",
    activeMatch: "^/zh/node",
  },
  {
    text: "设计模式",
    link: "/zh/patterns/",
    icon: "code",
    activeMatch: "^/zh/patterns",
  },
  {
    text: "测试",
    link: "/zh/softwareTesting/",
    icon: "spell-check",
    activeMatch: "^/zh/softwareTesting",
  },
  {
    text: "杂项",
    link: "/zh/someThing/",
    icon: "layer-group",
    activeMatch: "^/zh/someThing",
  },
]);
