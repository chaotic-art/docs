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
    prerender: {
      failOnError: false
    }
  },

  // Development
  devtools: { enabled: true }
})