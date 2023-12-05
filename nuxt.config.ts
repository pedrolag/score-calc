// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  plugins: [{ src: "~/plugins/vuedraggable.ts", ssr: false }],
});
