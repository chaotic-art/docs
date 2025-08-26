export default defineAppConfig({
  // Header configuration with logo
  header: {
    title: 'Chaotic Docs',
    logo: {
      alt: 'Chaotic',
      light: '/logo-light.svg',
      dark: '/logo-dark.svg'
    }
  },
  
  // Social links (appear in footer automatically)
  socials: {
    x: 'https://x.com/ChaoticApp',
    telegram: 'https://t.me/chaoticapp',
    github: 'https://github.com/chaotic-nft'
  },
  
  // GitHub configuration for edit links
  github: {
    url: 'https://github.com/chaotic-nft/docs',
    branch: 'main',
    rootDir: ''
  },
  
  // Table of contents with bottom links
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Community',
      links: [{
        icon: 'i-lucide-rocket',
        label: 'Chaotic Marketplace',
        to: 'https://chaotic.xyz',
        target: '_blank'
      }, {
        icon: 'i-lucide-code',
        label: 'Developer API', 
        to: 'https://api.chaotic.xyz',
        target: '_blank'
      }]
    }
  },
  
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'slate'
    }
  }
})