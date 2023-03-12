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
