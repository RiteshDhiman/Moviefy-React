import React from "react";

const Tagline = ({data, loading}) => {
//   asdf;
  return (
    <div className="w-full h-full bg-[#1e293b] rounded-3xl flex flex-col items-center py-5">
        <span className="text-[#C3E200] font-oswald uppercase text-2xl font-medium">TAGLINE</span>
        <div className=" h-full flex items-center justify-center text-center text-2xl">
            <span className="font-alfa">{data?.tagline === "" ? <span className="text-red-400 uppercase">Tagline Unavailable</span> : <span className="text-white">" {data?.tagline} "</span>}</span>
        </div>
    </div>
  );
};

export default Tagline;
