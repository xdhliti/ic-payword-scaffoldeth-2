import { expect } from "chai";
import { ethers } from "hardhat";
import { EthWord, EthWord__factory } from "../typechain-types";
import { BytesLike, Signer } from "ethers";

function calculateKeccak256(types: string[], values: (string | number)[]) {
  return ethers.keccak256(ethers.solidityPacked(types, values));
  //encodeBytes32String
}
// const abiCoder = new AbiCoder();
// function calculateKeccak256(type: string[], value: (string | Uint8Array)[]) {
//   return ethers.keccak256(abiCoder.encode(["string"], [value]));
// }
// Exemplo de uso:
const generateHashChain = (base: string, length: number) => {
  //let currentHash = calculateKeccak256(["string"], [base]);
  let currentHash = base;
  console.log(currentHash);
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
  let margin, timeout: number, tip: BytesLike;
  const secret = "secret";
  let hashChain: BytesLike[];

  before(async function () {
    [owner, recipient, otherAccount] = await ethers.getSigners();
    margin = ethers.parseEther("1"); // 1 Ether
    timeout = 3600; // 1 hour
    tip = calculateKeccak256(["string"], [secret]);
    const recipientAddress = await recipient.getAddress();
    console.log("AAAAAAAAAA 2", calculateKeccak256(["string"], [tip]));
    const EthWordFactory = (await ethers.getContractFactory("EthWord")) as EthWord__factory;
    ethWord = await EthWordFactory.deploy(recipientAddress, timeout, margin, tip, { value: margin });
    hashChain = generateHashChain(tip, 100);
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
      const finalHash = hashChain[wordCount];
      //const initialBalance = await recipient.getBalance();
      await ethWord.connect(recipient).closeChannel(finalHash, wordCount);
      //const newBalance = await recipient.getBalance();
      expect(await ethWord.isActive()).to.be.false;
      //expect(newBalance).to.be.above(initialBalance);
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
