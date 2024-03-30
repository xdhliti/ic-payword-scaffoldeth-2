import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { keccak256 } from "ethers";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Channel, Channel__factory, PayWord, PayWord__factory } from "../typechain-types";

const generateHashChain = (base: string, length: number) => {
  let currentHash = ethers.keccak256(ethers.toUtf8Bytes(base));
  const hashChain = [currentHash];

  for (let i = 1; i <= length; i++) {
    currentHash = ethers.keccak256(currentHash);
    hashChain.push(currentHash);
  }

  return hashChain;
};

describe("PayWord Contract", function () {

  describe("hash function", function () {
    it("Should correctly hash an input string", async function () {
      const [owner] = await ethers.getSigners();
      const PayWordFactory: PayWord__factory = await ethers.getContractFactory("PayWord");
      const payWord: PayWord = await PayWordFactory.deploy();

      const input = "hello";
      const expectedHash = ethers.keccak256(ethers.toUtf8Bytes(input));
      expect(await payWord.hash(input)).to.equal(expectedHash);
    });
  });

  describe("getHashChainItemByMessage function", function () {
    it("Should correctly retrieve an item in a hash chain by length", async function () {
      const [owner] = await ethers.getSigners();
      const PayWordFactory = await ethers.getContractFactory("PayWord");
      const payWord: PayWord = await PayWordFactory.deploy();

      const base = "hello";
      const length = 100;
      const hashChain = generateHashChain(base, length);
      const expectedHash = hashChain[length];

      expect(await payWord.getHashChainItemByMessage(base, length)).to.equal(expectedHash);
    });
  });

  describe("getHashChainArrayByMessage function", function () {
    it("Should correctly generate a full hash chain array from a base message", async function () {
      const [owner] = await ethers.getSigners();
      const PayWordFactory = await ethers.getContractFactory("PayWord");
      const payWord: PayWord = await PayWordFactory.deploy();

      const base = "test";
      const length = 100; // Including the base hash, there should be 4 items in total
      const expectedHashChain = generateHashChain(base, length);

      const hashChain = await payWord.getHashChainArrayByMessage(base, length);

      for (let i = 0; i <= length; i++) {
        expect(hashChain[i]).to.equal(expectedHashChain[i]);
      }
    });
  });
});
