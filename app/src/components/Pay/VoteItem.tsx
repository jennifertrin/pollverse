import React from "react";
import {
  withCastVote,
  PROGRAM_VERSION_V3,
  Vote,
  YesNoVote,
} from "@solana/spl-governance";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface Props {
  proposal: any;
}

export default function VoteItem({ proposal }: Props) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (!publicKey || !proposal) return <div></div>;

  const programId = new PublicKey(
    "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
  );

  const payer = new PublicKey(publicKey);

  const instructions: TransactionInstruction[] = [];

  const programVersion = PROGRAM_VERSION_V3;

  const realm = new PublicKey("3qnpdzqPZefVvD9LjJQee8oFTQAqWTbX1f3hSeh1SYAX");

  const governance = proposal?.account?.governance;

  const proposalPublicKey = proposal?.pubkey;

  const proposalOwnerRecord = proposal?.account?.tokenOwnerRecord;

  const voteGoverningTokenMint = proposal?.account?.governingTokenMint;

  const tokenOwnerRecord = new PublicKey(
    "7ywgJSiT5Zc4PVN62esGMUCHvgkDwg79UZasRCPKGnQG"
  );

  async function castVote(voteNumber: YesNoVote) {
    const vote = await withCastVote(
      instructions,
      programId,
      programVersion,
      realm,
      governance,
      proposalPublicKey,
      proposalOwnerRecord,
      tokenOwnerRecord,
      payer,
      voteGoverningTokenMint,
      Vote.fromYesNoVote(voteNumber),
      payer
    );

    const transaction = new Transaction();
    transaction.add(...instructions);

    const signature = await sendTransaction(transaction, connection);
    return signature;
  }

  return (
    <div className="flex flex-col mx-auto">
      <div>
        <h1 className="text-4xl font-bold mt-8">Vote for this design</h1>
        <div className="text-sm mt-4 mb-4">{proposal?.account?.descriptionLink?.length > 500 ? proposal?.account?.descriptionLink?.slice(0,500) + '...' : proposal?.account?.descriptionLink}</div>
      </div>
      <div className="flex flex-row gap-4 m-auto mb-4">
        <button
          onClick={async () => await castVote(0)}
          className="btn btn-primary"
        >
          Approve
        </button>
        <button
          onClick={async () => await castVote(1)}
          className="btn btn-primary"
        >
          Deny
        </button>
      </div>
    </div>
  );
}
