---
title: 'Technical Overview'
description: 'Deep dive into the technical architecture and APIs powering Chaotic'
navigation: true
---


Welcome to the technical heart of Chaotic. Here you'll find everything needed to understand, integrate with, or contribute to our platform.

## Architecture Overview

### System Design
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API    │    │   Blockchain    │
│   (Nuxt.js)     │◄──►│   (Node.js)      │◄──►│   (Substrate)   │
│                 │    │                  │    │                 │
│ • Vue 3         │    │ • GraphQL        │    │ • Asset Hub     │
│ • TypeScript    │    │ • REST API       │    │ • Polkadot.js   │
│ • Nuxt UI       │    │ • WebSockets     │    │ • XCM           │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                       ┌──────────────────┐
                       │   Data Layer     │
                       │                  │
                       │ • PostgreSQL     │
                       │ • Redis Cache    │
                       │ • IPFS Storage   │
                       └──────────────────┘
```

### Core Technologies

**Frontend Stack:**
- **Nuxt.js 4** - Full-stack Vue framework
- **Vue 3** - Reactive UI components  
- **TypeScript** - Type-safe development
- **Nuxt UI Pro** - Design system
- **Polkadot{.js}** - Blockchain integration

**Backend Infrastructure:**
- **Node.js** - Server runtime
- **GraphQL** - Flexible API layer
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Docker** - Containerization

**Blockchain Layer:**
- **Substrate** - Polkadot framework
- **Asset Hub** - Primary parachain
- **XCM** - Cross-chain messaging
- **ink!** - Smart contract language
- **PolkaVM** - Future smart contracts

## API Documentation

### GraphQL Endpoint
```
https://api.chaotic.xyz/graphql
```

### Authentication
```typescript
// JWT token authentication
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Core Queries

**Fetch NFT Collection:**
```graphql
query GetCollection($id: String!) {
  collection(id: $id) {
    id
    name
    description
    creator {
      address
      name
      verified
    }
    items {
      id
      name
      image
      price
      rarity
    }
    stats {
      totalItems
      floorPrice
      totalVolume
    }
  }
}
```

**User Portfolio:**
```graphql
query GetUserPortfolio($address: String!) {
  user(address: $address) {
    address
    collections {
      id
      name
      itemCount
    }
    ownedItems {
      id
      name
      collection {
        name
      }
      purchasePrice
      currentValue
    }
    stats {
      totalItems
      portfolioValue
      totalSpent
    }
  }
}
```

### Mutations

**Create Collection:**
```graphql
mutation CreateCollection($input: CollectionInput!) {
  createCollection(input: $input) {
    id
    transactionHash
    status
    estimatedFees {
      networkFee
      storageDeposit
    }
  }
}
```

**Purchase NFT:**
```graphql
mutation PurchaseNFT($collectionId: String!, $itemId: String!) {
  purchaseNFT(collectionId: $collectionId, itemId: $itemId) {
    success
    transactionHash
    autoTeleportUsed
    totalCost
    breakdown {
      itemPrice
      networkFees
      teleportFees
    }
  }
}
```

## REST API Endpoints

### Collections
```typescript
// GET /api/collections
interface CollectionsResponse {
  collections: Collection[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// GET /api/collections/:id
interface CollectionResponse {
  collection: Collection;
  items: NFTItem[];
  stats: CollectionStats;
}
```

### NFT Operations
```typescript
// GET /api/nfts/:collectionId/:itemId
interface NFTResponse {
  item: NFTItem;
  metadata: NFTMetadata;
  history: Transaction[];
  price: {
    current: number;
    currency: 'DOT';
  };
}

// POST /api/nfts/purchase
interface PurchaseRequest {
  collectionId: string;
  itemId: string;
  buyerAddress: string;
  signature: string;
}
```

