import Forum from "../components/Forum";
import LoginSection from "@/components/login/LoginSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { SetStateAction, useState } from "react";

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
        <Forum />
      )}
    </div>
  );
}
