//SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CrepCrypt is
    FunctionsClient,
    ERC721Enumerable,
    ConfirmedOwner,
    ReentrancyGuard
{
    using FunctionsRequest for FunctionsRequest.Request;

    event UnexpectedRequestID(bytes32 requestId);
    event ListingFailed(uint256 tokenId);
    event InvalidApiResponse(uint256 tokenId);
    event SaleApproved(uint256 tokenId);
    event SaleRejected(uint256 tokenId);
    event RequestFulfilled(bytes32 requestId, bytes response);
    event EmptyResponse(uint256 tokenId);

    // Price Feed Config
    AggregatorV3Interface internal dataFeed =
        AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // ETH USD Sepolia

    // Functions Config
    uint32 gasLimit = 300000;
    bytes32 donID =
        0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;
    uint64 subscriptionId = 1808;
    uint8 donHostedSecretsSlotID = 0;
    uint64 donHostedSecretsVersion = 1701968920;
    string internal source =
        "const openAIRequest = await Functions.makeHttpRequest({\n"
        "  url: 'https://api.openai.com/v1/chat/completions',\n"
        "  method: 'POST',\n"
        "  headers: {\n"
        "    'Content-Type': 'application/json',\n"
        "    'Authorization': `Bearer ${secrets.apiKey}`\n"
        "  },\n"
        "  data: {\n"
        "    'model': 'gpt-4-vision-preview',\n"
        "    'messages': [{\n"
        "      'role': 'user',\n"
        "      'content': [{\n"
        "          'type': 'text',\n"
        "          'text': 'I am sending you a picture of a ' + args[0] + '. Reply with ONLY '1' if the picture is a real ' + args[0] + ' reply with a 2 if this is not a ' + args[0]\n"
        "          },\n"
        "          {\n"
        "          'type': 'image_url',\n"
        "          'image_url': {\n"
        "              'url': args[1]\n"
        "          }\n"
        "      }]\n"
        "    }],\n"
        "    'max_tokens': 300\n"
        "  }\n"
        "});\n\n"
        "const response = openAIRequest.data.choices[0].message.content;\n\n"
        "console.log(response);\n\n"
        "return Functions.encodeUint256(Number(response));";

    // NFT Config
    // TODO: Think of how to set it price
    uint256 public constant fee = 0.1 ether;

    struct Sale {
        address buyer;
        address seller;
        bool buyerApproved;
    }

    mapping(uint256 tokenId => Sale) public sales;

    struct Redeemable {
        address token;
        uint256 amount;
        address payable recipient;
        bool claimed;
    }

    struct Metadata {
        // Price NFT owner wants to sell for
        uint256 price;
        // Number of previous owners
        uint256 previousOwners;
        // Functions request ID for latest listing request
        bytes32 lastReqId;
        // Current owner of NFT
        address currentOwner;
        // IPFS URI for NFT image
        string tokenURI;
        // Description of Shoe (e.g. Nike Air Force 1 Size 10)
        string description;
        Redeemable redeemable;
    }

    mapping(uint256 => Metadata) public metadata;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    mapping(address => bool) public mediators;

    constructor(
        address _router
    )
        FunctionsClient(_router)
        ERC721("CrepCrypt", "CC")
        ConfirmedOwner(msg.sender)
    {}

    function listNFT(
        uint256 price,
        string memory tokenURI,
        string memory description
    ) external payable {
        if (msg.value != fee) {
            revert("Fee is not correct");
        }
        if (bytes(tokenURI).length == 0) {
            revert("Token URI is not correct");
        }
        if (bytes(description).length == 0) {
            revert("Description is not correct");
        }
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);

        // Init args for ChatGPT req
        string[] memory args = new string[](2);
        args[0] = description;
        args[1] = tokenURI;

        req.setArgs(args);

        req.addDONHostedSecrets(
            donHostedSecretsSlotID,
            donHostedSecretsVersion
        );

        uint256 tokenId = totalSupply() + 1;

        Metadata memory tempData = Metadata({
            price: price,
            tokenURI: tokenURI,
            description: description,
            previousOwners: 0,
            lastReqId: 0x0,
            currentOwner: msg.sender,
            redeemable: Redeemable({
                token: address(0),
                amount: 0,
                recipient: payable(address(0)),
                claimed: false
            })
        });
        // Send request to Functions oracle
        bytes32 reqId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Store metada for NFT
        tempData.lastReqId = reqId;
        metadata[tokenId] = tempData;

        // Store request ID for NFT
        requestIdToTokenId[reqId] = tokenId;
    }

    /// @dev We don't revert in this function because we want to keep track of failed requests
    // and return the NFT tp the owner in certain cases
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory /*err*/
    ) internal override {
        uint256 tokenId = requestIdToTokenId[requestId];

        // Check if the request ID is valid
        if (tokenId == 0) {
            emit UnexpectedRequestID(requestId);
            return;
        }

        if (response.length == 0) {
            emit EmptyResponse(tokenId);
            return;
        }

        // Check if NFT exists
        bool exists = _ownerOf(tokenId) != address(0);

        /// @dev We expect our ChatGPT prompt to return
        // '1' if the request is successful
        // '2' if the request is unsuccessful
        // Anything else indicates and API error
        emit RequestFulfilled(requestId, response);
        uint256 responseCode = abi.decode(response, (uint256));

        // Check if the request was successful
        if (responseCode != 1) {
            if (responseCode == 2) emit InvalidApiResponse(tokenId);
            else emit ListingFailed(tokenId);

            // End early if the request failed
            return;
        }

        // Keep track of the previous owners
        metadata[tokenId].previousOwners += 1;

        // If the NFT doens't exist yet, mint it
        if (!exists) {
            // TODO: Integration test to check this doesn't exceed functions gas limit
            _mint(address(this), tokenId);
        }
    }

    function unlistNft(uint256 tokenId) external {
        Metadata memory tempData = metadata[tokenId];

        if (tempData.currentOwner != msg.sender) revert("Not the owner");
        if (tempData.redeemable.amount != 0) revert("NFT is already sold");

        // Transfer NFT back to owner
        transferFrom(address(this), tempData.currentOwner, tokenId);
    }

    function relistNft(
        uint256 tokenId,
        string memory newDescription,
        string memory newTokenURI
    ) external payable {
        Metadata memory tempData = metadata[tokenId];
        if (tempData.currentOwner != msg.sender) revert("Not the owner");
        if (msg.value != fee) {
            revert("Fee is not correct");
        }
        if (bytes(newDescription).length == 0) {
            revert("Description is not correct");
        }
        if (bytes(newTokenURI).length == 0) {
            revert("Token URI is not correct");
        }

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);

        // Init args for ChatGPT req
        string[] memory args = new string[](3);
        args[0] = newDescription;
        args[1] = tempData.tokenURI;
        args[2] = newTokenURI;

        req.setArgs(args);
        req.addDONHostedSecrets(
            donHostedSecretsSlotID,
            donHostedSecretsVersion
        );

        // Update description in metadata
        tempData.description = newDescription;

        // Transfer NFT to contract
        safeTransferFrom(msg.sender, address(this), tokenId);

        // Send request to Functions oracle
        bytes32 reqId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Store latest request ID for NFT
        tempData.lastReqId = reqId;

        // Store metadata for NFT
        metadata[tokenId] = tempData;

        // Store request ID for NFT
        requestIdToTokenId[reqId] = tokenId;
    }

    // Buy NFTs
    function buyNft(
        uint256 tokenId,
        address token,
        uint256 amount
    ) external payable {
        bool ethPayment = msg.value > 0;

        Metadata memory tempData = metadata[tokenId];
        Redeemable memory tempRedeemable;

        // Check the user has supplied sufficient payment
        if (ethPayment) {
            require(msg.value == tempData.price);
            tempRedeemable = Redeemable({
                token: address(0),
                amount: tempData.price + fee,
                recipient: payable(address(0)),
                claimed: false
            });
        } else {
            require(token != address(0));
            require(amount != 0);

            // Get latest price of ETH in USD
            (, int256 ethPrice, , , ) = dataFeed.latestRoundData();

            // Calculate how much Stablecoin is needed to buy the NFT
            /// @dev All x/USD pairs have 8 decimals in Chainlink Data Feeds
            // also assumes 18 decimals for Stablecoin
            uint256 stablecoinPrice = (tempData.price * 1e10) /
                uint256(ethPrice);

            tempRedeemable = Redeemable({
                token: token,
                amount: stablecoinPrice + fee,
                recipient: payable(address(0)),
                claimed: false
            });

            // Transfer Stablecoin from buyer to contract
            require(
                IERC20(token).transferFrom(
                    msg.sender,
                    address(this),
                    stablecoinPrice
                )
            );
        }

        // Create sale
        sales[tokenId] = Sale({
            buyer: msg.sender,
            seller: tempData.currentOwner,
            buyerApproved: false
        });

        // Store updated metadata
        tempData.redeemable = tempRedeemable;

        metadata[tokenId] = tempData;
    }

    function confirmSale(uint256 tokenId, bool approval) external nonReentrant {
        Sale memory tempSale = sales[tokenId];

        if (tempSale.buyer != msg.sender) revert("Not the buyer");

        tempSale.buyerApproved = approval;
        sales[tokenId] = tempSale;

        if (approval) {
            // Assign seller as recipient of payment
            metadata[tokenId].redeemable.recipient = payable(tempSale.seller);

            // Transfer NFT to buyer
            safeTransferFrom(address(this), msg.sender, tokenId);

            emit SaleApproved(tokenId);
        } else {
            emit SaleRejected(tokenId);
        }
    }

    // Called using Chainlink Automation, or manually
    function sellerClaim(uint256 tokenId) external {
        Metadata memory tempData = metadata[tokenId];

        address recipient = tempData.redeemable.recipient;
        if (tempData.redeemable.amount == 0) revert("NFT is not sold");
        if (tempData.redeemable.claimed) revert("Already claimed");

        tempData.redeemable.claimed = true;
        metadata[tokenId] = tempData;

        /// Transfer payment to seller
        if (tempData.redeemable.token == address(0)) {
            (bool success, ) = payable(recipient).call{
                value: tempData.redeemable.amount
            }("");
            if (!success) revert("unsuccessful payment");
        } else {
            require(
                IERC20(tempData.redeemable.token).transfer(
                    recipient,
                    tempData.redeemable.amount
                )
            );
        }
    }

    function finaliseSale(uint256 tokenId, bool status) external onlyMediators {
        Sale memory tempSale = sales[tokenId];

        if (tempSale.buyerApproved) revert("Sale already confirmed");

        if (status) {
            // Assign seller as recipient of payment
            metadata[tokenId].redeemable.recipient = payable(tempSale.seller);

            // Transfer NFT to buyer
            safeTransferFrom(address(this), tempSale.buyer, tokenId);

            emit SaleApproved(tokenId);
        } else {
            // Transfer NFT back to seller
            safeTransferFrom(address(this), tempSale.seller, tokenId);

            emit SaleRejected(tokenId);
        }
    }

    /// @dev requires tokenId owner to approve this contract
    function retryListing(uint256 tokenId) external {
        Metadata memory tempData = metadata[tokenId];

        // Ensure the NFT exists
        if (tempData.currentOwner == address(0))
            revert("TokenID does not exist");

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);

        // Init args for ChatGPT req
        string[] memory args = new string[](2);
        args[0] = tempData.description;
        args[1] = tempData.tokenURI;

        req.setArgs(args);
        req.addDONHostedSecrets(
            donHostedSecretsSlotID,
            donHostedSecretsVersion
        );

        // Send request to Functions oracle
        bytes32 reqId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Store latest request ID for NFT
        tempData.lastReqId = reqId;

        // Store metadata for NFT
        metadata[tokenId] = tempData;

        // Store request ID for NFT
        requestIdToTokenId[reqId] = tokenId;
    }

    function setMediator(address mediator, bool status) external onlyOwner {
        mediators[mediator] = status;
    }

    modifier onlyMediators() {
        require(msg.sender == owner() || mediators[msg.sender]);
        _;
    }
}
