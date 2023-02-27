import DashboardItem from "@/components/Dashboard/DashboardItem";
import ClaimButton from "@/components/Pay/ClaimButton";
import LoginSection from "@/components/login/LoginSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<string | undefined>();
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
      {!publicKey || !location || attemptLogin === false ? (
        <LoginSection
          attemptLogin={attemptLogin}
          setAttemptLogin={setAttemptLogin}
          location={location}
          setLocation={setLocation}
        />
      ) : (
        <div className="flex flex-col w-full gap-8 ml-4 mt-6 mb-8 px-0 lg:px-24 mx-auto">
          <ClaimButton />
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
