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
      const designCollection = db.collection("designs");
      const allDesigns = designCollection.find({})
      allDesigns.toArray(function(err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).json({ docs })
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
