import React, { useEffect, useState } from "react";
import play from "../../../assets/play.png";
import dayjs from "dayjs";
import useFetch from '../../../hooks/useFetch'
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeroBtn = ({ btndata, btnloading, mediaType, id }) => {

  const navigate = useNavigate()

  const {data, loading} = mediaType === 'tv' ? useFetch(`/tv/${id}/videos`) : useFetch(`/${mediaType}/${id}/videos`)

  const [trailerId, setTrailerId] = useState(null);

  const trailer = (trailerId) => {
    if(trailerId == null){
      toast.warning('Sorry Trailer not Available')
    }
    else{
      window.open(`https://www.youtube.com/watch?v=${trailerId}`, '_blank');
    }
  }

  useEffect(() => {
    if (data?.results) {
      const trailer = data.results.find(
        (video) => video.name === "Final Trailer" || video.type === "Trailer"
      );
      setTrailerId(trailer?.key || null);
    }
  }, [data]);

  return (
    <div>
      <div className="mt-2 md:mt-10 w-full grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 h-[100px]">
        <div className="hover:scale-95 duration-200 relative w-full h-full bg-[#c4e200e4] rounded-2xl md:rounded-3xl flex items-center font-poppins justify-center font-bold text-[#ababab] hover:cursor-pointer" onClick={()=>trailer(trailerId)}>
          <div className="absolute -left-5 transform -rotate-90 text-lg md:text-xl text-black">
            TRAILER
          </div>
          <img src={play} className="hover:scale-125 duration-300 h-2/3" />
        </div>

        <div className="flex flex-col items-center justify-center hover:scale-95 duration-200 w-full md:h-full bg-[#15202a] bg-opacity-70 rounded-3xl font-poppins font-bold text-[#ababab] hover:cursor-pointer">
          <div className="text-[#ababab] text-md md:text-xl">
            {mediaType === 'tv' ? 'TYPE' : 'BUDGET'}
          </div>
          {
            mediaType === 'tv' ?
            (
              <div className="font-oswald text-white text-2xl md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
                {btndata?.type}
              </div>  
            )
            :
            (
              <div className="font-oswald text-white text-2xl md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
                {btndata?.budget ? `$ ${btndata?.budget / 1000000} Million` : `N/A`}
              </div>
            )
          }
        </div>

        <div className="flex flex-col items-center justify-center hover:scale-95 duration-200 w-full py-4 md:py-0 md:h-full bg-[#15202a] bg-opacity-70 rounded-3xl font-poppins font-bold text-[#ababab] hover:cursor-pointer">
          <div className="text-md">
            AIR DATE
          </div>

          <div className="font-oswald text-white text-2xl md:text-3xl">
            {btndata?.first_air_date || btndata?.release_date
              ? dayjs(btndata?.first_air_date || btndata?.release_date).format(
                  "MMM D, YYYY"
                )
              : "N/A"}
          </div>
        </div>

        <div className="flex flex-col justify-center hover:scale-95 duration-200 w-full md:h-full bg-[#15202a] bg-opacity-70 rounded-3xl font-poppins font-bold text-[#ababab] cursor-pointer" title={btndata?.production_companies[0]?.name}>
          <div className="text-[#ababab] text-md md:text-xl text-center">
            COMPANY
          </div>
          <div className="w-11/12 mx-auto font-oswald text-white text-2xl md:text-3xl text-center whitespace-nowrap overflow-hidden overflow-ellipsis">
            {btndata?.production_companies[0]?.name}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroBtn;
