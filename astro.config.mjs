import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.sonnetlamb.com",
  base: "/",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
