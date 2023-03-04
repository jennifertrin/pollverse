import { GatewayProvider } from "@civic/solana-gateway-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { ReactNode } from "react";
import { PublicKey } from "@solana/web3.js";

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function CivicContextProvider({ children }: Props) {
  const gatekeeperNetwork = new PublicKey('tigoYhp9SpCDoCQmXGj2im5xa3mnjR1zuXrpCJ5ZRmi');

  const wallet = useWallet();
  const { connection } = useConnection();

  return (
    <GatewayProvider
      wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
      connection={connection}
      cluster={"devnet"}
    >
      {children}
    </GatewayProvider>
  );
}
