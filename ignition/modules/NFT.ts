import { buildModule } from '@nomicfoundation/ignition-core';

const NFTModule = buildModule('NFTModule', (m) => {
  const owner = m.getAccount(0);
  const nft = m.contract('NFT', [owner]);

  return { nft };
});

export default NFTModule;
