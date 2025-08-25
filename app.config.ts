export default defineAppConfig({
  docus: {
    title: 'Chaotic Docs',
    description: 'The premier public good NFT marketplace for Polkadot',
    url: 'https://docs.chaotic.xyz',
    image: '/social-card.png',
    
    socials: {
      twitter: 'chaoticdotxyz',
      discord: {
        label: 'Discord',
        href: 'https://discord.gg/chaotic', // To be configured
        icon: 'simple-icons:discord'
      },
      telegram: {
        label: 'Telegram', 
        href: 'https://t.me/chaotic_nft', // To be configured
        icon: 'simple-icons:telegram'
      },
      github: 'chaotic-nft'
    },
    
    header: {
      logo: true,
      title: 'Chaotic 🌀',
      showLinkIcon: true,
      exclude: [],
      navigation: true
    },
    
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    
    main: {
      padded: true,
      fluid: false
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
        },
        {
          text: 'Developer API',
          href: 'https://api.chaotic.xyz'
        }
      ],
      iconLinks: [
        {
          label: 'Chaotic Marketplace',
          href: 'https://chaotic.xyz',
          icon: 'simple-icons:ethereum'
        },
        {
          label: 'GitHub',
          href: 'https://github.com/chaotic-nft',
          icon: 'simple-icons:github'
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