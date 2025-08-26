export default defineAppConfig({
  docus: {
    title: '',  // Empty title to avoid text
    description: 'The premier public good NFT marketplace for Polkadot',
    
    // Social links (appear in header right)
    socials: {
      x: 'https://x.com/ChaoticApp',
      telegram: 'https://t.me/chaoticapp', 
      github: 'https://github.com/chaotic-nft'
    },
    
    // Header with logo, search, and social links
    header: {
      logo: {
        light: '/logo-dark.svg',  // Dark logo for light mode
        dark: '/logo-light.svg'   // Light logo for dark mode
      },
      title: '',  // Empty title
      showLinkIcon: true,
      search: true  // Enable search in middle
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