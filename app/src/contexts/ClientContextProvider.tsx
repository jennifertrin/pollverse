import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { SolletWalletAdapter } from "@solana/wallet-adapter-sollet";
import "@solana/wallet-adapter-react-ui/styles.css";
import React from 'react';

export default function ClientWalletProvider(
  props: Omit<WalletProviderProps, "wallets">
): JSX.Element {

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletWalletAdapter(),
  ];

  return (
    <WalletProvider wallets={wallets} {...props} autoConnect>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );
}