import React from "react";
import PhotoSphereViewer from './PhotoSphereViewer';

interface Props {
  designTitle: string,
  designDescription: string,
  imageSrc: string,
}

export default function DesignItem({ designDescription, designTitle, imageSrc }: Props) {

  return (
    <div className="flex flex-col gap-4 bg-slate-300 px-8 py-6 rounded-lg h-full w-full md:h-86 md:w-1/2">
      <div className="flex flex-col">
        <h1 className="flex text-4xl font-bold mt-8">{designTitle}</h1>
        <div className="flex text-md mt-4 mb-4">{designDescription}</div>
      </div>
      <div className="flex flex-row gap-4 m-auto mb-4 h-full w-full">
        <PhotoSphereViewer imageSrc={imageSrc} />
      </div>
    </div>
  );
}
