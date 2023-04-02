import DashboardItem from "@/components/Dashboard/DashboardItem";
import ProfileSection from "@/components/Dashboard/Profile";
import FrontPageImage from "@/components/FrontPageImage";
import LoginSection from "@/components/login/LoginSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import TypeAnimation from "@/components/Game/TypeAnimation";

export default function Home() {
  const [location, setLocation] = useState<string | undefined>();
  const [identityAttempt, setIdentityAttempt] = useState<boolean>(false);
  const [attemptLogin, setAttemptLogin] = useState<boolean>(false);
  const { publicKey } = useWallet();

  const dashboardItems = [
    {
      buttonText: "Go",
      linkUrl: "/forum",
      imageAlt: "Icon of voting",
      imageLink: "/civic-involvement.png",
      subTitle: "Help governments make decisions",
      title: "Your Forum",
    },
    {
      buttonText: "Go",
      linkUrl: "/designs",
      imageAlt: "Icon of city view",
      imageLink: "/city-scene.png",
      subTitle: "Experience upcoming design plans",
      title: "Your City Designs",
    },
  ];

  return (
    <div>
      {!publicKey ||
      !location ||
      attemptLogin === false ||
      identityAttempt === false ? (
        <div className="flex flex-rol">
          <LoginSection
            attemptLogin={attemptLogin}
            identityAttempt={identityAttempt}
            setAttemptLogin={setAttemptLogin}
            location={location}
            setLocation={setLocation}
            setIdentityAttempt={setIdentityAttempt}
          />
          <FrontPageImage />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-2 ml-4 mt-2 mb-8 px-0 lg:px-24 mx-auto">
          <ProfileSection />
          <TypeAnimation />
          <a href="https://co2.storage/assets">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 gap-4 mb-4 rounded inline-flex items-center">
                <span>Go to Eco Game Assets Database</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </button>
            </a>
          <div className="flex flex-row gap-12">
            {dashboardItems.map((item) => (
              <div key={item.title}>
                <DashboardItem
                  buttonText={item.buttonText}
                  imageAlt={item.imageAlt}
                  imageLink={item.imageLink}
                  linkUrl={item.linkUrl}
                  subTitle={item.subTitle}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
