pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    constructor() ERC721("NFT", "NFT") {}

    address MARKET;

    function initMarket(address _market) external onlyOwner {
        MARKET = _market;
    }

    function mint(address to, uint256 tokenId) external {
        if (MARKET == address(0)) revert();
        if (msg.sender != MARKET) revert();
        _mint(to, tokenId);
    }
}
