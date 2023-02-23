import React from "react";
import { useRouter } from "next/router";

interface Props {
  imageAlt?: string;
  imageLink?: string;
  linkUrl: any;
}

export default function PayItem({ imageAlt, imageLink, linkUrl }: Props) {
  const router = useRouter();

  return (
    <div className="bg-slate-400 card w-96 shadow-xl">
      <figure className="px-10 pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          onClick={() => router.push(linkUrl)}
          src={imageLink}
          alt={imageAlt}
          className="rounded-xl cursor-pointer"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="card-actions">
          <button
            onClick={() => router.push(linkUrl)}
            className="btn btn-primary"
          >
            Explore design
          </button>
        </div>
      </div>
    </div>
  );
}
