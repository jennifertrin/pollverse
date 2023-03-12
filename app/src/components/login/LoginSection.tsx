import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import WalletSection from "./WalletSection";
import { useWallet } from "@solana/wallet-adapter-react";
import IdentitySection from "./IdentitySection";

interface Props {
  attemptLogin: boolean;
  identityAttempt: boolean;
  setAttemptLogin: Dispatch<SetStateAction<boolean>>;
  location: string | undefined;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
  setIdentityAttempt: Dispatch<SetStateAction<boolean>>;
}

export default function LocationSection({
  attemptLogin,
  identityAttempt,
  setAttemptLogin,
  location,
  setLocation,
  setIdentityAttempt
}: Props) {
  const { publicKey } = useWallet();

  useEffect(() => {
    async function login() {
      const login = await fetch(`/api/user/${publicKey}/${location}`).then(response => response.json());
      if (!login.address || !login.location) {
        setAttemptLogin(false);
      } setAttemptLogin(true);
    }
    if (publicKey && location && identityAttempt) {
      login();
    }
  }, [attemptLogin, identityAttempt, location, publicKey, setAttemptLogin]);

  return (
    <div className="flex flex-col h-screen w-full md:w-1/2 font-body">
      <div className="mx-10">
        <div className="flex font-bold mt-6 text-4xl">Welcome to Pollverse</div>
        <div className="flex mt-8 mb-6 font-normal  text-lg">
          Sign in to make an impact.
        </div>
        <div className="flex flex-col gap-6">
          <WalletSection />
          <LocationInput location={location} setLocation={setLocation} />
          <IdentitySection setIdentityAttempt={setIdentityAttempt} />
          <div className="flex mt-6">
            <button
              disabled={!location || !publicKey}
              className="bg-primary disabled:bg-blue-200 text-white w-full font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
