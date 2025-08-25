---
title: 'Shopping Cart'
description: 'The first NFT marketplace with a proper shopping cart system - buy multiple NFTs in one transaction'
navigation: true
---

# Shopping Cart System 🛒

Finally! The feature every NFT trader has been waiting for - a **proper shopping cart** that lets you buy multiple NFTs in a single transaction.

## Why Shopping Cart Matters

### The Old Way (Painful)
❌ Buy one NFT at a time  
❌ Pay network fees for each purchase  
❌ Risk price changes between purchases  
❌ Slow and inefficient process  
❌ High total transaction costs  

### The Chaotic Way (Genius)
✅ **Add multiple NFTs** to your cart  
✅ **One transaction** for everything  
✅ **Lower total fees** via batch processing  
✅ **Lock prices** while shopping  
✅ **Bulk discount opportunities**  

## How It Works

### Adding Items to Cart

**From Collection View:**
1. Browse any collection
2. Click **"Add to Cart"** on NFTs you want
3. Continue shopping across different collections
4. Cart icon shows your item count

**From Individual NFT:**
1. View NFT details page
2. Click **"Add to Cart"** instead of "Buy Now"
3. Keep shopping or proceed to checkout
4. Items stay reserved for 30 minutes

### Smart Cart Features

**Price Locking** 🔒
- Prices locked for 30 minutes after adding
- Protected from seller price increases
- Automatic removal if price drops (you save money!)

**Cross-Collection Shopping** 🌐
- Mix NFTs from different creators
- Combine rare and common pieces
- Build themed collections in one purchase

**Bulk Discounts** 💰
- Some creators offer cart quantity discounts
- Automatic application at checkout
- Volume-based pricing tiers

## Checkout Process

### Review Your Cart

**Cart Summary:**
```
🛒 Your Cart (5 items)

🎨 Chaotic Degen #420 ............... 12.5 DOT
🎭 Pixel Art Warrior #88 ........... 8.0 DOT  
🌟 Abstract Dreams #303 ............ 15.2 DOT
🦄 Unicorn Series #777 ............. 25.0 DOT
🔥 Fire Element #169 ............... 6.8 DOT

Subtotal: 67.5 DOT
Network Fees: ~0.5 DOT
---
Total: 68.0 DOT

💡 You saved ~2.0 DOT in network fees!
```

### Payment Processing

**Batch Transaction:**
1. Click **"Buy All Items"**
2. Review final transaction details
3. Sign **one transaction** in your wallet
4. All NFTs transfer simultaneously
5. Receipt with all purchase details

**Auto-Teleport Integration:**
- System checks your balance across chains
- Automatically moves DOT where needed
- Handles cross-chain logistics
- You just click and wait for magic ✨

## Advanced Cart Features

### Save for Later
- **Wishlist functionality** for expensive items
- **Private collections** you're building
- **Share cart links** with friends
- **Export to spreadsheet** for tracking

### Price Alerts
- **Monitor cart total** price changes
- **Individual item** price drop notifications
- **Collection floor** price alerts
- **Smart buy recommendations**

### Bulk Actions
- **Remove all** from specific creator
- **Filter by price range** in cart
- **Sort by rarity** or other attributes
- **Quick add** from saved searches

## Technical Implementation

### Substrate Integration
```rust
// Batch NFT purchase transaction
let batch_call = vec![
    nft_call!(buy, collection_id_1, item_id_1),
    nft_call!(buy, collection_id_2, item_id_2), 
    nft_call!(buy, collection_id_3, item_id_3),
];

let batch_tx = api.tx.utility.batch_all(batch_call);
```

### Gas Optimization
- **Batched transactions** reduce per-item costs
- **Smart routing** for multi-chain purchases  
- **Fee prediction** shows costs upfront
- **Failed transaction handling** with partial refunds

## Cart Strategies

### For Collectors

**Theme Building:**
- Create cohesive collection themes
- Mix different price points
- Balance rare and common pieces
- Consider future value potential

**Budget Management:**
- Set cart value limits
- Use price alerts for expensive pieces
- Time purchases for market dips
- Track spending across collections

### For Traders

**Arbitrage Opportunities:**
- Quick bulk purchases of underpriced items
- Cross-collection value identification  
- Rapid response to market inefficiencies
- Batch flipping strategies

**Risk Management:**
- Diversify across multiple creators
- Balance high/low risk purchases
- Use price locks strategically
- Monitor cart value fluctuations

## Cart Analytics

### Personal Stats
- **Total cart value** over time
- **Average purchase size** trends
- **Favorite creators** by volume
- **Seasonal buying patterns**

### Market Insights
- **Popular cart combinations**
- **Bulk buying trends**
- **Cross-collection correlations**
- **Optimal purchase timing**

## Best Practices

### Efficient Shopping
✅ **Add liberally** - prices are locked  
✅ **Review regularly** - remove items you're unsure about  
✅ **Check totals** - ensure you have enough DOT  
✅ **Time purchases** - avoid high network congestion  

### Avoid These Mistakes
❌ **Letting cart expire** - items get released back to market  
❌ **Overfilling cart** - causes analysis paralysis  
❌ **Ignoring fees** - always include ~10% buffer  
❌ **FOMO adding** - stick to your strategy  

## Mobile Experience

### Cart on Mobile
- **Persistent cart** across devices
- **Push notifications** for price changes
- **Quick checkout** optimized for mobile
- **Offline cart viewing** (purchases require connection)

### Mobile-Specific Features
- **Swipe to remove** items
- **Voice search** for adding items
- **Camera scanning** QR codes for NFTs
- **Biometric checkout** confirmation

Ready to fill up your cart with chaos?

::u-button
---
to: https://chaotic.xyz
color: primary
class: chaotic-btn
---
Start Shopping
::

::u-button
---
to: /features/auto-teleport
color: neutral
variant: outline  
---
Learn About Auto-Teleport
::