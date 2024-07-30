'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { upload } from 'thirdweb/storage';
import { getContract, prepareContractCall, sendAndConfirmTransaction, type ContractOptions } from 'thirdweb';
import { type Account } from 'thirdweb/wallets';
import { useActiveAccount } from 'thirdweb/react';
import { sepolia } from 'thirdweb/chains';
import client from '@/utils/thirdwebClient';
import Input from '../Input/Input';
import Button from '../Button/Button';
import NFTArtifact from '../../../artifacts/contracts/NFT.sol/NFT.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CA;

const initialFormValues = {
  name: '',
  description: '',
  file: '',
};

export default function CreateNFTForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [minting, setMinting] = useState(false);
  const activeAccount = useActiveAccount();

  console.log({ activeAccount });

  const abi = NFTArtifact.abi;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadMetadata = async () => {
    if (!formValues.file) return;
    setMinting(true);

    try {
      const testImgFile = new File([JSON.stringify(formValues.file)], 'image.json');
      console.log({ testImgFile });
      const imageUri = await upload({
        client,
        files: [testImgFile],
      });

      const metadata = {
        name: formValues.name,
        description: formValues.description,
        image: imageUri,
      };

      const metaDataFile = new File([JSON.stringify(metadata)], 'metadata.json');

      const metadataUri = await upload({
        client,
        files: [metaDataFile],
      });

      return metadataUri;
    } catch (error) {
      setMinting(false);
      console.log({ error });
    }
  };

  const mintNFT = async (metadataUri: string | null) => {
    if (!metadataUri) return;

    try {
      if (!CONTRACT_ADDRESS) {
        throw new Error('CONTRACT_ADDRESS is not defined');
      }

      const contract = getContract({
        client,
        chain: sepolia,
        address: CONTRACT_ADDRESS,
        abi: abi as ContractOptions['abi'],
      });

      const tx = prepareContractCall({
        contract,
        method: 'function safeMint(address to, string tokenURI)',
        params: [activeAccount?.address as string, metadataUri],
      });
      console.log({ tx });

      const transactionReceipt = await sendAndConfirmTransaction({
        account: activeAccount as Account,
        transaction: tx,
      });

      setMinting(false);

      console.log({ transactionReceipt });
    } catch (error) {
      setMinting(false);
      console.log({ error });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const metadataUri = await uploadMetadata();
    console.log({ metadataUri });

    await mintNFT(metadataUri as string);
  };

  return (
    <div className='mx-auto my-12 flex max-w-[750px] flex-col gap-4 px-12'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl'>Mint Your Own NFT</h1>
        <p>
          Create and mint your unique NFT by filling out the form below. Upload an image, provide a name and
          description, and mint your NFT on the blockchain. Once minted, your NFT will be available for
          viewing and trading on our marketplace.
        </p>
      </div>
      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4 text-black'>
        <div>
          <label htmlFor='name'>Name:</label>
          <Input type='text' id='name' name='name' value={formValues.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none'
            rows={6}
            id='description'
            name='description'
            value={formValues.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='file'>Image</label>
          <Input type='file' id='file' value={formValues.file} onChange={handleInputChange} name='file' />
        </div>
        <Button type='submit'>{minting ? 'Minting...' : 'Mint'}</Button>
      </form>
    </div>
  );
}
