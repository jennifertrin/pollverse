import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { NextApiRequest, NextApiResponse } from "next"
import { pollverseTokenAddress } from "../../../util/SolanaPayUtils";
import base58 from 'bs58';
import { connectToDatabase } from "@/util/mongodb";

export type MakeTransactionInputData = {
  account: string,
}

type MakeTransactionGetResponse = {
  label: string,
  icon: string,
}

export type MakeTransactionOutputData = {
  transaction: string,
  message: string,
}

type ErrorOutput = {
  error: string
}

function get(res: NextApiResponse<MakeTransactionGetResponse>) {
  res.status(200).json({
    label: "Pollverse DAO",
    icon: "https://freesvg.org/img/1370962427.png",
  })
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse<MakeTransactionOutputData | ErrorOutput>
) {
  try {
    // We pass the buyer's public key in JSON body
    const account = req.query.address;
    if (!account) {
      res.status(40).json({ error: "No account provided" })
      return
    }

    // We get the shop private key from .env - this is the same as in our script
    const daoPrivateKey = process.env.DAO_PRIVATE_KEY as string
    if (!daoPrivateKey) {
      res.status(500).json({ error: "DAO private key not available" })
    }
    const daoKeypair = Keypair.fromSecretKey(base58.decode(daoPrivateKey))

    const userPublicKey = new PublicKey(account)
    const daoPublicKey = daoKeypair.publicKey

    const network = WalletAdapterNetwork.Devnet
    const endpoint = clusterApiUrl(network)
    const connection = new Connection(endpoint)
  
    const buyerTokenAddress = await getOrCreateAssociatedTokenAccount(
      connection,
      daoKeypair,
      pollverseTokenAddress,
      userPublicKey,
    ).then(account => account.address)

    const DAOTokenAddress = await getAssociatedTokenAddress(pollverseTokenAddress, daoPublicKey);

    const { blockhash } = await (connection.getLatestBlockhash('finalized'))

    const transaction = new Transaction({
      recentBlockhash: blockhash,

      feePayer: userPublicKey,
    })

    const couponInstruction = createTransferCheckedInstruction(
      DAOTokenAddress,
      pollverseTokenAddress,
      userPublicKey,
      daoPublicKey,
      2,
      0,
    )

    transaction.add(couponInstruction)

    transaction.partialSign(daoKeypair)

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false
    })
    const base64 = serializedTransaction.toString('base64')

    const mongodbConnection = await connectToDatabase();
    if (mongodbConnection) {
      const { db } = mongodbConnection;
      const userAccountCollection = db.collection("users");
      await userAccountCollection.updateOne({
          address: account,
          claimToken: true
        });
    }

    // Return the serialized transaction
    res.status(200).json({
      transaction: base64,
      message: "Thanks for joining the DAO",
    })
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'error creating transaction', })
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MakeTransactionGetResponse | MakeTransactionOutputData | ErrorOutput>
) {
  if (req.method === "GET") {
    return get(res)
  } else if (req.method === "POST") {
    return await post(req, res)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}