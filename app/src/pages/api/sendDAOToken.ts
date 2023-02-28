import { createTransferInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js"
import { NextApiRequest, NextApiResponse } from "next"
import { pollverseTokenAddress } from "../../util/SolanaPayUtils";
import base58 from 'bs58';
export type MakeTransactionInputData = {
  account: string,
}

type MakeTransactionGetResponse = {
  label: string,
  icon: string,
}

export type MakeTransactionOutputData = {
  transaction: Transaction,
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
    const { account } = req.body as MakeTransactionInputData
    if (!account) {
      res.status(40).json({ error: "No account provided" })
      return
    }

    const daoPrivateKey = process.env.DAO_PRIVATE_KEY as string
    if (!daoPrivateKey) {
      res.status(500).json({ error: "DAO private key not available" })
    }
    const daoKeypair = Keypair.fromSecretKey(base58.decode(daoPrivateKey));

    const userPublicKey = new PublicKey(account);
    const daoPublicKey = daoKeypair.publicKey;

    const network = WalletAdapterNetwork.Devnet
    const endpoint = clusterApiUrl(network)
    const connection = new Connection(endpoint)

    const DAOTokenAddress = await getAssociatedTokenAddress(pollverseTokenAddress, daoPublicKey); 

    const { blockhash, lastValidBlockHeight } = await (connection.getLatestBlockhash('finalized'));

    const transaction = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: userPublicKey,
    })

    const userWallet = await getOrCreateAssociatedTokenAccount(
      connection,
      daoKeypair, 
      pollverseTokenAddress, // which token the account is for
      userPublicKey,
    ).then(account => account.address)

    const DAOWallet = await getOrCreateAssociatedTokenAccount(
      connection,
      daoKeypair,
      pollverseTokenAddress,
      daoKeypair.publicKey,
  ).then(account => account.address)

    const tx = new Transaction();
    tx.add(createTransferInstruction(
        DAOWallet,
        userWallet,
        daoKeypair.publicKey,
        2 * Math.pow(10, 6)
    ))


    const latestBlockHash = await connection.getLatestBlockhash('confirmed');
    tx.recentBlockhash = await latestBlockHash.blockhash;    
    const signature = await sendAndConfirmTransaction(connection,tx, [daoKeypair]);

    return res.status(200).json({
      transaction: transaction,
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