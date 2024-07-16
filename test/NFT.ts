import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('NFT contract', function () {
  async function deployFixture() {
    const [owner, account1] = await hre.ethers.getSigners();

    const NFT = await hre.ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(owner.address);

    return { nft, owner, account1 };
  }

  describe('Deployment', async function () {
    it('should set the correct owner', async function () {
      const { nft, owner } = await loadFixture(deployFixture);

      expect(await nft.owner()).to.equal(owner.address);
    });
  });

  describe('Minting', async function () {
    it('should mint an NFT and set the correct tokenURI', async function () {
      const { nft, account1 } = await loadFixture(deployFixture);

      const tokenURI = 'https://example.com/token1';
      await nft.safeMint(account1.address, tokenURI);

      const tokenId = 0;
      expect(await nft.ownerOf(tokenId)).to.equal(account1.address);
      expect(await nft.tokenURI(tokenId)).to.equal(tokenURI);
    });
  });
});
