# CrepCrypt - A Decentralized Shoe Marketplace

## Inspiration

In recent years, online shoe marketplaces have faced numerous challenges that affect the confidence of both buyers and sellers. Issues such as the authenticity of shoes have left many customers frustrated and demanding refunds. The problem of dishonest product descriptions is equally troubling. Often, misleading pictures and descriptions result in buyer disappointment and seller hassles with returns. Additionally, the lack of information about the number of previous owners and the true extent of shoe usage leads to skepticism and devaluation.

We believe that blockchain technology can provide a better, more efficient solution to these problems. This is the motivation behind the creation of CrepCrypt, a decentralized shoe marketplace that utilizes NFTs and Chainlink functions to address these critical issues.

## What CrepCrypt Does

CrepCrypt allows users to list shoes for sale. Sellers are required to upload pictures of the shoes and provide accurate descriptions. These submissions are then verified by GPT4 Vision AI. If the AI confirms that the shoes are authentic and match the description provided, an NFT is generated, linked specifically to that pair of shoes. This process ensures that buyers can have confidence in the authenticity of their purchase. When buying the shoes, customers also acquire the corresponding NFT, adding an extra layer of security and trust to the transaction.

## Blockchain

### NFT Creation and Verification Process

By leveraging Chainlink Functions, the contract interfaces with GPT4 Vision AI for shoe authenticity checks. Upon verification, the system mints NFTs, each representing a pair of authenticated shoes. This process ensures the integration of real-world physical assets with their digital representations on the blockchain.

### Response Handling via `fulfillRequest()`

The `fulfillRequest()` function plays a pivotal role in processing responses from Chainlink oracles. It validates the uniqueness of each request ID and determines the appropriate action - minting a new NFT or reverting the NFT to its original owner - based on the response received.

### `listNFT()`

Allows users to list their shoes as NFTs. It involves validation of listing fees, token URI, and description, alongside initializing Chainlink Function requests for external verification.

### `unlistNft()` and `relistNft()`

These enable users to manage their NFT listings, encompassing updates to metadata and handling transaction fees.

### `buyNft()`

Manages NFT purchases, overseeing payments in both Ether and stablecoins. It includes integration with Chainlink's AggregatorV3Interface for real-time price data, essential for stablecoin transactions.

### `confirmSale()`

Orchestrates the sale confirmation process, securely transferring payments and NFT ownership, employing non-reentrant checks to prevent potential security vulnerabilities like re-entrancy attacks.

### Integration with Chainlink's AggregatorV3Interface

The AggregatorV3Interface is crucial for obtaining real-time ETH/USD price data. This integration ensures accurate pricing for transactions involving stablecoins, a key aspect for maintaining market stability and user trust.
