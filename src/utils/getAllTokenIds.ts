import { getContract, readContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { type ContractOptions } from 'thirdweb/contract';
import client from './thirdwebClient';
import NFTArtifact from '../../artifacts/contracts/NFT.sol/NFT.json';
import { CONTRACT_ADDRESS } from '@/app/constants/contract';

export default async function getAllTokenIds() {
  if (!CONTRACT_ADDRESS) {
    throw new Error('CONTRACT_ADDRESS is not defined');
  }

  try {
    const abi = NFTArtifact.abi;

    const contract = getContract({
      client,
      chain: sepolia,
      address: CONTRACT_ADDRESS,
      abi: abi as ContractOptions['abi'],
    });

    const totalSupply = await readContract({
      contract,
      method: 'function getNextTokenId() view returns (uint256)',
    });

    const tokenIds = [];

    for (let i = 0; i < totalSupply; i++) {
      tokenIds.push(i);
    }

    return tokenIds;
  } catch (error) {
    console.log({ error });
  }
}
