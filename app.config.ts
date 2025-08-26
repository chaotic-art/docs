export default defineAppConfig({
  // Social links
  socials: {
    x: 'https://x.com/ChaoticApp',
    telegram: 'https://t.me/chaoticapp', 
    github: 'https://github.com/chaotic-nft'
  },
  
  // Header with logo only - NO title at all
  header: {
    logo: {
      alt: '',
      light: '/logo-icon.svg',
      dark: '/logo-icon-dark.svg'
    }
    // NO title property - completely removed
  },
  
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