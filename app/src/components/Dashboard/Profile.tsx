import React, { useEffect, useState } from "react";
import { CivicProfile, Profile } from "@civic/profile";
import { useWallet } from "@solana/wallet-adapter-react";
import NotificationsButton from "../NotificationsButton";
import ClaimButton from "../Pay/ClaimButton";

export default function ProfileSection() {
  const [civicProfile, setCivicProfile] = useState<any>();
  const [bound, setBound] = useState<number>();
  const [boundColor, setBoundColor] = useState<string>();

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

  useEffect(() => {
    async function getEmissionsData() {
      const response = await fetch(
        "https://api.filgreen.d.interplanetary.one/models/model?id=5&start=2023/03/05&end=2023/03/06"
      ).then((resp) => resp.json());
      if (response) {
        setBound(parseInt(response?.data[1].data[1]?.value));
        setBoundColor(response?.data[1]?.color);
      }
    }
    getEmissionsData();
  }, []);

  const color = boundColor === 'silver' ? 'slate' : boundColor;

  return (
    <div className="flex border shadow-lg bg-indigo-300 rounded-3xl px-8 py-2 my-6 flex-row gap-8 font-body w-full">
      <div className="flex tracking-wide text-gray-700 text-3xl font-bold mb-2">
        <div className="mt-4 dark:bg-gray-900 dark:text-gray-100">
          <span className="text-2xl font-boldest">Your Superhero Profile</span>
          <div className="flex flex-col mt-4 space-y-4 space-between md:space-y-0 md:space-x-6 md:flex-row">
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
      <div className="flex h-12 m-auto">
        {bound ? (
          <span
            className={`inline-flex items-center bg-${color}-200 text-${color}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-${color}-900 dark:text-${color}-300`}
          >
            <span
              className={`w-6 h-2 mr-4 bg-${color}-500 rounded-full`}
            ></span>
            {bound?.toLocaleString()} kwh used today
          </span>
        ) : null}
        <div>
          <NotificationsButton />
        </div>
      </div>
    </div>
  );
}
