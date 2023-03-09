import React from 'react';
import dynamic from 'next/dynamic';

interface Props {
    imageSrc: string;
}

const ReactPhotoSphereViewer = dynamic(
  () =>
    import('react-photo-sphere-viewer').then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);

export default function FrontPageImage({imageSrc} : Props) {  
  return (
    <div className="flex w-screen h-screen">
      <ReactPhotoSphereViewer src={imageSrc} height={'100%'} width={"100%"} container={'App'} />
    </div>
  );
}