import Forum from "@/components/Forum";
import LoginSection from "@/components/login/LoginSection";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();

  return (
  <div>
    {!publicKey ? <LoginSection /> : <Forum />}
  </div>
  )
}
