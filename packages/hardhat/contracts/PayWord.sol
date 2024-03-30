// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayWord {
    function hash(string memory messageInput) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(messageInput));
    }

    function getHashChainItemByMessage(string memory messageInput, uint length) public pure returns (bytes32) {
        bytes32 hashValue = keccak256(abi.encodePacked(messageInput));
        for (uint i = 0; i < length; i++) {
            hashValue = keccak256(abi.encodePacked(hashValue));
        }
        return hashValue;
    }
    function getHashChainArrayByMessage(string memory messageInput, uint length) public pure returns (bytes32[] memory) {
        bytes32[] memory hashChain = new bytes32[](length + 1);
        hashChain[0] = keccak256(abi.encodePacked(messageInput));
        for (uint i = 1; i <= length; i++) {
            hashChain[i] = keccak256(abi.encodePacked(hashChain[i - 1]));
        }
        return hashChain;
    }

    function isPayWordValid(string memory payWord, string memory userMessage, uint n) public pure returns (bool) {
        bytes32 calculatedWn = getHashChainItemByMessage(payWord, n);
        bytes32 receivedWn = keccak256(abi.encodePacked(userMessage));
        return calculatedWn == receivedWn;
    }
    
}
