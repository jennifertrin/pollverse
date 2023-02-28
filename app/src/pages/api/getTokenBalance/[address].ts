import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.HELLO_MOON_API_KEY}`,
      },
      body: JSON.stringify({ ownerAccount: req.query.address }),
    };
    const tokens = await fetch(
      "https://rest-api.hellomoon.io/v0/token/balances-by-owner",
      options
    ).then((response) => response.json());
    return res.status(200).json({ tokens });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}