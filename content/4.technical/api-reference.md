---
title: 'API Reference'
description: 'Complete API documentation for integrating with Chaotic marketplace'
navigation: true
---



## Base URLs

**Production:**
```
GraphQL: https://api.chaotic.xyz/graphql
REST: https://api.chaotic.xyz/api/v1
WebSocket: wss://api.chaotic.xyz/ws
```

**Testnet:**
```
GraphQL: https://testnet-api.chaotic.xyz/graphql
REST: https://testnet-api.chaotic.xyz/api/v1
WebSocket: wss://testnet-api.chaotic.xyz/ws
```

## Authentication

### API Key Authentication
```typescript
const headers = {
  'X-API-Key': 'your-api-key',
  'Content-Type': 'application/json'
};
```

### JWT Token Authentication
```typescript
const headers = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json'
};
```

### Wallet Signature Authentication
```typescript
// For wallet-based operations
const signature = await wallet.signMessage(message);
const headers = {
  'X-Wallet-Address': walletAddress,
  'X-Signature': signature,
  'X-Message': message
};
```

## GraphQL API

### Collections

#### Query: Get Collection
```graphql
query GetCollection($id: ID!, $limit: Int, $offset: Int) {
  collection(id: $id) {
    id
    name
    description
    symbol
    creator {
      address
      name
      verified
      avatar
    }
    metadata {
      image
      banner
      website
      social {
        twitter
        discord
        telegram
      }
    }
    items(limit: $limit, offset: $offset) {
      id
      name
      description
      image
      price
      currency
      rarity
      attributes {
        trait_type
        value
        rarity_percentage
      }
      owner {
        address
        name
      }
      listed
      createdAt
      updatedAt
    }
    stats {
      totalItems
      listedItems
      floorPrice
      totalVolume
      averagePrice
      holders
    }
  }
}
```

#### Query: Search Collections
```graphql
query SearchCollections(
  $query: String
  $category: String
  $sortBy: CollectionSortBy
  $limit: Int
  $offset: Int
) {
  searchCollections(
    query: $query
    category: $category
    sortBy: $sortBy
    limit: $limit
    offset: $offset
  ) {
    collections {
      id
      name
      description
      image
      creator {
        address
        name
        verified
      }
      stats {
        totalItems
        floorPrice
        totalVolume
      }
    }
    pagination {
      total
      limit
      offset
      hasNext
      hasPrev
    }
  }
}
```

#### Mutation: Create Collection
```graphql
mutation CreateCollection($input: CreateCollectionInput!) {
  createCollection(input: $input) {
    success
    collectionId
    transactionHash
    fees {
      networkFee
      storageDeposit
      totalCost
    }
    estimatedConfirmationTime
  }
}

# Input type
input CreateCollectionInput {
  name: String!
  description: String!
  symbol: String!
  maxItems: Int
  metadata: CollectionMetadataInput!
  royalties: [RoyaltyInput!]
  mintSettings: MintSettingsInput
}
```

### NFT Items

#### Query: Get NFT Item
```graphql
query GetNFTItem($collectionId: ID!, $itemId: ID!) {
  nftItem(collectionId: $collectionId, itemId: $itemId) {
    id
    name
    description
    image
    animationUrl
    price
    currency
    listed
    owner {
      address
      name
      avatar
    }
    creator {
      address
      name
      verified
    }
    collection {
      id
      name
      symbol
    }
    attributes {
      trait_type
      value
      display_type
      rarity_percentage
    }
    metadata {
      external_url
      background_color
      youtube_url
    }
    history {
      type
      from
      to
      price
      transactionHash
      timestamp
    }
    rarity {
      rank
      score
      total
    }
  }
}
```

#### Mutation: Purchase NFT
```graphql
mutation PurchaseNFT($input: PurchaseNFTInput!) {
  purchaseNFT(input: $input) {
    success
    transactionHash
    totalCost
    breakdown {
      itemPrice
      marketplaceFee
      networkFee
      teleportFee
    }
    autoTeleport {
      used
      fromChain
      toChain
      amount
    }
    estimatedConfirmationTime
  }
}

input PurchaseNFTInput {
  collectionId: ID!
  itemId: ID!
  buyerAddress: String!
  maxPrice: Float # Price protection
  useAutoTeleport: Boolean
  signature: String!
}
```

