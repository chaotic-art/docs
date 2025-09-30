export default defineNuxtConfig({
  extends: ['docus'],

  // Import custom CSS
  css: ['~/assets/css/chaotic.css'],

  // Site configuration
  site: {
    name: ''  // Empty site name
  },

  // Build configuration
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        d1_databases: [
          {
            binding: "DB",
            database_name: "chaotic-docus",
            database_id: "f8bee687-8d89-4521-a415-cb04bf1e2208"
          }
        ]
      }
    },
  },

  // Development
  devtools: { enabled: true }
})