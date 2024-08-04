import React from "react";

const SubDetails = ({ data, loading }) => {
//   asdsdfsdf;
  return (
    <div className="w-3/5 flex flex-col items-center py-5 bg-[#141a1e] gap-4 rounded-3xl">
      <span className="text-[#C3E200] font-oswald uppercase text-2xl font-medium">Details</span>
      <div className="flex px-4 w-full gap-4">
        <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
            <span className="font-anton text-[#C3E200] text-xl">SEASONS</span>
            <span className="font-alfa text-6xl text-[#B0B0B0]">{data?.number_of_seasons}</span>
            <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span>
        </div>

        <div className="bg-[#B0B0B0] w-[2px] rounded-full"></div>

        <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
            <span className="font-anton text-[#C3E200] text-xl">EPISODES</span>
            <span className="font-alfa text-6xl text-[#B0B0B0]">{data?.number_of_episodes}</span>
            {/* <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span> */}
        </div>

        <div className="bg-[#B0B0B0] w-[2px]"></div>

        <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
            <span className="font-anton text-[#C3E200] text-xl">STATUS</span>
            <span className="font-alfa text-2xl text-center text-[#B0B0B0]">{data?.status === 'Returning Series' ? 'Coming Soon' : 'Ended'}</span>
            {/* <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span> */}
        </div>
      </div>
    </div>
  );
};

export default SubDetails;
