import React, { useEffect, useState } from "react";
import { CivicProfile, Profile } from "@civic/profile";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ProfileSection() {
  const [civicProfile, setCivicProfile] = useState<any>();

  const { publicKey } = useWallet();

  async function getCivicProfile() {
    if (!publicKey) return;
    const profile: Profile = await CivicProfile.get(publicKey?.toString());
    return profile;
  }

  useEffect(() => {
    setCivicProfile(getCivicProfile());
  }, []);

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
        Welcome,{' '}
      </div>
      <div className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
        User ID: { publicKey?.toString() }
      </div>
      <div />
      </div>
  );
}