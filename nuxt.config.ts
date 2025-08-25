export default defineNuxtConfig({
  extends: ['docus'],
  
  // SEO
  seo: {
    siteName: 'Chaotic - NFT Marketplace for Polkadot',
    siteDescription: 'The premier public good NFT marketplace built on Polkadot. Experience lightning-fast trading, AI drops, and seamless cross-chain functionality.',
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