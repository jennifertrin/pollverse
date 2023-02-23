import PayItem from "@/components/Pay/PayItem";
import { imageUtils } from "@/util/imageUtils";
import { useEffect, useState } from "react";

export default function DesignPage() {
  const [designs, setDesigns] = useState<any>();

  useEffect(() => {
    async function getAllDesigns() {
      const response = await fetch("/api/getAllDesigns");
      if (response.ok) {
        const data = await response.json();
        setDesigns(data);
      }
    }
    getAllDesigns();
  }, []);

  return (
    <div className="w-full ml-8 mt-8">
      <h1 className="text-5xl font-bold my-12">Your designs</h1>
      {designs
        ? designs?.allDesigns?.map(
            (design: {
              amount: number; _id: string; sceneName: string; sceneLink: string 
}) => (
              <PayItem
                key={design.sceneName}
                id={design._id}
                amount={design.amount}
                imageLink={imageUtils(design.sceneName)}
                imageAlt={design.sceneName}
                linkUrl={design.sceneLink}
              />
            )
          )
        : null}
    </div>
  );
}
