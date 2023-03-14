// import PayItem from "@/components/Pay/PayItem";
// import { imageUtils } from "@/util/imageUtils";
import { useEffect, useState } from "react";
// import { getAllProposals } from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";
import DesignList from "@/components/Pay/DesignList";
import ARDisplay from "@/components/Game/ARDisplay";

export default function DesignPage() {
  const [designs, setDesigns] = useState<any>();
  // const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    async function getAllDesigns() {
      const response = await fetch("/api/getAllDesigns");
      if (response.ok) {
        const data = await response.json();
        const newDesigns = data?.allDesigns?.filter(
          (design: any) => design.proposalName
        );
        if (newDesigns) {
          setDesigns(newDesigns);
        }
      }
    }
    getAllDesigns();
  }, []);

  // const connection = new Connection("https://api.devnet.solana.com");
  // const programId = new PublicKey(
  //   "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
  // );
  // const publicKey = new PublicKey(
  //   "3qnpdzqPZefVvD9LjJQee8oFTQAqWTbX1f3hSeh1SYAX"
  // );

  // useEffect(() => {
  //   async function getProposals() {
  //     const realms = await getAllProposals(connection, programId, publicKey);
  //     return realms;
  //   }

  //   async function fetchData() {
  //     const realms = await getProposals();
  //     const updatedProposals = realms[0].length > 0 ? realms[0] : realms[1];
  //     if (realms && updatedProposals) {
  //       setProposals(updatedProposals);
  //     }
  //     return updatedProposals;
  //   }

  //   fetchData().then((response) => console.log('response', response));
  // }, []);

  // function getCorrectProposal(proposalName: string) {
  //   const index = proposals.findIndex(
  //     (item) => item.account.name === proposalName
  //   );
  //   const correctProposal = proposals[index];
  //   return correctProposal;
  // }

  return (
    <div className="w-full mt-8">
      <h1 className="text-5xl font-bold my-12 ml-8">Your designs</h1>
      <div className="mb-8">
        {/* {designs
          ? designs?.map(
              (design: {
                proposalName: string;
                amount: number;
                _id: string;
                sceneName: string;
                sceneLink: string;
              }) => (
                <PayItem
                  key={design.sceneName}
                  id={design._id}
                  amount={design.amount}
                  title={design.sceneName}
                  imageLink={imageUtils(design.sceneName)}
                  imageAlt={design.sceneName}
                  linkUrl={design.sceneLink}
                  proposal={getCorrectProposal(design.proposalName)}
                />
              )
            )
          : null} */}
        <ARDisplay />
      </div>
      <DesignList />
    </div>
  );
}
