export default defineAppConfig({
  // Social links
  socials: {
    x: 'https://x.com/ChaoticApp',
    telegram: 'https://t.me/chaoticapp', 
    github: 'https://github.com/chaotic-nft'
  },
  
  // GitHub link for header (this is what Docus looks for)
  github: {
    url: 'https://github.com/chaotic-nft'
  },
  
  // Header with logo, search, and social links  
  header: {
    logo: {
      light: '/logo-dark.svg',  // Dark logo for light mode
      dark: '/logo-light.svg',   // Light logo for dark mode
      alt: 'Chaotic Logo'
    },
    title: false,  // No title text
    showLinkIcon: true,
    search: true   // Enable search
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