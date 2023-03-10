import React, { useEffect, useState } from "react";
import { CivicProfile, Profile } from "@civic/profile";
import { useWallet } from "@solana/wallet-adapter-react";
import NotificationsButton from "../NotificationsButton";
import ClaimButton from "../Pay/ClaimButton";

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
        <div className="py-4 mt-4 dark:bg-gray-900 dark:text-gray-100">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img
              src={
                civicProfile?.image?.url
                  ? civicProfile?.image?.url
                  : "/city-icon.png"
              }
              alt={
                civicProfile?.image?.url
                  ? "Web3 Profile Image"
                  : "Icon of a city"
              }
              className="self-center flex-shrink-0 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700 max-h-24 max-w-24"
            />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {civicProfile?.did}
              </h4>
              <ClaimButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:py-8 p-12">
        <NotificationsButton />
      </div>
    </div>
  );
}
