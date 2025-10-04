# EVM Toolchain

A TypeScript library for EVM blockchain interactions built with [viem](https://viem.sh). This toolchain provides primitives for working with tokens, contracts, and chain clients across multiple EVM networks.

## Primitives

### Token Primitives

The library provides a comprehensive token system with the following primitives:

#### `Token`

Standard ERC20 token implementation with full functionality:

- **Address validation** - Ensures valid contract addresses
- **Balance queries** - `balanceOf(address)` to get token balances
- **Allowance management** - `allowance()` and `approve()` for spending permissions
- **Infinite approval** - `approveInfinite()` for gas-efficient approvals
- **Metadata** - Symbol, name, decimals, and CAIP-10 token ID

#### `NativeCurrency`

Represents native blockchain currencies (ETH, BNB, etc.):

- **Multi-chain support** - Pre-configured for Arbitrum, Base, BSC, Fuse, and others
- **Balance queries** - Native balance checking via `getBalance()`
- **Address validation** - Validates native currency addresses

#### `WrappedNative`

Wrapped versions of native currencies (WETH, WBNB, etc.):

- **Chain-specific addresses** - Pre-configured wrapped token addresses per chain
- **ERC20 compatibility** - Full ERC20 functionality for wrapped tokens
- **Native currency reference** - Links back to the underlying native currency

#### `TokenAmount`

Represents a specific amount of any token type:

- **Type safety** - Ensures operations only on compatible tokens
- **Math operations** - `add()` and `sub()` with validation
- **Token validation** - Prevents operations on different token types

### Contract Primitives

#### `BaseContract`

Abstract base class for all contract interactions:

- **Address validation** - Ensures valid contract addresses
- **Chain client integration** - Provides access to viem clients
- **Account management** - Wallet and account access
- **Type safety** - TypeScript support for all operations

### Transaction Primitives

#### `Tx`

Simple transaction representation:

- **Hash tracking** - Transaction hash and chain ID
- **Chain identification** - Links transactions to specific chains

## Chain Client

The `ChainClientService` provides a unified interface for blockchain interactions:

### Features

- **Multi-chain support** - Manage multiple EVM chains simultaneously
- **Client caching** - Reuses clients for efficiency
- **Fallback RPC** - Automatic failover between RPC endpoints
- **Custom chains** - Support for custom blockchain configurations
- **Wallet integration** - Private key-based account management

### Configuration

The chain client supports flexible configuration through `ChainClientConfigService`:

```typescript
// RPC settings with fallback support
rpcSettings: {
  [chainId]: {
    rpcUrls: ["https://rpc-url.com", "alchemy"], // "alchemy" auto-builds Alchemy URLs
    disableDefaultRpcUrl: false
  }
}

// Custom chain definitions
customChains: [{
  chainId: 12345,
  defaultRpcUrl: "https://custom-rpc.com",
  chainName: "Custom Chain",
  nativeCurrency: {
    name: "Custom Token",
    symbol: "CUSTOM",
    decimals: 18
  }
}]
```

### Supported Chains

Pre-configured support for:

- **Arbitrum** - Mainnet and testnets
- **Base** - Coinbase's L2
- **BSC** - Binance Smart Chain
- **Fuse** - Fuse Network
- **Hemi** - Hemi Network
- **Lightlink Phoenix** - Lightlink testnet
- **Story** - Story Protocol
- **Swellchain** - Swell Network
- **Bob** - Bob Network
- **Gravity** - Gravity Chain

## CAIP Integration

The library implements Chain Agnostic Improvement Proposals:

- **CAIP-2** - Chain ID specification (`eip155:1`)
- **CAIP-10** - Token ID specification (`eip155:1:0x...`)
- **Validation** - Zod schemas for ID validation
- **Utilities** - Helper functions for ID generation and parsing

## Usage Example

```typescript
import { ChainClientService } from "./evm-chain-client"
import { Token, NativeCurrency, TokenAmount } from "./evm-primitives"

// Initialize chain client
const chainClient = new ChainClientService()

// Create token instances
const usdc = new Token(chainClient, "0x...", 1, {
	symbol: "USDC",
	name: "USD Coin",
	decimals: 6,
})

const eth = new NativeCurrency(chainClient, 1, {
	symbol: "ETH",
	name: "Ethereum",
	decimals: 18,
})

// Work with token amounts
const amount = new TokenAmount(chainClient, usdc, 1000000n) // 1 USDC
const balance = await usdc.balanceOf("0x...")
const allowance = await usdc.allowance("0x...", "0x...")
```

## Architecture

The library follows a modular architecture:

- **Primitives** - Core data structures and business logic
- **Chain Client** - Blockchain interaction layer
- **CAIP Integration** - Standardized identifier system
- **Utilities** - Helper functions and common operations

Built with [viem](https://viem.sh) for robust EVM interactions and TypeScript for type safety.
