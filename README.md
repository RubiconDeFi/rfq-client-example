# RFQ System Testing Script

This repository contains a script for testing a client implementation of Rubicon's RFQ system for an arbitrary chain and token pair. It allows you to fetch price levels and submit orders through an RFQ contract. Please see `rfq-test.ts` for a detailed code example you can use to aid your implementation.

## Prerequisites

- Node.js
- Yarn package manager
- An environment file (`.env`) with the requisite variables

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/new-repo.git
   cd new-repo
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```plaintext
   API_KEY=your_api_key
   PRIVATE_KEY=your_private_key
   <CHAIN_ID>_JSON_RPC=https://your-json-rpc-url
   ```

   Replace `<CHAIN_ID>` with the appropriate chain ID, e.g., `42161_JSON_RPC` for Arbitrum, `8453_JSON_RPC` for Base, etc.

### Usage

Run the script with the following command:

```bash
yarn start <chainId> <buyToken> <sellToken> [price] [amount]
```

- `<chainId>`: The ID of the blockchain network (e.g., 42161 for Arbitrum).
- `<buyToken>`: The address of the token you want to buy.
- `<sellToken>`: The address of the token you want to sell.
- `[price]` (optional): The price of the token.
- `[amount]` (optional): The amount of the token you want to buy/sell.

#### Examples

- To fetch price levels for a trading pair:
  ```bash
  yarn start 42161 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
  ```

- To fetch price levels and submit an order (must uncomment the order submission block):
  ```bash
  yarn start 42161 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 3400 0.1
  ```

- Inverse:
  ```bash
  yarn start 42161 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 0.0003125 500
  ```