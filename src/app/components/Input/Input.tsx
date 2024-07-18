import { ChangeEvent } from 'react';
import { cn } from '@/app/utils/classNames';

type InputProps = {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({ type, id, name, value, onChange, className }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={cn(
        'w-full rounded-lg border border-gray-300 px-4 py-2 outline-none hover:border-gray-400',
        className,
      )}
    />
  );
}
