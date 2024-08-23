import React from "react";
import play from "../../../assets/play.png";
import dayjs from "dayjs";

const HeroBtn = ({ data, loading }) => {
  return (
    <div>
      <div className="mt-10 w-full flex gap-4 h-[100px]">
        <div className="hover:scale-95 duration-200 relative w-1/4 h-full bg-[#c4e200e4] rounded-3xl flex items-center font-poppins justify-center font-bold text-[#ababab]">
          <div className="absolute -left-5 transform -rotate-90 text-xl text-black">
            TRAILER
          </div>
          <img src={play} className="hover:scale-125 duration-300" />
        </div>

        <div className="hover:scale-95 duration-200 w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl"></div>

        <div className="flex flex-col items-center justify-center hover:scale-95 duration-200 w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl font-poppins font-bold text-[#ababab]">
          <div className="text-md">
            AIR DATE
          </div>

          <div className="font-oswald text-white text-3xl">
            {data?.first_air_date || data?.release_date
              ? dayjs(data?.first_air_date || data?.release_date).format(
                  "MMM D, YYYY"
                )
              : "N/A"}
          </div>
        </div>

        <div className="flex flex-col justify-center hover:scale-95 duration-200 w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl font-poppins font-bold text-[#ababab] cursor-pointer" title={data?.production_companies[0]?.name}>
          <div className="text-[#ababab] text-xl text-center">
            COMPANY
          </div>
          <div className="w-11/12 mx-auto font-oswald text-white text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
            {data?.production_companies[0]?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBtn;
