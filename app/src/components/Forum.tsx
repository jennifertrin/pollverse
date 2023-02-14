import { ForumID, ForumView } from "@usedispatch/forum";

export default function Forum() {
  const collectionId: ForumID = {
    forumID: "2GG7RuhTjXpjYZCkgenny8wY89VqLG1qZ66HHGn2FtF9",
  };

  return (
    <div className="w-full">
      <ForumView collectionId={collectionId} />
    </div>
  );
}
