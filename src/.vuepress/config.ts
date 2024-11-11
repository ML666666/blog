import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "OPM",
      description: "OPEN YOUR MIND - Constant dropping wears the stone.",
    }
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
