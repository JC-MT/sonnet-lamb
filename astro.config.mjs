import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.sonnetlamb.com",
  base: "/",
  adapter: netlify({
    imageCDN: false,
  }),
  image: {
    domains: ["cdn.shopify.com"],
  },
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
});
