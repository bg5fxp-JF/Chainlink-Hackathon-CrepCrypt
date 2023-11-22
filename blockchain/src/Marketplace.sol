pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Market is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

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
    ) FunctionsClient(router) {
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
        if (tokenURI == "") {
            revert("Token URI is not correct");
        }
        if (name == "") {
            revert("Name is not correct");
        }
        if (description == "") {
            revert("Description is not correct");
        }
        if (size == "") {
            revert("Size is not correct");
        }

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(sourceCode);

        // Init args for ChatGPT req
        string[] memory args = new string[](3);
        args[0] = tokenURI;
        args[1] = description;
        args[2] = name;

        uint256 tokenId = IERC721(nft).totalSupply() + 1;

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
        uint256 tokenId = requestIdToTokenId[reqId];

        if (tokenId == 0) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }

        // Validate GPT Response
        uint8 responseCode = abi.decode(response, (uint8));

        if (responseCode != 1) {
            revert UnexpectedResponseCode(responseCode);
        }

        address currentOwner = metadata[tokenId].currentOwner;

        IERC721(nft).mint(address(this), tokenId);
    }

    // Buy NFTs
    // Unlist NFTs
    // Relist NFTs
    // Reclaim listing fee
    // Withdraw funds
    // Confirm the sale (both parties need to confirm)
    // Update metadata
}
