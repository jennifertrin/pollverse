import React, { Dispatch, SetStateAction } from "react";
import { IdentityButton, ButtonMode } from '@civic/solana-gateway-react';

interface Props {
  setIdentityAttempt: Dispatch<SetStateAction<boolean>>;
}

export default function IdentitySection({setIdentityAttempt} : Props) {

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Verify your identity:
      </div>
      <div onClick={() => setIdentityAttempt(true)}>
      <IdentityButton mode={ButtonMode.LIGHT}  />
      </div>
    </div>
  );
}
