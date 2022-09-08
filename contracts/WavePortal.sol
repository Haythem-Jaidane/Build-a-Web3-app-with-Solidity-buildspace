// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{

    uint256 totalWaves;
    address owner;
   
    constructor(){
        console.log("Yo yo, I'am a contract and I am smart");
        owner = msg.sender;
    }

    modifier _ownerOnly(){
        require(msg.sender == owner);
        _;
    }
    
    function addWave() public {
        totalWaves += 1;
        console.log("%s has waves!", msg.sender);
    }

    function subtractWave() public _ownerOnly{
        totalWaves -= 1;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
