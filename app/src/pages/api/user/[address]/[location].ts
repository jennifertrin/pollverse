import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

type Data = {
  address: string | string[] | undefined;
  location: string | string[] | undefined;
  isExists: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = req.query.address;
  const location = req.query.location;

  try {
    const connection = await connectToDatabase();
    if (connection) {
      const { db } = connection;
      const userAccountCollection = db.collection("users");
      const exists = userAccountCollection.find({ address, location });
      if (exists) {
        return res.status(200).json({ address, location, isExists: true });
      } else {
        await userAccountCollection.insertOne({
          address,
          location,
        });
        return res.status(200).json({ address, location, isExists: false });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
