import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, useWallet  } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import DispatchApp from "../contexts/DispatchContextProvider";
import CivicContextProvider from "@/contexts/CivicContextProvider";

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
      <CivicContextProvider>
        <DispatchApp baseURL={"http://localhost:3000"} forumURL={"/forum"} topicURL={"/topic"}>
          <Component {...pageProps} />
        </DispatchApp>
      </CivicContextProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}