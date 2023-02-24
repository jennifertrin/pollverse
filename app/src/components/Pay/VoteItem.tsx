import React, { useEffect } from "react";
import { getAllProposals, withCastVote } from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "recent");
const programId = new PublicKey("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw");
const publicKey = new PublicKey("3qnpdzqPZefVvD9LjJQee8oFTQAqWTbX1f3hSeh1SYAX");

export default function VoteItem() {
  useEffect(() => {
    async function getProposals() {
      const realms = await getAllProposals(connection, programId, publicKey);
      return realms;
    }

    async function fetchData() {
      const realms = await getProposals();
      console.log("realms", realms);
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col mx-auto">
      <div><h1 className="text-4xl font-bold mt-16">Vote for this design</h1></div>
      <div className="flex flex-row gap-4 m-auto">
        <button className="btn btn-primary">Approve</button>
        <button className="btn btn-primary">Deny</button>
        <button className="btn btn-primary">Abstain</button>
      </div>
    </div>
  );
}
