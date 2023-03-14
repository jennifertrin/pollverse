import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('req', req);
    return res.status(200).json({ req: req });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
