import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { SolNetwork } from "@moralisweb3/common-sol-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!Moralis.SolApi) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    }

    const address = req.query.address as string;

    const network = SolNetwork.DEVNET;

    const response = await Moralis.SolApi.account.getSPL({
      address,
      network,
    });

    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
