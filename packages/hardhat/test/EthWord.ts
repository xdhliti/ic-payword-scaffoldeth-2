import { expect } from "chai";
import { ethers } from "hardhat";
import { EthWord, EthWord__factory } from "../typechain-types";
import { BytesLike, type Signer } from "ethers";

function calculateKeccak256(types: string[], values: (string | number)[]) {
  return ethers.solidityPackedKeccak256(types, values);
}
const generateHashChain = (base: string, length: number) => {
  let currentHash = base;
  const hashChain = [currentHash];

  for (let i = 1; i < length; i++) {
    currentHash = calculateKeccak256(["bytes32"], [currentHash]);
    hashChain.push(currentHash);
  }

  return hashChain;
};

describe("EthWord Contract", function () {
  let ethWord: EthWord;
  let owner: Signer, recipient: Signer, otherAccount: Signer;
  let margin, timeout: number, tip: BytesLike, h0: BytesLike, n: number;
  const secret = "secret";
  let hashChain: BytesLike[];
  beforeEach(async function () {
    [owner, recipient, otherAccount] = await ethers.getSigners();
    margin = ethers.parseEther("1");
    n = 200;
    timeout = 3600;
    h0 = calculateKeccak256(["string"], [secret]);
    hashChain = generateHashChain(h0, 100);
    tip = hashChain[99];
    const recipientAddress = await recipient.getAddress();
    const EthWordFactory = (await ethers.getContractFactory("EthWord")) as EthWord__factory;
    ethWord = await EthWordFactory.deploy(recipientAddress, timeout, margin, tip, n, { value: margin });
  });

  describe("Deployment", function () {
    it("Should set the right recipient and sender", async function () {
      const recipientAddress = await recipient.getAddress();
      const ownerAddress = await owner.getAddress();
      expect(await ethWord.channelRecipient()).to.equal(recipientAddress);
      expect(await ethWord.channelSender()).to.equal(ownerAddress);
    });

    it("Should have the correct initial states", async function () {
      expect(await ethWord.isActive()).to.be.true;
    });
  });

  describe("Channel Operations", function () {
    it("Should prevent non-recipient from closing the channel", async function () {
      await expect(ethWord.connect(otherAccount).closeChannel(tip, 0)).to.be.revertedWith(
        "Only the recipient can close the channel.",
      );
    });
    it("Should allow the channel to be closed correctly by the recipient with the right hash", async function () {
      const wordCount = 10;
      const finalHash = hashChain[199 - wordCount];
      const initialBalance = await ethers.provider.getBalance(recipient.getAddress());
      await ethWord.connect(recipient).closeChannel(finalHash, wordCount);
      const newBalance = await ethers.provider.getBalance(recipient.getAddress());
      //expect(await ethWord.isActive()).to.be.false;
      expect(await ethWord.n()).to.equal(n - wordCount);
      expect(newBalance).to.be.above(initialBalance);
    });

    it("Should fail to close the channel with invalid word or word count", async function () {
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrongSecret"));
      await expect(ethWord.connect(recipient).closeChannel(wrongHash, 1)).to.be.revertedWith(
        "Invalid word or word count.",
      );
    });

    it("Should allow the channel to expire", async function () {
      await ethers.provider.send("evm_increaseTime", [timeout + 1]);
      await ethers.provider.send("evm_mine", []);
      await ethWord.connect(otherAccount).expireChannel();
      expect(await ethWord.isActive()).to.be.false;
    });
  });
});
