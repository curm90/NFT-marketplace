import ConnectWallet from '../ConnectWallet/ConnectWallet';

export default function Header() {
  return (
    <nav className='flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-3'>
      <div className='flex gap-6'>
        <span>Logo here</span>
        <span>Home</span>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </nav>
  );
}
