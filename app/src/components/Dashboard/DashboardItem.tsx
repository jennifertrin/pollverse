import React from "react";
import { useRouter } from "next/router";

interface Props {
  buttonText: string;
  imageAlt?: string;
  imageLink?: string;
  linkUrl: any;
  subTitle: string;
  title: string;
}

export default function DashboardItem({
  buttonText,
  imageAlt,
  imageLink,
  linkUrl,
  subTitle,
  title,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex rounded-2xl bg-base-100 shadow-xl px-4 py-6">
      {imageLink && imageAlt ? (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageLink} alt={imageAlt} />
        </figure>
      ) : null}
      <div className="card-body px-12">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-lg">{subTitle}</p>
        <div className="card-actions mt-3 justify-end">
          <button
            onClick={() => router.push(linkUrl)}
            className="btn btn-primary w-full"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
