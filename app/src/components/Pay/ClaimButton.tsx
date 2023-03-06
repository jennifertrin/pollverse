import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { pollverseTokenAddressString } from "../../util/SolanaPayUtils";

export default function ClaimButton() {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState<number | undefined>();

  async function getDAOTokenBalance() {
    const tokenBalances = await fetch(`/api/getTokenBalance/${publicKey}`).then(
      (response) => response.json()
    );
    const DAOToken = tokenBalances?.response?.find(
      (item: { mint: any }) => item.mint === pollverseTokenAddressString
    );
    if (!DAOToken) return 0;
    const DAOTokenBalance: number = parseInt(DAOToken.amount);
    return DAOTokenBalance;
  }

  async function claimToken() {
    const claimToken = await fetch(`/api/sendDAOToken/${publicKey}`).then(
      (response) => response.json()
    );
    return claimToken;
  }

  useEffect(() => {
    async function getTokenBalance() {
      const tokenBalance = await getDAOTokenBalance().then((response) =>
        setAmount(response)
      );
      return tokenBalance;
    }
    if (publicKey) {
      getTokenBalance();
    }
  }, [publicKey]);

  useEffect(() => {
    if (!amount) <div>Loading voting access..</div>;
  }, [amount]);

  return (
    <div className="flex flex-col font-body w-1/3">
      {amount !== undefined &&
        amount > 0 &&
        amount < 1.5 &&
        "You can vote community issues"}
      {amount !== undefined && amount > 1.5 && "You have full voting power as a citizen"}
      {amount == 0 && (
        <button
          onClick={async () => await claimToken()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Claim 2 Tokens
        </button>
      )}
    </div>
  );
}