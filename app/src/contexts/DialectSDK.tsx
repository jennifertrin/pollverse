import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
  DialectSolanaWalletAdapter
} from "@dialectlabs/blockchain-sdk-solana";
import { Monitor, Monitors, Pipelines, ResourceId, SourceData } from '@dialectlabs/monitor';
// @ts-ignore
import { Duration } from 'luxon';
import { pollverseDAOAddress } from "@/util/SolanaPayUtils";

const environment: DialectCloudEnvironment = "development";

export const sdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    wallet: NodeDialectSolanaWalletAdapter.create() as DialectSolanaWalletAdapter,
  })
);

type DataType = {
  cratio: number,
  resourceId: ResourceId;
};

const resourceId = pollverseDAOAddress;

const dataSourceMonitor: Monitor<DataType> = Monitors.builder({
  sdk: sdk,
  subscribersCacheTTL: Duration.fromObject({ seconds: 5 }),
})
  // (5a) Define data source type
  .defineDataSource<DataType>()
  // (5b) Supply data to monitor, in this case by polling
  //     Push type available, see example 007
  .poll((subscribers: ResourceId[]) => {
    const sourceData: SourceData<DataType>[] = subscribers.map(
      (resourceId) => ({
        data: {
          cratio: 0.5,
          resourceId: resourceId,
        },
        groupingKey: resourceId.toString(),
      }),
    );
    return Promise.resolve(sourceData);
  }, Duration.fromObject({ seconds: 3 }))
  .transform<number, number>({
    keys: ['cratio'],
    pipelines: [
      Pipelines.threshold({
        type: 'falling-edge',
        threshold: 0.5,
      }),
    ],
  })
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: 'dApp cratio warning',
        message: `Your cratio = ${value} below warning threshold`,
      };
    },
    {
      dispatch: 'unicast',
      to: ({ origin: { resourceId } }) => resourceId,
    },
  )
  .also()
  .transform<number, number>({
    keys: ['cratio'],
    pipelines: [
      Pipelines.threshold({
        type: 'rising-edge',
        threshold: 0.5,
      }),
    ],
  })
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: 'dApp cratio warning',
        message: `Your cratio = ${value} above warning threshold`,
      };
    },
    {
      dispatch: 'unicast',
      to: ({ origin: { resourceId } }) => resourceId,
    },
  )
  .and()
  .build();

dataSourceMonitor.start();