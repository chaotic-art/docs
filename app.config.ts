export default defineAppConfig({
  docus: {
    title: 'Chaotic',
    description: 'The premier public good NFT marketplace for Polkadot',
    url: 'https://chaotic.xyz',
    image: '/social-card.png',
    
    socials: {
      twitter: 'chaoticdotxyz',
      discord: {
        label: 'Discord',
        href: '#', // To be configured
        icon: 'simple-icons:discord'
      },
      telegram: {
        label: 'Telegram',
        href: '#', // To be configured
        icon: 'simple-icons:telegram'
      },
      github: 'chaotic-nft'
    },
    
    header: {
      logo: true,
      title: 'Chaotic 🌀',
      showLinkIcon: true,
      exclude: []
    },
    
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev'
      },
      textLinks: [
        {
          text: 'Chaotic NFT Marketplace',
          href: 'https://chaotic.xyz'
        }
      ],
      iconLinks: [
        {
          label: 'Chaotic',
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