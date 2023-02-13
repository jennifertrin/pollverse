import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider  } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import DispatchApp from "../contexts/DispatchContextProvider";

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
        <DispatchApp baseURL={"http://localhost:3000"} forumURL={"/forum"} topicURL={"/topic"}>
          <Component {...pageProps} />
        </DispatchApp>
      </WalletProvider>
    </ConnectionProvider>
  );
}