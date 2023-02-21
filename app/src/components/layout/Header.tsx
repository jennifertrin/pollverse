import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const Header = () => {
  const { publicKey, disconnect } = useWallet();

  if (!publicKey) return <div></div>;

  return (
    <div className="w-screen flex flex-row space-between bg-blue-900 py-2 top-0">
      <div className="flex w-1/5 font-body font-bold tracking-wide px-4 py-2 h-2/12 text-white">
        Pollverse
      </div>
      <div className="w-3/5 flex font-body font-normal tracking-wide px-4 py-2 h-2/12 text-white">
        Your ID: {publicKey?.toString()}
      </div>
      <button
        onClick={() => disconnect()}
        className="w-1/5 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
      >
        Disconnect
      </button>
    </div>
  );
};

export default Header;
