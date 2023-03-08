import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
  DialectSolanaWalletAdapter
} from "@dialectlabs/blockchain-sdk-solana";

const environment: DialectCloudEnvironment = "development";

export const sdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    wallet: NodeDialectSolanaWalletAdapter.create() as DialectSolanaWalletAdapter,
  })
);
