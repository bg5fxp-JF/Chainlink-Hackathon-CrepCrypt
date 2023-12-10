# CrepCrypt - A Decentralized Shoe Marketplace

[VIDEO PRESENTATION](https://youtu.be/kzF0t-_DLhk)

## Inspiration

In recent years, online shoe marketplaces have faced numerous challenges that affect the confidence of both buyers and sellers. Issues such as the authenticity of shoes have left many customers frustrated and demanding refunds. The problem of dishonest product descriptions is equally troubling. Often, misleading pictures and descriptions result in buyer disappointment and seller hassles with returns. Additionally, the lack of information about the number of previous owners and the true extent of shoe usage leads to skepticism and devaluation.

We believe that blockchain technology can provide a better, more efficient solution to these problems. This is the motivation behind the creation of CrepCrypt, a decentralized shoe marketplace that utilizes NFTs and Chainlink functions to address these critical issues.

## What CrepCrypt Does

CrepCrypt allows users to list shoes for sale. Sellers are required to upload pictures of the shoes and provide accurate descriptions. These submissions are then verified by GPT4 Vision AI. If the AI confirms that the shoes are authentic and match the description provided, an NFT is generated, linked specifically to that pair of shoes. This process ensures that buyers can have confidence in the authenticity of their purchase. When buying the shoes, customers also acquire the corresponding NFT, adding an extra layer of security and trust to the transaction.

## How we built it

### Blockchain

#### NFT Creation and Verification Process

By leveraging Chainlink Functions, the contract interfaces with GPT4 Vision AI for shoe authenticity checks. Upon verification, the system mints NFTs, each representing a pair of authenticated shoes. This process ensures the integration of real-world physical assets with their digital representations on the blockchain.

#### Response Handling via `fulfillRequest()`

The `fulfillRequest()` function plays a pivotal role in processing responses from Chainlink oracles. It validates the uniqueness of each request ID and determines the appropriate action - minting a new NFT or reverting the NFT to its original owner - based on the response received.

#### `listNFT()`

Allows users to list their shoes as NFTs. It involves validation of listing fees, token URI, and description, alongside initializing Chainlink Function requests for external verification.

#### `unlistNft()` and `relistNft()`

These enable users to manage their NFT listings, encompassing updates to metadata and handling transaction fees.

#### `buyNft()`

Manages NFT purchases, overseeing payments in both Ether and stablecoins. It includes integration with Chainlink's AggregatorV3Interface for real-time price data, essential for stablecoin transactions.

#### `confirmSale()`

Orchestrates the sale confirmation process, securely transferring payments and NFT ownership, employing non-reentrant checks to prevent potential security vulnerabilities like re-entrancy attacks.

#### Integration with Chainlink's AggregatorV3Interface

The AggregatorV3Interface is crucial for obtaining real-time ETH/USD price data. This integration ensures accurate pricing for transactions involving stablecoins, a key aspect for maintaining market stability and user trust.

### Front-End Development

For the front-end, we used Next.js and Tailwind CSS to create a sleek and responsive user interface. Next.js enabled us to build a server-side rendered application, which improved the performance and the user experience. Tailwind CSS was used for its utility-first approach, allowing us to rapidly style the application with low-level utility classes.

We integrated `wagmi.sh`, a set of React hooks for Ethereum, which streamlined the process of connecting the front-end to the Ethereum blockchain. This integration made it easier for users to interact with our smart contracts, manage their Ethereum wallets, and perform transactions with ease.

## Challenges we ran into

One major challenge was integrating GPT-4 Vision AI with our smart contract, ensuring seamless communication and data processing. Additionally, optimizing the contract for gas efficiency while maintaining robust security measures was a significant task.

## Accomplishments that we're proud of

We successfully created a smart contract that integrates advanced AI and oracle services, providing a real-world solution to the counterfeit shoe problem. Our contract is secure, efficient, and user-friendly, making it accessible to a broad audience.

## What we learned

This project deepened our understanding of smart contract development, particularly in integrating external APIs and AI technologies. We also gained valuable insights into the complexities of the shoe market and the potential for blockchain to provide solutions in this area.

## What's next for CrepCrypt

Moving forward, we plan to expand CrepCrypt's capabilities, including more advanced AI algorithms for better authentication and exploring partnerships with shoe brands and retailers. We are also looking into scaling the platform to support other types of luxury goods, further broadening our impact on the e-commerce market. Lastly, with the updates from OpenAI we'll be able to develop our own ChatGPT bot that can focus on the authentication of sneakers and all other luxury goods.
