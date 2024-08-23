import React from "react";
import { useSelector } from "react-redux";
import ContentCenter from "../../../utilityComponent/ContentCenter";
import HeroBtn from "./HeroBtn";
import LazyLoadImages from "../../../utilityComponent/LazyLoadImages";

const DetailsHerobanner = ({ data, loading }) => {

  const posterImg = useSelector((state)=>state.home)

  const epCount = () => {
    let count = 0;
    data?.seasons.map((item)=>{
      count += item.episode_count
    })

    return count;
  }

  return (
    <div className="relative w-full h-[60vh]">
      <div className="absolute z-10 w-full h-full">
        <img
          src={posterImg.url + data?.backdrop_path}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* <div className="w-4/5 mx-auto 2xl:w-5/6">
        <div className="absolute w-full bg-red-200 md:w-1/2 h-1/3 z-20 bottom-1/4 flex flex-col gap-4 text-white">
          <div className="font-oswald text-3xl md:text-5xl font-bold uppercase">
            {data?.title || data?.name}
          </div>
          {data?.number_of_seasons ? (
            <div className="font-poppins">
              {data?.seasons.length} Seasons • {epCount()} Episodes
            </div>
          ) : (
            <div className="font-poppins">
              Runtime : {data?.runtime} Minutes
            </div>
          )}
          <div className="flex gap-3">
            {data?.genres.map((genre) => {
              return (
                <div
                  key={genre.id}
                  className="hover:scale-95 duration-200 flex justify-center items-center border-white rounded-lg border-[1px] md:px-2 md:py-1 bg-[#464847] bg-opacity-50"
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
        </div>

        <HeroBtn data={data} loading={loading}/>

        <div className="hidden md:block text-white absolute z-30 -bottom-14 right-0 w-1/6 mr-36 rounded-xl">
          <img src={posterImg.url + data?.poster_path} className="rounded-xl" />
        </div>
      </div> */}
      <div className="w-full absolute z-50 top-1/3 text-white">
        <div className="w-4/5 mx-auto flex">

          <div className="w-3/4 flex flex-col gap-3">
            <div className="font-oswald text-3xl md:text-5xl font-bold uppercase">
              {data?.title || data?.name}
            </div>

            {
              data?.number_of_seasons ? 
                <div className="font-poppins">{data?.seasons.length} Seasons • {epCount()} Episodes</div>
              :
                <div className="font-poppins">Runtime : {data?.runtime} Minutes</div>
            }

            <div className="flex gap-3">
              {data?.genres.map((genre)=>{
                return (
                  <div key={genre.id} className="border-white border-2 rounded-lg px-2 py-1 bg-[#464847] bg-opacity-50 hover:scale-95 duration-200 cursor-pointer">
                    {genre.name}
                  </div>
                )
              })}
            </div>

            <HeroBtn data={data} loading={loading}/>

          </div>

          <div className="w-1/4 flex justify-end">
            <img src={posterImg.url + data?.poster_path} alt="Poster Unavailable" className="w-5/6 rounded-xl"/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsHerobanner;
