import React from 'react';
import dynamic from 'next/dynamic';

const ReactPhotoSphereViewer = dynamic(
  () =>
    import('react-photo-sphere-viewer').then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);

export default function FrontPageImage() {  
  return (
    <div className="flex w-screen h-screen">
      <ReactPhotoSphereViewer src="nyc-design.png" height={'100%'} width={"100%"} container={'App'} />
    </div>
  );
}