### AI Generation
```typescript
// POST /api/ai/generate
interface AIGenerateRequest {
  prompt: string;
  model: 'dalle3' | 'midjourney' | 'stable-diffusion';
  style?: string;
  quality?: 'standard' | 'hd';
}

interface AIGenerateResponse {
  jobId: string;
  estimatedTime: number;
  cost: number; // in DOT
}

// GET /api/ai/job/:jobId
interface AIJobResponse {
  status: 'pending' | 'completed' | 'failed';
  images?: string[]; // IPFS hashes
  error?: string;
}
```

## Smart Contract Integration

### NFT Standard
```rust
// ink! smart contract interface
#[ink(message)]
pub fn mint(&mut self, to: AccountId, metadata: BoundedVec<u8>) -> Result<TokenId>;

#[ink(message)]
pub fn transfer(&mut self, to: AccountId, id: TokenId) -> Result<()>;

#[ink(message)]
pub fn approve(&mut self, spender: AccountId, id: TokenId) -> Result<()>;
```

### Marketplace Functions
```rust
#[ink(message)]
pub fn list_for_sale(&mut self, 
    collection: AccountId, 
    token_id: TokenId, 
    price: Balance
) -> Result<()>;

#[ink(message)]
pub fn purchase(&mut self, 
    collection: AccountId, 
    token_id: TokenId
) -> Result<()>;

#[ink(message)]
pub fn batch_purchase(&mut self, 
    items: Vec<(AccountId, TokenId)>
) -> Result<()>;
```

## SDK and Libraries

### JavaScript SDK
```bash
npm install @chaotic/sdk
```

```typescript
import { ChaoticSDK } from '@chaotic/sdk';

const chaotic = new ChaoticSDK({
  network: 'polkadot', // or 'kusama'
  apiKey: 'your-api-key'
});

// Fetch collection
const collection = await chaotic.getCollection('collection-id');

// Purchase NFT with auto-teleport
const result = await chaotic.purchaseNFT({
  collectionId: 'collection-id',
  itemId: 'item-id',
  useAutoTeleport: true
});
```

### Python SDK
```bash
pip install chaotic-python-sdk
```

```python
from chaotic import ChaoticClient

client = ChaoticClient(
    network='polkadot',
    api_key='your-api-key'
)

# Analytics and monitoring
portfolio = client.get_user_portfolio(address)
market_stats = client.get_market_stats()
```

## WebSocket Events

### Real-Time Updates
```typescript
const ws = new WebSocket('wss://api.chaotic.xyz/ws');

// Subscribe to collection updates
ws.send(JSON.stringify({
  type: 'subscribe',
  topic: 'collection:updates',
  collectionId: 'collection-id'
}));

// Listen for events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch(data.type) {
    case 'new_listing':
      // Handle new NFT listing
      break;
    case 'price_change':
      // Handle price update
      break;
    case 'sale_completed':
      // Handle successful sale
      break;
  }
};
```

### Event Types
- `new_listing` - New NFT listed for sale
- `price_change` - NFT price updated
- `sale_completed` - NFT purchased
- `collection_created` - New collection launched
- `ai_generation_complete` - AI NFT generation finished

## Performance & Monitoring

### Metrics Endpoints
```typescript
// GET /api/metrics/health
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'down';
  services: {
    api: boolean;
    database: boolean;
    blockchain: boolean;
    ipfs: boolean;
  };
  responseTime: number;
}

// GET /api/metrics/performance
interface PerformanceResponse {
  avgResponseTime: number;
  successRate: number;
  activeUsers: number;
  transactionVolume: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}
```

### Rate Limiting
```typescript
// Rate limits per API key
const rateLimits = {
  free: {
    requestsPerMinute: 60,
    requestsPerDay: 1000
  },
  pro: {
    requestsPerMinute: 300,
    requestsPerDay: 10000
  },
  enterprise: {
    requestsPerMinute: 1000,
    requestsPerDay: 100000
  }
};
```

Ready to start building?

::u-button
---
to: /technical/api-reference
color: primary
class: chaotic-btn
---
API Reference
::

::u-button
---
to: /technical/integrations
color: neutral
variant: outline
---
Integration Guides
::