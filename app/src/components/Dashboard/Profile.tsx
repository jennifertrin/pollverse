import React, { useEffect, useState } from "react";
import { CivicProfile, Profile } from "@civic/profile";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ProfileSection() {
  const [civicProfile, setCivicProfile] = useState<any>();

  const { publicKey } = useWallet();

  async function getCivicProfile() {
    if (!publicKey) return;
    const profile: Profile = await CivicProfile.get(publicKey?.toString()).then(response => response);
    setCivicProfile(profile);
  }

  useEffect(() => {
    getCivicProfile();
  }, []);

  return (
    <div className="flex flex-col font-body w-full">
      <div className="block tracking-wide text-gray-700 text-3xl font-bold mb-2">
        Welcome, <span className="text-xl font-bold">User ID: { civicProfile?.did }</span>
      </div>
      <div />
      </div>
  );
}