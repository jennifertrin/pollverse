import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider  } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";


export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://rpc.ankr.com/solana";

  const WalletProvider = dynamic(
    () => import("../contexts/ClientContextProvider"),
    {
      ssr: false,
    }
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
          <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}