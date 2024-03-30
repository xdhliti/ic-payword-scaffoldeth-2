// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayMerkleExtended {
    address public channelSender;
    address public channelRecipient;
    uint public startDate;
    uint public channelTimeout;
    bytes32 public root;
    bool private isActive; // State variable to control the contract's active status

    constructor(address to, uint _timeout, bytes32 _root) payable {
        require(msg.value > 0, "Initial balance must be greater than 0");
        channelRecipient = to;
        channelSender = msg.sender;
        startDate = block.timestamp;
        channelTimeout = _timeout;
        root = _root;
        isActive = true; // Contract is active upon deployment
    }

    modifier onlyWhenActive {
        require(isActive, "Contract is no longer active.");
        _;
    }

    function AddBalance(bytes32 _newRoot) public payable onlyWhenActive {
        if (root < _newRoot)
            root = keccak256(abi.encodePacked(root, _newRoot));
        else
            root = keccak256(abi.encodePacked(_newRoot, root));
    }

    function CloseChannel(uint256 _amount, bytes32[] memory proof) public onlyWhenActive {
        require(msg.sender == channelRecipient, "Only the recipient can close the channel.");
        bytes32 computedHash = keccak256(abi.encodePacked(_amount));
        require(verifyMerkle(root, computedHash, proof), "Merkle verification failed.");
        payable(channelRecipient).transfer(_amount);
        deactivate();
    }

    function verifyMerkle(bytes32 _root, bytes32 leaf, bytes32[] memory proof) public pure returns (bool) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            if (computedHash < proof[i])
                computedHash = keccak256(abi.encodePacked(computedHash, proof[i]));
            else
                computedHash = keccak256(abi.encodePacked(proof[i], computedHash));
        }
        return computedHash == _root;
    }

    function ChannelTimeout() public onlyWhenActive {
        require(block.timestamp >= startDate + channelTimeout, "Channel timeout has not been reached yet.");
        deactivate();
    }

    function deactivate() private {
        isActive = false;
    }

}