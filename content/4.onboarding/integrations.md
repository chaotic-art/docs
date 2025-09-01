---
title: 'Integration Guides'
description: 'Step-by-step guides for integrating Chaotic into your application or service'
navigation: true
---



## Quick Start Integration

### 1. Get API Access
```typescript
// Sign up at https://chaotic.xyz/developers
const apiKey = 'your-api-key';
const baseUrl = 'https://api.chaotic.xyz';
```

### 2. Install SDK
```bash
npm install @chaotic/sdk
# or
yarn add @chaotic/sdk
```

### 3. Initialize Client
```typescript
import { ChaoticSDK } from '@chaotic/sdk';

const chaotic = new ChaoticSDK({
  apiKey: 'your-api-key',
  network: 'polkadot', // or 'kusama'
  environment: 'production' // or 'testnet'
});
```

## Common Integration Patterns

### Portfolio Display Widget

**React Component:**
```tsx
import React, { useEffect, useState } from 'react';
import { ChaoticSDK } from '@chaotic/sdk';

interface NFTPortfolioProps {
  walletAddress: string;
}

export const NFTPortfolio: React.FC<NFTPortfolioProps> = ({ walletAddress }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const chaotic = new ChaoticSDK({ apiKey: process.env.CHAOTIC_API_KEY });
        const data = await chaotic.getUserPortfolio(walletAddress);
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [walletAddress]);

  if (loading) return <div>Loading portfolio...</div>;

  return (
    <div className="nft-portfolio">
      <h2>My NFT Collection ({portfolio.stats.totalItems} items)</h2>
      <div className="portfolio-stats">
        <div>Total Value: {portfolio.stats.portfolioValue} DOT</div>
        <div>Collections: {portfolio.collections.length}</div>
      </div>
      <div className="nft-grid">
        {portfolio.ownedItems.map(item => (
          <div key={item.id} className="nft-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.collection.name}</p>
            <div className="price">
              Purchase: {item.purchasePrice} DOT
              Current: {item.currentValue} DOT
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Collection Showcase

**Vue 3 Component:**
```vue
<template>
  <div class="collection-showcase">
    <div v-if="loading" class="loading">
      Loading collection...
    </div>
    <div v-else-if="collection" class="collection">
      <div class="collection-header">
        <img :src="collection.metadata.banner" alt="Banner" class="banner" />
        <div class="collection-info">
          <h1>{{ collection.name }}</h1>
          <p>{{ collection.description }}</p>
          <div class="stats">
            <span>{{ collection.stats.totalItems }} items</span>
            <span>Floor: {{ collection.stats.floorPrice }} DOT</span>
            <span>Volume: {{ collection.stats.totalVolume }} DOT</span>
          </div>
        </div>
      </div>
      <div class="items-grid">
        <div 
          v-for="item in collection.items" 
          :key="item.id"
          class="item-card"
          @click="viewItem(item)"
        >
          <img :src="item.image" :alt="item.name" />
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <div v-if="item.price" class="price">
              {{ item.price }} DOT
            </div>
            <div class="rarity">
              Rank #{{ item.rarity.rank }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChaoticSDK } from '@chaotic/sdk';

const props = defineProps<{
  collectionId: string;
}>();

const collection = ref(null);
const loading = ref(true);

const chaotic = new ChaoticSDK({
  apiKey: process.env.VITE_CHAOTIC_API_KEY
});

onMounted(async () => {
  try {
    const data = await chaotic.getCollection(props.collectionId);
    collection.value = data;
  } catch (error) {
    console.error('Failed to fetch collection:', error);
  } finally {
    loading.value = false;
  }
});

const viewItem = (item) => {
  // Navigate to item detail page
  window.open(`https://chaotic.xyz/nft/${item.collection.id}/${item.id}`, '_blank');
};
</script>
```

### Purchase Integration

**JavaScript Purchase Flow:**
```typescript
class ChaoticPurchaseFlow {
  private sdk: ChaoticSDK;
  
  constructor(apiKey: string) {
    this.sdk = new ChaoticSDK({ apiKey });
  }

