export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/html2pdf.client.ts", "~/plugins/xlsx.js"]
});
