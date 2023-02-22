import PayItem from '@/components/Pay/PayItem';
import { useEffect, useState } from 'react';

export default function DesignPage() {
  const [designs, setDesigns] = useState<any>();

  useEffect(() => {
    const allDesigns = fetch('/api/getAllDesigns');
    if (allDesigns) setDesigns(allDesigns);
  }, [])

  return (
    <div className="w-full">
      {designs && designs.map((design: { sceneName: string; sceneLink: string; }) => (
        <PayItem key={design.sceneName} linkUrl={design.sceneLink} />
      ))}
    </div>
  );
}
