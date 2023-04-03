import React, { useState } from "react";
import PhotoSphereViewer from "./PhotoSphereViewer";
import PopupModal from "./PopupModal";

interface Props {
  designTitle: string;
  designDescription: string;
  imageSrc: string;
  gameAsset?: string;
}

export default function DesignItem({
  designDescription,
  designTitle,
  imageSrc,
  gameAsset,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 bg-slate-300 px-8 py-6 rounded-lg h-full w-full md:h-86 md:w-2/5">
      <div className="flex flex-col">
        <h1 className="flex text-4xl font-bold mt-8">{designTitle}</h1>
        <div className="flex text-md mt-4 mb-4">{designDescription}</div>
        <a href={gameAsset}>
          <button className="btn btn-primary mb-4 w-full normal-case text-md text-white font-bold py-2 px-4 rounded">
            Get Game Asset
          </button>
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-primary normal-case text-md text-white font-bold py-2 px-4 rounded"
        >
          Donate To This Project
        </button>
        {open ? (
          <PopupModal
            amount={10}
            designTitle={designTitle}
            open={open}
            setOpen={setOpen}
          />
        ) : null}
      </div>
      <div className="flex flex-row gap-4 m-auto mb-4 h-full w-full">
        <PhotoSphereViewer imageSrc={imageSrc} />
      </div>
    </div>
  );
}
