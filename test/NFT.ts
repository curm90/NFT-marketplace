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
      const tokenId = await nft.getNextTokenId();

      await nft.safeMint(account1.address, tokenURI);

      expect(await nft.ownerOf(tokenId)).to.equal(account1.address);
      expect(await nft.tokenURI(tokenId)).to.equal(tokenURI);
    });
    it('should increment the token id correctly', async function () {
      const { nft, account1 } = await loadFixture(deployFixture);

      const tokenURI1 = 'https://example.com/token1';
      const tokenURI2 = 'https://example.com/token2';

      const tokenId1 = await nft.getNextTokenId();
      await nft.safeMint(account1.address, tokenURI1);
      expect(await nft.ownerOf(tokenId1)).to.equal(account1.address);
      expect(await nft.tokenURI(tokenId1)).to.equal(tokenURI1);

      const tokenId2 = await nft.getNextTokenId();
      await nft.safeMint(account1.address, tokenURI2);
      expect(await nft.ownerOf(tokenId2)).to.equal(account1.address);
      expect(await nft.tokenURI(tokenId2)).to.equal(tokenURI2);
    });
    it('should not allow non owners to mint NFTs', async function () {
      const { nft, account1 } = await loadFixture(deployFixture);

      const tokenURI = 'https://example.com/token1';

      await expect(nft.connect(account1).safeMint(account1.address, tokenURI)).to.be.revertedWithCustomError(
        nft,
        'OwnableUnauthorizedAccount',
      );
    });
  });
  describe('getNextTokenId', function () {
    it('should return the current tokenId', async function () {
      const { nft, owner } = await loadFixture(deployFixture);

      const tokenURI1 = 'https://example.com/token1';
      const tokenURI2 = 'https://example.com/token2';

      await nft.safeMint(owner, tokenURI1);
      const tokenId = await nft.getNextTokenId();

      await nft.safeMint(owner, tokenURI2);
      const tokenId2 = await nft.getNextTokenId();

      expect(tokenId).to.equal(1);
      expect(tokenId2).to.equal(2);
    });
  });
});
