export default defineAppConfig({
  // Social links
  socials: {
    x: 'https://x.com/ChaoticApp',
    telegram: 'https://t.me/chaoticapp', 
    github: 'https://github.com/chaotic-nft'
  },
  
  // Header - disable completely
  header: false,
  
  // Footer
  footer: {
    iconLinks: [
      {
        href: 'https://chaotic.xyz',
        icon: 'simple-icons:ethereum'
      }
    ]
  },
  
  ui: {
    colors: {
      primary: 'gray',
      neutral: 'gray'
    }
  }
})