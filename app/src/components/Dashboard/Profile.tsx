import React, { useEffect, useState } from "react";
import { CivicProfile, Profile } from "@civic/profile";
import { useWallet } from "@solana/wallet-adapter-react";
import NotificationsButton from "../NotificationsButton";

export default function ProfileSection() {
  const [civicProfile, setCivicProfile] = useState<any>();

  const { publicKey } = useWallet();

  async function getCivicProfile() {
    if (!publicKey) return;
    const profile: Profile = await CivicProfile.get(publicKey?.toString()).then(
      (response) => response
    );
    setCivicProfile(profile);
  }

  useEffect(() => {
    getCivicProfile();
  }, []);

  return (
    <div className="flex flex-row gap-8 font-body w-full">
      <div className="flex tracking-wide text-gray-700 text-3xl font-bold mb-2">
        Welcome,{" "}
        <span className="flex mt-1 ml-2 text-xl font-bold">User ID: {civicProfile?.did}</span>
      </div>
      <div className="flex">
        <NotificationsButton />
      </div>
    </div>
  );
}
