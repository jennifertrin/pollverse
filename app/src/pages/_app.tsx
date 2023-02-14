import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import DispatchApp from "../contexts/DispatchContextProvider";
import CivicContextProvider from "@/contexts/CivicContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicModal from "@/components/TopicModal";

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://rpc.ankr.com/solana";

  const WalletProvider = dynamic(
    () => import("../contexts/ClientContextProvider"),
    {
      ssr: false,
    }
  );

  const isProduction = process.env.NODE_ENV === 'production';


  const baseURL = isProduction ? "https://pollverse.vercel.app" : "http://localhost:3000";
  const forumURL = "/forum";
  const topicURL = "/topic";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
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
      </WalletProvider>
    </ConnectionProvider>
  );
}
