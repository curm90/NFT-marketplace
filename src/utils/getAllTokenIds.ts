import { getContract, readContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { type ContractOptions } from 'thirdweb/contract';
import client from './thirdwebClient';
import NFTArtifact from '../../artifacts/contracts/NFT.sol/NFT.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CA;

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
      tokenIds.push(i + 1);
    }

    return tokenIds;
  } catch (error) {
    console.log({ error });
  }
}
