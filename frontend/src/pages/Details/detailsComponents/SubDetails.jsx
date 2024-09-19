import React from "react";

const SubDetails = ({ data, loading }) => {
  return (
    <div className="h-full w-full rounded-3xl flex flex-col items-center justify-center py-2 gap-2 bg-[#1e293b]">

      <div className="h-1/6 w-full centering text-[#C3E200] font-oswald text-2xl font-medium">
        DETAILS
      </div>

      <div className="h-5/6 w-full centering">
        <div className="w-11/12 h-full centering gap-2">

          <div className="w-1/3 h-full bg-black rounded-xl md:rounded-3xl centering flex-col gap-1 py-1">
            <div className="h-1/6 centering font-anton text-[#C3E200] text-xl ">SEASONS</div>
            <div className="h-1/2 centering font-alfa text-4xl 2xl:text-6xl text-[#B0B0B0]">{data?.number_of_seasons}</div>
            <div className="h-1/6 hidden md:block centering font-antonio text-[#B0B0B0] ">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</div>
          </div>

          <div className="bg-[#B0B0B0] w-[2px] rounded-full h-full"></div>

          <div className="w-1/3 h-full bg-black rounded-xl md:rounded-3xl centering flex-col gap-1 py-1">
            <div className="h-1/5 centering font-anton text-[#C3E200] text-xl ">EPISODES</div>
            <div className="h-3/5 centering font-alfa text-4xl 2xl:text-6xl text-[#B0B0B0]">{data?.number_of_episodes}</div>
          </div>

          <div className="bg-[#B0B0B0] w-[2px] rounded-full h-full"></div>

          <div className="w-1/3 h-full bg-black rounded-xl md:rounded-3xl centering flex-col gap-1 py-1">
            <div className="h-1/5 centering font-anton text-[#C3E200] text-xl ">STATUS</div>
            <div className="h-3/5 text-center centering font-alfa text-lg md:text-2xl 2xl:text-3xl text-[#B0B0B0]">{data?.status === 'Returning Series' ? 'Returning' : 'Ended'}</div>
          </div>

        </div>
      </div>
    </div>
    // <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e293b] gap-2 2xl:gap-4 rounded-3xl">
    //   <span className="text-[#C3E200] font-oswald uppercase text-2xl font-medium">Details</span>
    //   <div className="flex px-4 w-full gap-4">
    //     <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
    //         <span className="font-anton text-[#C3E200] text-xl">SEASONS</span>
    //         <span className="font-alfa text-5xl 2xl:text-6xl text-[#B0B0B0]">{data?.number_of_seasons}</span>
    //         <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span>
    //     </div>

    //     <div className="bg-[#B0B0B0] w-[2px] rounded-full"></div>

    //     <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
    //         <span className="font-anton text-[#C3E200] text-xl">EPISODES</span>
    //         <span className="font-alfa text-5xl 2xl:text-6xl text-[#B0B0B0]">{data?.number_of_episodes}</span>
    //         {/* <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span> */}
    //     </div>

    //     <div className="bg-[#B0B0B0] w-[2px]"></div>

    //     <div className="flex flex-col w-1/3 items-center bg-black py-2 rounded-2xl">
    //         <span className="font-anton text-[#C3E200] text-xl">STATUS</span>
    //         <span className="font-alfa text-2xl text-center text-[#B0B0B0]">{data?.status === 'Returning Series' ? 'Coming Soon' : 'Ended'}</span>
    //         {/* <span className="font-antonio text-[#B0B0B0]">{data?.number_of_episodes / data?.number_of_seasons} Ep/Season</span> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default SubDetails;