#### Mutation: Batch Purchase (Shopping Cart)
```graphql
mutation BatchPurchase($input: BatchPurchaseInput!) {
  batchPurchase(input: $input) {
    success
    transactionHash
    totalCost
    itemResults {
      collectionId
      itemId
      success
      error
      cost
    }
    savings {
      networkFees
      percentage
    }
  }
}

input BatchPurchaseInput {
  items: [PurchaseItemInput!]!
  buyerAddress: String!
  useAutoTeleport: Boolean
  signature: String!
}
```

### AI Generation

#### Mutation: Generate AI NFT
```graphql
mutation GenerateAINFT($input: AIGenerationInput!) {
  generateAINFT(input: $input) {
    jobId
    estimatedTime
    cost
    costBreakdown {
      generation
      storage
      minting
    }
  }
}

input AIGenerationInput {
  prompt: String!
  model: AIModel!
  style: String
  quality: AIQuality
  negativePrompt: String
  seed: Int
  steps: Int
  guidance: Float
}
```

#### Query: AI Generation Status
```graphql
query GetAIGenerationStatus($jobId: ID!) {
  aiGenerationJob(id: $jobId) {
    id
    status
    progress
    prompt
    model
    results {
      imageUrl
      ipfsHash
      metadata
    }
    error
    createdAt
    completedAt
  }
}
```

## REST API

### Collections Endpoints

#### GET /api/v1/collections
```typescript
interface CollectionsParams {
  page?: number;
  limit?: number;
  sort?: 'name' | 'created' | 'volume' | 'floor_price';
  order?: 'asc' | 'desc';
  category?: string;
  verified_only?: boolean;
}

interface CollectionsResponse {
  collections: Collection[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

#### GET /api/v1/collections/{id}
```typescript
interface CollectionResponse {
  collection: Collection;
  items: NFTItem[];
  stats: CollectionStats;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  symbol: string;
  image: string;
  banner?: string;
  creator: {
    address: string;
    name?: string;
    verified: boolean;
  };
  metadata: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
  created_at: string;
  updated_at: string;
}
```

#### POST /api/v1/collections
```typescript
interface CreateCollectionRequest {
  name: string;
  description: string;
  symbol: string;
  max_items?: number;
  metadata: {
    image: string;
    banner?: string;
    website?: string;
    social?: {
      twitter?: string;
      discord?: string;
      telegram?: string;
    };
  };
  royalties?: {
    recipient: string;
    percentage: number; // 0-10000 (basis points)
  }[];
}

interface CreateCollectionResponse {
  success: boolean;
  collection_id: string;
  transaction_hash: string;
  fees: {
    network_fee: number;
    storage_deposit: number;
    total_cost: number;
  };
}
```

### NFT Endpoints

#### GET /api/v1/nfts/{collectionId}/{itemId}
```typescript
interface NFTResponse {
  item: NFTItem;
  collection: Collection;
  owner: User;
  history: Transaction[];
}

interface NFTItem {
  id: string;
  name: string;
  description?: string;
  image: string;
  animation_url?: string;
  price?: number;
  currency: 'DOT' | 'KSM';
  listed: boolean;
  attributes: {
    trait_type: string;
    value: string | number;
    display_type?: string;
    rarity_percentage?: number;
  }[];
  rarity?: {
    rank: number;
    score: number;
    total: number;
  };
  created_at: string;
  updated_at: string;
}
```

#### POST /api/v1/nfts/purchase
```typescript
interface PurchaseRequest {
  collection_id: string;
  item_id: string;
  buyer_address: string;
  max_price?: number;
  use_auto_teleport?: boolean;
  signature: string;
  signed_message: string;
}

