import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sonnetlamb.com",
  base: "/",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  adapter: netlify({
    imageCDN: false,
  }),
  prefetch: true,
  vite: {
    plugins: [
      tailwindcss({
        optimize: true,
      }),
    ],
    build: {
      cssMinify: true,
    },
  },
  integrations: [sitemap()],
});
