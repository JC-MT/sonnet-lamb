import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://www.sonnetlamb.com",
  base: "/",
  adapter: netlify()
});
