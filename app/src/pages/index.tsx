import Forum from "../components/Forum";
import LoginSection from "@/components/login/LoginSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Home() {
  const [location, setLocation] = useState<string | undefined>();
  const [attemptLogin, setAttemptLogin] = useState<boolean>(false);
  const { publicKey } = useWallet();

  return (
    <div>
      {!publicKey || !location || !attemptLogin ? (
        <LoginSection
          attemptLogin={attemptLogin}
          setAttemptLogin={setAttemptLogin}
          location={location}
          setLocation={setLocation}
        />
      ) : (
      <div className="h-screen w-2/3 m-auto">
      <Tabs className="mt-8">
        <TabList className="font-bold text-md">
          <Tab>Your City Plans</Tab>
          <Tab>Your Proposals</Tab>
        </TabList>
        <TabPanel className="mt-6">
          <div>Coming Soon!</div>
        </TabPanel>
        <TabPanel>
          <div><Forum /></div>
        </TabPanel>
      </Tabs>
      </div>
      )}
    </div>
  );
}
