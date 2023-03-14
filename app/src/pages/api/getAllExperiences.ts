import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connection = await connectToDatabase();
    if (connection) {
      const { db } = connection;
      const designCollection = db.collection("ar-experiences");
      const allAR = await designCollection.find().toArray();
      return res.status(200).json({ allAR: allAR });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
