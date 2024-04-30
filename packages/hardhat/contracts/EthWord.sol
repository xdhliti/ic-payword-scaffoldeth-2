// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthWord {
    address public channelSender;
    address public channelRecipient;
    uint public startDate;
    uint public channelDuration;
    uint public channelMargin;
    bytes32 public channelTip;
    bool public isActive;
    uint public n;
    uint256 marginPerHash;

    constructor(address to, uint timeout, uint margin, bytes32 tip, uint divisions) payable {
        channelRecipient = to;
        channelSender = msg.sender;
        startDate = block.timestamp;
        channelDuration = timeout;
        channelMargin = margin;
        channelTip = tip;
        isActive = true;
        n = divisions;
        marginPerHash =  address(this).balance / n;
    }

    modifier onlyActive() {
        require(isActive, "Channel is not active.");
        _;
    }

    function closeChannel(bytes32 _word, uint8 _wordCount) public onlyActive {
        require(msg.sender == channelRecipient, "Only the recipient can close the channel.");
        bytes32 wordScratch = _word;

        for (uint i = 1; i <= _wordCount; i++) {
            wordScratch = keccak256(abi.encodePacked(wordScratch));
        }

        require(wordScratch == channelTip, "Invalid word or word count.");

        channelTip = _word;
        n -= _wordCount;

        uint256 transferAmount = _wordCount * marginPerHash;
        require(address(this).balance >= transferAmount, "Insufficient balance to perform transfer");
        
        (bool sent, ) = channelRecipient.call{value: transferAmount}("");
        require(sent, "Failed to send Ether");
        
        uint256 balanceLeft = address(this).balance;
        (bool sentToSender, ) = channelSender.call{value: balanceLeft}("");
        require(sentToSender, "Failed to send Ether to sender");

        if (n <= 0) {
            isActive = false;
        }
    }

    function expireChannel() public onlyActive {
        require(block.timestamp >= startDate + channelDuration, "Channel timeout has not been reached.");
        deactivate();
    }

    function deactivate() private {
        isActive = false;
        uint balance = address(this).balance;
        if (balance > 0) {
            (bool sent, ) = channelSender.call{value: balance}("");
            require(sent, "Failed to return remaining Ether to sender");
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
