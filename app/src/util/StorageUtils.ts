// import { FGStorage } from "@co2-storage/js-api";
// import prom from "prom-client";

// const authType = "pk";
// const ipfsNodeType = "client";
// const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https";
// const fgApiUrl = "https://web2.co2.storage";

// const fgStorage = new FGStorage({
//   authType: authType,
//   ipfsNodeType: ipfsNodeType,
//   ipfsNodeAddr: ipfsNodeAddr,
//   fgApiHost: fgApiUrl,
// });

// export async function searchAssets() {
//   let searchAssetsResponse = await fgStorage.searchAssets("game assets");
//   if (searchAssetsResponse.error != null) {
//     console.error(searchAssetsResponse.error);
//     await new Promise((reject) => setTimeout(reject, 300));
//     process.exit();
//   }
//   const lastListedAsset =
//     searchAssetsResponse.result.assets[
//       searchAssetsResponse.result.assets.length - 1
//     ];
//   if (lastListedAsset) {
//     let getAssetResponse = await fgStorage.getAsset(lastListedAsset.block);
//     if (getAssetResponse.error != null) {
//       console.error(getAssetResponse.error);
//       await new Promise((reject) => setTimeout(reject, 300));
//       process.exit();
//     }

//     console.dir(getAssetResponse.result, { depth: null });
//   }

//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // Exit program
//   process.exit();
// }
