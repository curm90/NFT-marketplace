import { cn } from '@/utils/classNames';

type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  className?: string;
  children?: React.ReactNode;
};

export default function Button({ type, className, children }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'w-fit rounded-lg bg-cyan-800 px-8 py-1 text-slate-50 duration-150 hover:bg-cyan-700',
        className,
      )}
    >
      {children}
    </button>
  );
}
