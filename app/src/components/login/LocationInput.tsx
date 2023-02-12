import React from "react";

type LocationInputProps = {
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function LocationInput({location, setLocation} : LocationInputProps) {
  return (
    <div className="w-full mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Location
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-first-name"
        type="text"
        defaultValue={location}
        onBlur={(e) => setLocation(e.target.value)}
        placeholder="Seattle, Washington, United States"
      />
    </div>
  );
}
