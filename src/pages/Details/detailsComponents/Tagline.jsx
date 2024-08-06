import React from "react";

const Tagline = ({data, loading}) => {
//   asdf;
  return (
    <div className="w-2/5 bg-[#1e293b] rounded-3xl flex flex-col items-center py-5">
        <span className="text-[#C3E200] font-oswald uppercase text-2xl font-medium">TAGLINE</span>
        <div className=" h-full flex items-center justify-center">
            <span className="font-alfa">{data?.tagline === "" ? <span className="text-red-400 uppercase">Tagline Unavailable</span> : data?.tagline}</span>
        </div>
    </div>
  );
};

export default Tagline;
