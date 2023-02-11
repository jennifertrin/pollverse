import React from "react";
import LocationInput from "./LocationInput";
import WalletSection from "./WalletSection";

export default function LocationSection() {
  return (
    <div className="flex flex-col h-screen w-full bg-white md:w-1/2 font-body">
      <div className="mx-10">
        <div className="flex font-bold mt-6 text-4xl">Welcome to Pollverse</div>
        <div className="flex mt-8 mb-6 font-normal  text-lg">
          Please sign in to proceed
        </div>
        <div className="flex flex-col gap-6">
          <LocationInput />
          <WalletSection />
        </div>
      </div>
    </div>
  );
}
