import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { pollverseTokenAddressString } from "../../util/SolanaPayUtils";
import Badge from "../Badge";

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
    <div className="flex flex-col font-body w-full">
      <div className="flex text-lg mt-4">
        {amount !== undefined && amount > 0 && amount < 1.5 && (
          <Badge name={'Resident - Vote on Community Issues'} />
        )}
        {amount !== undefined && amount > 1.5 && (
          <Badge name={'Citizen - Full Voting Power'} />
        )}
      </div>
      {amount == 0 && (
        <button
          onClick={async () => await claimToken()}
          className="w-1/2 bg-primary text-sm text-white font-bold py-2 px-4 rounded"
        >
          Claim 2 Tokens
        </button>
      )}
    </div>
  );
}
