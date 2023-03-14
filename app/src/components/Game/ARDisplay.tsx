import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const ARDisplay = () => {
  const [experiences, setExperiences] = useState<any>();

  useEffect(() => {
    async function getAllExperiences() {
      const response = await fetch("/api/getAllExperiences");
      if (response.ok) {
        const data = await response.json();
        const newExperiences = data?.allAR;
        if (newExperiences) {
          setExperiences(newExperiences);
        }
      }
    }
    getAllExperiences();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mb-4 h-full w-screen justify-center">
      {experiences
        ? experiences.map(
            (experience: {
              name: string;
              proposalLink: string;
              videoLink: string;
              arLink: string;
            }) => (
              <div className="flex flex-wrap w-full h-full justify-center">
                <a className="flex flex-wrap w-4/5 h-96 mb-6" href={experience?.arLink}>
                  <div className="flex flex-col m-auto justify-center items-center rounded-2xl bg-slate-200 shadow-lg h-full w-full py-6 px-6">
                    <div className="h-full w-full">
                      <div className="w-full h-2/3 m-auto">
                        <ReactPlayer url={experience?.videoLink} width="100%" height="100%" />
                        <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"></button>
                      </div>
                      <div className="mb-3 mt-6 flex items-center justify-between px-1 md:items-start">
                        <div className="mb-2">
                          <p className="text-lg font-bold text-navy-700">
                            {" "}
                            {experience?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 right-0">
                        <a href={experience?.arLink}>
                          <button className="flex linear rounded-xl bg-primary px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700">
                            Experience in AR
                          </button>
                        </a>
                        <a href={experience?.proposalLink}>
                          <button className="flex linear rounded-xl bg-primary px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700">
                            Go to Proposal
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          )
        : null}
    </div>
  );
};

export default ARDisplay;
