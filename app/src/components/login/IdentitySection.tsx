import React from "react";
import { IdentityButton } from '@civic/solana-gateway-react';

export default function IdentitySection() {

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Verify your identity:
      </div>
      <IdentityButton />
    </div>
  );
}
