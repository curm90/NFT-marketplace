'use client';

import client from '@/utils/thirdwebClient';
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';

const wallets = [inAppWallet(), createWallet('io.metamask'), createWallet('io.rabby')];

export default function ConnectWallet() {
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}
