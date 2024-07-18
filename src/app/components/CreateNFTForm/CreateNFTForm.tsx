'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CA;

const initialFormValues = {
  name: '',
  description: '',
  img: null,
};

export default function CreateNFTForm() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div>
      <form onSubmit={handleSubmit} className='text-black'>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' value={formValues.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='description'
            name='description'
            value={formValues.description}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Mint</button>
      </form>
    </div>
  );
}