  async purchaseNFT(collectionId: string, itemId: string, walletAddress: string) {
    try {
      // 1. Get NFT details and verify availability
      const nft = await this.sdk.getNFTItem(collectionId, itemId);
      if (!nft.listed) {
        throw new Error('NFT is not available for purchase');
      }

      // 2. Check user balance
      const balance = await this.sdk.getWalletBalance(walletAddress);
      if (balance.available < nft.price) {
        throw new Error('Insufficient balance');
      }

      // 3. Create purchase transaction
      const purchaseData = {
        collectionId,
        itemId,
        buyerAddress: walletAddress,
        maxPrice: nft.price * 1.05, // 5% slippage protection
        useAutoTeleport: true
      };

      // 4. Sign transaction (integrate with your wallet solution)
      const signature = await this.signPurchaseTransaction(purchaseData);

      // 5. Execute purchase
      const result = await this.sdk.purchaseNFT({
        ...purchaseData,
        signature
      });

      return {
        success: true,
        transactionHash: result.transactionHash,
        totalCost: result.totalCost
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  private async signPurchaseTransaction(data: any): Promise<string> {
    // Implement wallet signing logic here
    // This depends on your wallet integration (Polkadot.js, Talisman, etc.)
    throw new Error('Implement wallet signing');
  }
}
```

## Webhook Integration

### Setting Up Webhooks

**1. Configure Webhook Endpoint:**
```typescript
// Express.js webhook handler
app.post('/webhooks/chaotic', express.json(), (req, res) => {
  const { type, data, signature } = req.body;
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(req.body, signature, process.env.WEBHOOK_SECRET);
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Handle different event types
  switch (type) {
    case 'sale_completed':
      handleSaleCompleted(data);
      break;
    case 'new_listing':
      handleNewListing(data);
      break;
    case 'price_change':
      handlePriceChange(data);
      break;
    default:
      console.log('Unknown webhook event:', type);
  }

  res.status(200).send('OK');
});

function verifyWebhookSignature(body: any, signature: string, secret: string): boolean {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return `sha256=${expectedSignature}` === signature;
}
```

**2. Event Handlers:**
```typescript
function handleSaleCompleted(data: {
  collection_id: string;
  item_id: string;
  price: number;
  buyer: string;
  seller: string;
  transaction_hash: string;
}) {
  // Update your database
  // Send notifications
  // Update analytics
  console.log(`NFT sold: ${data.item_id} for ${data.price} DOT`);
}

function handleNewListing(data: {
  collection_id: string;
  item_id: string;
  price: number;
  seller: string;
}) {
  // Notify interested users
  // Update marketplace cache
  // Trigger price alerts
  console.log(`New listing: ${data.item_id} at ${data.price} DOT`);
}
```

## Discord Bot Integration

**NFT Floor Price Bot:**
```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import { ChaoticSDK } from '@chaotic/sdk';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const chaotic = new ChaoticSDK({ apiKey: process.env.CHAOTIC_API_KEY });

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!floor')) {
    const collectionName = message.content.split(' ').slice(1).join(' ');
    
    try {
      const collections = await chaotic.searchCollections({ query: collectionName });
      if (collections.length === 0) {
        message.reply('Collection not found!');
        return;
      }

      const collection = collections[0];
      const embed = {
        title: collection.name,
        description: collection.description,
        thumbnail: { url: collection.image },
        fields: [
          { name: 'Floor Price', value: `${collection.stats.floorPrice} DOT`, inline: true },
          { name: 'Total Volume', value: `${collection.stats.totalVolume} DOT`, inline: true },
          { name: 'Items', value: collection.stats.totalItems.toString(), inline: true }
        ],
        url: `https://chaotic.xyz/collection/${collection.id}`
      };

      message.reply({ embeds: [embed] });
    } catch (error) {
      message.reply('Error fetching collection data.');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
```

## Mobile App Integration

### React Native Example
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ChaoticSDK } from '@chaotic/sdk';

const NFTMarketplace = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const chaotic = new ChaoticSDK({
    apiKey: 'your-api-key'
  });

  useEffect(() => {
    loadFeaturedCollections();
  }, []);

  const loadFeaturedCollections = async () => {
    try {
      const data = await chaotic.getFeaturedCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to load collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCollection = (collection) => {
    // Navigate to collection screen
    // navigation.navigate('Collection', { collectionId: collection.id });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading collections...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Featured Collections
      </Text>
      {collections.map(collection => (
        <TouchableOpacity 
          key={collection.id}
          style={styles.collectionCard}
          onPress={() => openCollection(collection)}
        >
          <Image source={{ uri: collection.image }} style={styles.collectionImage} />
          <View style={styles.collectionInfo}>
            <Text style={styles.collectionName}>{collection.name}</Text>
            <Text style={styles.collectionStats}>
              Floor: {collection.stats.floorPrice} DOT
            </Text>
            <Text style={styles.collectionStats}>
              Volume: {collection.stats.totalVolume} DOT
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = {
  collectionCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  collectionImage: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  collectionInfo: {
    marginLeft: 12,
    flex: 1
  },
  collectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  collectionStats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2
  }
};
```

## Analytics Integration

### Track NFT Performance
```typescript
class ChaoticAnalytics {
  private sdk: ChaoticSDK;
  
  constructor(apiKey: string) {
    this.sdk = new ChaoticSDK({ apiKey });
  }

  async getCollectionAnalytics(collectionId: string, timeframe: '24h' | '7d' | '30d') {
    const collection = await this.sdk.getCollection(collectionId);
    const history = await this.sdk.getCollectionHistory(collectionId, timeframe);
    
    return {
      collection: collection.name,
      currentStats: {
        floorPrice: collection.stats.floorPrice,
        volume: collection.stats.totalVolume,
        holders: collection.stats.holders
      },
      historicalData: history.map(entry => ({
        date: entry.date,
        floorPrice: entry.floorPrice,
        volume: entry.volume,
        sales: entry.salesCount
      }))
    };
  }

  async getUserAnalytics(walletAddress: string) {
    const portfolio = await this.sdk.getUserPortfolio(walletAddress);
    
    return {
      portfolioValue: portfolio.stats.portfolioValue,
      totalSpent: portfolio.stats.totalSpent,
      profitLoss: portfolio.stats.portfolioValue - portfolio.stats.totalSpent,
      itemsOwned: portfolio.stats.totalItems,
      collectionsCount: portfolio.collections.length,
      topPerformers: portfolio.ownedItems
        .sort((a, b) => (b.currentValue - b.purchasePrice) - (a.currentValue - a.purchasePrice))
        .slice(0, 5)
    };
  }
}
```

## Testing Your Integration

### Unit Tests
```typescript
import { ChaoticSDK } from '@chaotic/sdk';

describe('Chaotic Integration Tests', () => {
  const sdk = new ChaoticSDK({
    apiKey: 'test-api-key',
    environment: 'testnet'
  });

  test('should fetch collection data', async () => {
    const collection = await sdk.getCollection('test-collection-id');
    expect(collection).toBeDefined();
    expect(collection.name).toBeTruthy();
    expect(collection.stats).toBeDefined();
  });

  test('should handle purchase flow', async () => {
    const mockPurchaseData = {
      collectionId: 'test-collection',
      itemId: 'test-item',
      buyerAddress: 'test-address',
      signature: 'test-signature'
    };

    const result = await sdk.purchaseNFT(mockPurchaseData);
    expect(result.success).toBe(true);
    expect(result.transactionHash).toBeTruthy();
  });
});
```

## Production Deployment

### Environment Configuration
```typescript
// config/production.ts
export const config = {
  chaotic: {
    apiKey: process.env.CHAOTIC_API_KEY,
    environment: 'production',
    webhookSecret: process.env.CHAOTIC_WEBHOOK_SECRET,
    rateLimit: {
      requests: 1000,
      window: 3600 // 1 hour
    }
  }
};
```

### Error Monitoring
```typescript
import { ChaoticSDK } from '@chaotic/sdk';

const sdk = new ChaoticSDK({
  apiKey: process.env.CHAOTIC_API_KEY,
  onError: (error, context) => {
    // Send to your error monitoring service
    console.error('Chaotic SDK Error:', error, context);
    
    // Sentry, Bugsnag, etc.
    Sentry.captureException(error, { extra: context });
  }
});
```

Ready to build your integration?

::u-button
---
to: https://chaotic.xyz/developers
color: primary
class: chaotic-btn
---
Get API Access
::

::u-button
---
to: https://github.com/chaotic-nft/integration-examples
color: neutral
variant: outline
---
View Examples on GitHub
::