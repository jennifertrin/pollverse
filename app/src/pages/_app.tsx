import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import DispatchApp from "../contexts/DispatchContextProvider";
import CivicContextProvider from "@/contexts/CivicContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicModal from "../components/TopicModal";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useEffect, useMemo, useState } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import "@dialectlabs/react-ui/index.css";
import {
  DialectSolanaSdk,
  DialectSolanaWalletAdapter,
  SolanaConfigProps,
} from "@dialectlabs/react-sdk-blockchain-solana";
import {
  DialectUiManagementProvider,
  DialectThemeProvider,
  DialectNoBlockchainSdk,
  ConfigProps,
} from "@dialectlabs/react-ui";
import { solanaWalletToDialectWallet } from "@/util/SolanaToDialect";

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const WalletProvider = dynamic(
    () => import("../contexts/ClientContextProvider"),
    {
      ssr: false,
    }
  );

  const isProduction = process.env.NODE_ENV === "production";

  const baseURL = isProduction
    ? "https://pollverse.vercel.app"
    : "http://localhost:3000";
  const forumURL = "/forum";
  const topicURL = "/topic";

  const SdkProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const solanaWallet = useWallet();

    const [dialectSolanaWalletAdapter, setDialectSolanaWalletAdapter] =
      useState<DialectSolanaWalletAdapter | null>(null);

    const dialectConfig: ConfigProps = useMemo(
      () => ({
        environment: "development",
        dialectCloud: {
          tokenStore: "local-storage",
        },
      }),
      []
    );

    const solanaConfig: SolanaConfigProps = useMemo(
      () => ({
        wallet: dialectSolanaWalletAdapter,
      }),
      [dialectSolanaWalletAdapter]
    );

    useEffect(() => {
      setDialectSolanaWalletAdapter(solanaWalletToDialectWallet(solanaWallet));
    }, [solanaWallet]);

    if (dialectSolanaWalletAdapter) {
      return (
        <DialectSolanaSdk config={dialectConfig} solanaConfig={solanaConfig}>
          {children}
        </DialectSolanaSdk>
      );
    }

    return <DialectNoBlockchainSdk>{children}</DialectNoBlockchainSdk>;
  };

  const DialectProviders = ({ children }: React.PropsWithChildren<{}>) => {
    return (
      <SdkProvider>
        <DialectThemeProvider>
          <DialectUiManagementProvider>{children}</DialectUiManagementProvider>
        </DialectThemeProvider>
      </SdkProvider>
    );
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect={true}>
        <DialectProviders>
          <CivicContextProvider>
            <DispatchApp
              baseURL={baseURL}
              forumURL={forumURL}
              topicURL={topicURL}
            >
              <Component {...pageProps} />
              <BrowserRouter>
                <Routes>
                  <Route
                    path={`${forumURL}/:id${topicURL}/:id`}
                    element={<TopicModal />}
                  />
                </Routes>
              </BrowserRouter>
            </DispatchApp>
          </CivicContextProvider>
        </DialectProviders>
      </WalletProvider>
    </ConnectionProvider>
  );
}
