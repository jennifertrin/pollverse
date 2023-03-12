import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IdentityButton, ButtonMode } from "@civic/solana-gateway-react";
import { useGateway } from "@civic/solana-gateway-react";

interface Props {
  setIdentityAttempt: Dispatch<SetStateAction<boolean>>;
}

export default function IdentitySection({ setIdentityAttempt }: Props) {
  const { gatewayStatus } = useGateway();

  useEffect(() => {
    if (gatewayStatus === 3 || gatewayStatus === 9 || gatewayStatus === 5) {
      setIdentityAttempt(true);
    }
  }, [gatewayStatus]);

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        3. Verify your identity:
      </div>
      <IdentityButton mode={ButtonMode.LIGHT} />
    </div>
  );
}
