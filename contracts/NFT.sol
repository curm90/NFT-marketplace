// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(
        address initialOwner
    ) ERC721("MyNFT", "MNFT") Ownable(initialOwner) {
        _nextTokenId = 0;
    }
}
