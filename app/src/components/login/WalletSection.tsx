import React from "react";
import WalletButton from "./WalletButton";

export default function WalletSection() {

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        1. Connect your wallet:
      </div>
      <WalletButton />
    </div>
  );
}
