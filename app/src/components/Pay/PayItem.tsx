import React, { useState } from "react";
import VoteItem from "./VoteItem";
import Link from "next/link";
import PopupModal from "./PopupModal";

interface Props {
  imageAlt?: string;
  imageLink?: string;
  linkUrl: any;
  id: string;
  amount: number;
  proposal: any;
  title: string;
}

export default function PayItem({
  amount,
  id,
  imageAlt,
  imageLink,
  linkUrl,
  proposal,
  title
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-slate-400 card w-3/4 shadow-xl flex flex-row gap-4 justify-between">
      <div className="flex flex-col w-1/4">
        <figure className="px-6 pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href={linkUrl} target="_blank">
            <img
              src={imageLink}
              alt={imageAlt}
              className="rounded-xl cursor-pointer"
            />
          </Link>
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <button className="btn btn-primary">
              <Link href={linkUrl} target="_blank">
                Explore design
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-3/4 justify-between">
        <div className="flex w-full">
          <VoteItem proposal={proposal} />
        </div>
        <button onClick={() => setOpen(!open)} className="btn btn-primary normal-case text-md text-white font-bold py-2 px-4 rounded m-auto mr-6">
          Donate To This Project
        </button>
        {open ? <PopupModal amount={amount} designTitle={title} open={open} setOpen={setOpen} /> : null}
      </div>
    </div>
  );
}
