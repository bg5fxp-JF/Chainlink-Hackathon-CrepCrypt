pragma solidity 0.8.21;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CrepCrypt is FunctionsClient, ERC721Enumerable, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    event UnexpectedRequestID(bytes32 requestId);
    event ListingFailed(uint256 tokenId);

    /**
        Functions Config
     */
    //Callback gas limit
    uint32 gasLimit = 300000;
    bytes32 donID;
    uint64 subscriptionId;

    // TODO: Think of how to set it price
    uint256 public constant fee = 0.1 ether;

    string sourceCode = "";

    struct Metadata {
        uint256 price;
        string tokenURI;
        string description;
        string name;
        string size;
        uint256 previousOwners;
        bytes32 lastReqId;
        address currentOwner;
    }

    mapping(uint256 => Metadata) public metadata;
    mapping(bytes32 => uint256) public requestIdToTokenId;

    address nft;

    constructor(
        address _router,
        bytes32 _donID,
        uint64 _subscriptionId,
        address _nft
    )
        FunctionsClient(_router)
        ERC721("CrepCrypt", "CC")
        ConfirmedOwner(msg.sender)
    {
        donID = _donID;
        subscriptionId = _subscriptionId;
        nft = _nft;
    }

    function listNFT(
        uint256 price,
        string memory tokenURI,
        string memory description,
        string memory name,
        string memory size
    ) external payable {
        if (msg.value != fee) {
            revert("Fee is not correct");
        }
        if (bytes(tokenURI).length == 0) {
            revert("Token URI is not correct");
        }
        if (bytes(name).length == 0) {
            revert("Name is not correct");
        }
        if (bytes(description).length == 0) {
            revert("Description is not correct");
        }
        if (bytes(size).length == 0) {
            revert("Size is not correct");
        }

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(sourceCode);

        // Init args for ChatGPT req
        string[] memory args = new string[](3);
        args[0] = tokenURI;
        args[1] = description;
        args[2] = name;

        uint256 tokenId = totalSupply() + 1;

        Metadata memory tempData = Metadata({
            price: price,
            tokenURI: tokenURI,
            description: description,
            name: name,
            size: size,
            previousOwners: 0,
            lastReqId: 0x0,
            currentOwner: msg.sender
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

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory /*err*/
    ) internal override {
        uint256 tokenId = requestIdToTokenId[requestId];

        if (tokenId == 0) {
            emit UnexpectedRequestID(requestId); // Check if request IDs match
            return;
        }

        // Check if NFT exists
        bool exists = ownerOf(tokenId) == address(0);

        // Validate GPT Response
        uint8 responseCode = abi.decode(response, (uint8));

        if (responseCode != 1) {
            emit ListingFailed(tokenId);

            // If the NFT exists it means the request failed, so we need to transfer it back to the owner
            if (exists) {
                transferFrom(
                    address(this),
                    metadata[tokenId].currentOwner,
                    tokenId
                );
            }

            return;
        }

        // Keep track of the previous owners
        metadata[tokenId].previousOwners += 1;

        // If the NFT doens't exist yet, mint it
        if (!exists) {
            _mint(address(this), tokenId);
        }
    }

    // TODO: Jacob - Complete function to allow a user who has called `listNFT` to remove their NFT from the marketplace
    function unlistNft(uint256 tokenId) external {}

    // TODO: Jacob - Complete function to allow a user who owns an NFT to relist it on the marketplace. Code will be similar to `listNFT`
    // 1. They will need to pay fee again
    // 2. They will need to update the metadata
    // 3. They will need to send a new request to the oracle
    // 4. They will need to transfer the NFT to the contract
    function relistNft(uint256 tokenId) external {}

    // Buy NFTs
    // Unlist NFTs
    // Relist NFTs
    // Reclaim listing fee
    // Withdraw funds
    // Confirm the sale (both parties need to confirm)
    // Update metadata
}
