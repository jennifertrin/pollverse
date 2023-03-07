import { ForumID, ForumView } from "@usedispatch/forum";

export default function Forum() {

  const collectionId: ForumID = {
    forumID: "AJw2ySYn5UkLi88U8KX8MUMzkE3Q3fkJiEsxQC8CSZLa",
  };

  return (
    <div className="w-full">
      <ForumView collectionId={collectionId} />
    </div>
  );
}
