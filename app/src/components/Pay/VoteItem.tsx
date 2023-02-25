import React from "react";
import { withCastVote, PROGRAM_VERSION_V2, Vote, YesNoVote, getTokenOwnerRecord } from "@solana/spl-governance";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  proposal: any;
}

export default function VoteItem({ proposal }: Props) {
  const { publicKey } = useWallet();

  if (!publicKey || !proposal) return <div></div>;

  const programId = new PublicKey(
    "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
  );

  const payer = new PublicKey(publicKey);

  const instructions: TransactionInstruction[] = 
  [{
    keys: [{pubkey: payer, isSigner: true, isWritable: false }],
    programId: programId,
    data: Buffer.from('Thank you for voting on Pollverse'),
  }];

  const programVersion = PROGRAM_VERSION_V2;

  const realm = new PublicKey("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw");

  const governance = proposal?.account?.governance;

  const proposalPublicKey = proposal?.pubKey;

  const proposalOwnerRecord = proposal?.account?.tokenOwnerRecord;

  const voteGoverningTokenMint = proposal?.account?.governingTokenMint;

  const tokenOwnerRecord = new PublicKey('4JtzydoohQxcCuasmw1tTM8WbBLt5xvVoSFwd6YZZ9W1');

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
    return vote;
  }

  return (
    <div className="flex flex-col mx-auto">
      <div>
        <h1 className="text-4xl font-bold mt-16">Vote for this design</h1>
        <div className="text-sm"></div>
      </div>
      <div className="flex flex-row gap-4 m-auto">
        <button onClick={async () => await castVote(0)} className="btn btn-primary">Approve</button>
        <button onClick={async () => await castVote(1)} className="btn btn-primary">Deny</button>
      </div>
    </div>
  );
}
