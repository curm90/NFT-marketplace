import { CONTRACT_ADDRESS } from '@/app/constants/contract';
import { sepolia } from 'thirdweb/chains';
import { ContractOptions, getContract, readContract } from 'thirdweb';
import client from './thirdwebClient';
import NFTArtifact from '../../artifacts/contracts/NFT.sol/NFT.json';

export default async function getTokenMetadata(tokenId: number) {
  const abi = NFTArtifact.abi;

  try {
    if (!CONTRACT_ADDRESS) {
      throw new Error('CONTRACT_ADDRESS is not defined');
    }

    const contract = getContract({
      client,
      address: CONTRACT_ADDRESS,
      chain: sepolia,
      abi: abi as ContractOptions['abi'],
    });

    const tokenUri = await readContract({
      contract,
      method: 'function tokenURI(uint256) view returns (string)',
      params: [BigInt(tokenId)],
    });

    return tokenUri;
  } catch (error) {
    console.log({ error });
  }
}
