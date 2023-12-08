// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import "forge-std/Test.sol";
import "../src/CrepCrypt.sol";
import "forge-std/console.sol";

contract CrepCryptTest is Test {
    CrepCrypt crepCrypt;

    string SEPOLIA_FORK = vm.envString("SEPOLIA_FORK");
    uint256 FORK_BLOCK_NUMBER = 4841971;

    function setUp() public virtual {
        crepCrypt = CrepCrypt(0x8b53b58050ACa4Da6e2D7f738aD9112fA122ac49);

        console.log("Setting Up");
        console.log("SEPOLIA_FORK: %s", SEPOLIA_FORK);

        uint sepoliaFork = vm.createFork(SEPOLIA_FORK);
        vm.selectFork(sepoliaFork);
        vm.roll(FORK_BLOCK_NUMBER);

        console.log("Set Up Done");
    }

    function testList() public {
        uint256 price = 1 ether;
        string
            memory tokenURI = "https://gold-recent-cat-109.mypinata.cloud/ipfs/QmQpf3CfTPoi6YYjuTm1VYFNXS9hop9bt7AtyGhFyxyoAe";
        string memory desc = "Jordan 4";

        crepCrypt.listNFT{value: 0.1 ether}(price, tokenURI, desc);
    }
}
