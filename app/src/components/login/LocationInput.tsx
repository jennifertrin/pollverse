import React from "react";

export default function LocationInput() {
  return (
    <div className="w-full mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Location
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-first-name"
        type="text"
        placeholder="Seattle, Washington, United States"
      />
    </div>
  );
}
