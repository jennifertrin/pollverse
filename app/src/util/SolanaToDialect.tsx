import { DialectSolanaWalletAdapter } from '@dialectlabs/react-sdk-blockchain-solana';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const solanaWalletToDialectWallet = (
  wallet: WalletContextState
): DialectSolanaWalletAdapter | null => {
  if (
    !wallet.connected ||
    wallet.connecting ||
    wallet.disconnecting ||
    !wallet.publicKey
  ) {
   return null
  }

  return {
    publicKey: wallet.publicKey!,
    signMessage: wallet.signMessage,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
    // @ts-ignore
    diffieHellman: wallet.wallet?.adapter?._wallet?.diffieHellman
      ? async (pubKey: any) => {
          // @ts-ignore
          return wallet.wallet?.adapter?._wallet?.diffieHellman(pubKey);
        }
      : undefined,
  };
};