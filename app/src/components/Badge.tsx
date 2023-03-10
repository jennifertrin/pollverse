import React from "react";

interface Props {
  name: string;
}

export default function Badge({ name }: Props) {
  return (
    <div className="flex rounded-full py-1 px-4 font-medium border text-white bg-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 mr-2 mt-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {name}
    </div>
  );
}
