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
});
