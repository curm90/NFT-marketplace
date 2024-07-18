'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CA;

const initialFormValues = {
  name: '',
  description: '',
  img: null,
};

export default function CreateNFTForm() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log({ name, value });

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ formValues });
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
            className='w-full rounded-lg border border-gray-300 outline-none'
            rows={6}
            id='description'
            name='description'
            value={formValues.description}
            onChange={handleInputChange}
          />
        </div>
        <Button type='submit'>Mint</Button>
      </form>
    </div>
  );
}
