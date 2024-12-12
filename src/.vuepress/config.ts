import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "OPM",
      description: "OPEN YOUR MIND - Constant dropping wears the stone.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "OPM",
      description: "发散你的思维 - 滴水亦可穿石.",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
