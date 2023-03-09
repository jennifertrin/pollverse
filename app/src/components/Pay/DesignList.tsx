import React, { useEffect, useState } from "react";
import DesignItem from "./DesignItem";

export default function DesignList() {
  const [designs, setDesigns] = useState<any>();

  useEffect(() => {
    async function getAllDesigns() {
      const response = await fetch("/api/getAllDesigns");
      if (response.ok) {
        const data = await response.json();
        const newDesigns = data?.allDesigns?.filter(
          (design: any) => !design.proposalName
        );
        if (newDesigns) {
          setDesigns(newDesigns);
        }
      }
    }
    getAllDesigns();
  }, []);

  function getSceneLink(sceneImageName: string) {
    const sceneLink = "/games/" + sceneImageName;
    return sceneLink;
  }

  return (
    <div className="flex flex-row mx-auto">
      {designs?.map((design: any) => (
        <DesignItem
          designTitle={design.sceneName}
          designDescription={design.sceneDescription}
          imageSrc={getSceneLink(design.sceneLink)}
        />
      ))}
    </div>
  );
}
