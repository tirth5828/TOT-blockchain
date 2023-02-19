// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol"; 

contract Fragger is ERC20Mintable, ERC20Detailed {

    constructor() ERC20Detailed("Fragger", "FRAG", 18) public {
    }

}