interface PurchaseResponse {
  success: boolean;
  transaction_hash: string;
  total_cost: number;
  breakdown: {
    item_price: number;
    marketplace_fee: number;
    network_fee: number;
    teleport_fee?: number;
  };
  auto_teleport?: {
    used: boolean;
    from_chain: string;
    to_chain: string;
    amount: number;
  };
}
```

#### POST /api/v1/nfts/batch-purchase
```typescript
interface BatchPurchaseRequest {
  items: {
    collection_id: string;
    item_id: string;
  }[];
  buyer_address: string;
  use_auto_teleport?: boolean;
  signature: string;
  signed_message: string;
}

interface BatchPurchaseResponse {
  success: boolean;
  transaction_hash: string;
  total_cost: number;
  items: {
    collection_id: string;
    item_id: string;
    success: boolean;
    cost?: number;
    error?: string;
  }[];
  savings: {
    network_fees_saved: number;
    percentage_saved: number;
  };
}
```

### User Endpoints

#### GET /api/v1/users/{address}
```typescript
interface UserResponse {
  user: {
    address: string;
    name?: string;
    avatar?: string;
    verified: boolean;
    bio?: string;
    social?: {
      twitter?: string;
      website?: string;
    };
    stats: {
      items_owned: number;
      collections_created: number;
      total_spent: number;
      total_earned: number;
      volume_traded: number;
    };
  };
  collections: Collection[];
  items: NFTItem[];
}
```

### Market Data Endpoints

#### GET /api/v1/market/stats
```typescript
interface MarketStatsResponse {
  total_volume: number;
  total_items: number;
  total_collections: number;
  active_users: number;
  average_price: number;
  volume_24h: number;
  volume_7d: number;
  volume_30d: number;
  top_collections: {
    collection: Collection;
    volume_24h: number;
    floor_price: number;
    change_24h: number;
  }[];
}
```

#### GET /api/v1/market/trending
```typescript
interface TrendingResponse {
  trending_collections: Collection[];
  trending_items: NFTItem[];
  price_movers: {
    item: NFTItem;
    price_change: number;
    percentage_change: number;
  }[];
}
```

## WebSocket Events

### Connection
```typescript
const ws = new WebSocket('wss://api.chaotic.xyz/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your-jwt-token' // or api-key
  }));
};
```

### Subscriptions
```typescript
// Subscribe to collection updates
ws.send(JSON.stringify({
  type: 'subscribe',
  topic: 'collection_updates',
  collection_id: 'collection-id'
}));

// Subscribe to user notifications
ws.send(JSON.stringify({
  type: 'subscribe',
  topic: 'user_notifications',
  user_address: 'user-address'
}));

// Subscribe to market data
ws.send(JSON.stringify({
  type: 'subscribe',
  topic: 'market_stats'
}));
```

### Event Types
```typescript
interface WebSocketEvent {
  type: 'new_listing' | 'price_change' | 'sale_completed' | 'collection_created' | 'ai_generation_complete' | 'market_update';
  data: any;
  timestamp: string;
}

// New listing event
interface NewListingEvent {
  type: 'new_listing';
  data: {
    collection_id: string;
    item_id: string;
    price: number;
    currency: string;
    seller: string;
  };
}

// Sale completed event
interface SaleCompletedEvent {
  type: 'sale_completed';
  data: {
    collection_id: string;
    item_id: string;
    price: number;
    buyer: string;
    seller: string;
    transaction_hash: string;
  };
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    request_id: string;
  };
}

// Example error responses
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient DOT balance for purchase",
    "details": {
      "required": 10.5,
      "available": 8.2,
      "currency": "DOT"
    },
    "request_id": "req_123456789"
  }
}
```

## Rate Limits

### Default Limits
```typescript
const rateLimits = {
  guest: {
    requests_per_minute: 30,
    requests_per_hour: 500
  },
  authenticated: {
    requests_per_minute: 100,
    requests_per_hour: 2000
  },
  premium: {
    requests_per_minute: 500,
    requests_per_hour: 10000
  }
};
```

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 60
```

Ready to integrate?

::u-button
---
to: /technical/integrations
color: primary
class: chaotic-btn
---
Integration Examples
::

::u-button
---
to: https://github.com/chaotic-nft/api-examples
color: neutral
variant: outline
---
Code Examples on GitHub
::