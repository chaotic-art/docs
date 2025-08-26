export default defineAppConfig({
  docus: {
    title: 'Chaotic Docs',
    description: 'The premier public good NFT marketplace for Polkadot',
    image: '/social-card.png',
    
    // Social links
    socials: {
      x: 'https://x.com/ChaoticApp',
      telegram: 'https://t.me/chaoticapp', 
      github: 'https://github.com/chaotic-nft'
    },
    
    // GitHub configuration
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'docus',
      owner: 'nuxt-themes',
      edit: true
    },
    
    // Header with logo
    header: {
      logo: {
        light: '/logo-dark.svg',
        dark: '/logo-light.svg'
      },
      title: false
    },
    
    // Footer
    footer: {
      iconLinks: [
        {
          href: 'https://chaotic.xyz',
          icon: 'simple-icons:ethereum'
        }
      ]
    }
  },
  
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'slate'
    }
  }
})