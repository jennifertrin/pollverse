import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

export default function ClaimButton() {
  const { publicKey } = useWallet();

  async function claimToken() {
    const claimToken = await fetch(`/api/sendDAOToken/${publicKey}`).then(response => response.json());
    return claimToken;
  }

  return (
    <div className="flex flex-col font-body w-1/3">
      <button onClick={async () => await claimToken()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Claim 2 Tokens
      </button>
    </div>
  );
}
