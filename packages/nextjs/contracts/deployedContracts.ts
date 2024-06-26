/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    EthWord: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timeout",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "margin",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "tip",
              type: "bytes32",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [],
          name: "channelDuration",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelMargin",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelRecipient",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelSender",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelTip",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_word",
              type: "bytes32",
            },
            {
              internalType: "uint8",
              name: "_wordCount",
              type: "uint8",
            },
          ],
          name: "closeChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "expireChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "isActive",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startDate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
  1440002: {
    EthWord: {
      address: "0x3A4f64A8F5D1601EBb3CC5A68e547eb1d9297E15",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timeout",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "margin",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "tip",
              type: "bytes32",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [],
          name: "channelDuration",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelMargin",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelRecipient",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelSender",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelTip",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_word",
              type: "bytes32",
            },
            {
              internalType: "uint8",
              name: "_wordCount",
              type: "uint8",
            },
          ],
          name: "closeChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "expireChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "isActive",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startDate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
    PayWord: {
      address: "0xC479178855f06a6c56118ceAD1790A0958B92a18",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "length",
              type: "uint256",
            },
          ],
          name: "getHashChainArrayByMessage",
          outputs: [
            {
              internalType: "bytes32[]",
              name: "",
              type: "bytes32[]",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "length",
              type: "uint256",
            },
          ],
          name: "getHashChainItemByMessage",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
          ],
          name: "hash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "payWord",
              type: "string",
            },
            {
              internalType: "string",
              name: "userMessage",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "n",
              type: "uint256",
            },
          ],
          name: "isPayWordValid",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155111: {
    EthWord: {
      address: "0x8955d488eeA03084EF9F6156327E6e7bB5FA16E2",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timeout",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "margin",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "tip",
              type: "bytes32",
            },
          ],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [],
          name: "channelDuration",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelMargin",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelRecipient",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelSender",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "channelTip",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_word",
              type: "bytes32",
            },
            {
              internalType: "uint8",
              name: "_wordCount",
              type: "uint8",
            },
          ],
          name: "closeChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "expireChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "isActive",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startDate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
    PayWord: {
      address: "0xDD1f757D4fFEc088642aD469c5B72B1eD25302A4",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "length",
              type: "uint256",
            },
          ],
          name: "getHashChainArrayByMessage",
          outputs: [
            {
              internalType: "bytes32[]",
              name: "",
              type: "bytes32[]",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "length",
              type: "uint256",
            },
          ],
          name: "getHashChainItemByMessage",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "messageInput",
              type: "string",
            },
          ],
          name: "hash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "payWord",
              type: "string",
            },
            {
              internalType: "string",
              name: "userMessage",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "n",
              type: "uint256",
            },
          ],
          name: "isPayWordValid",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
