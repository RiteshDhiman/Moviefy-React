import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import LazyLoadImages from "../../../utilityComponent/LazyLoadImages";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const DetailsSlider = ({mediaType}) => {
  const {data, loading} = useFetch(`/${mediaType}/top_rated`)
  const [slider, setSlider] = useState(0);

  const handleNext = () => {
    setSlider(slider + 1)
  }
  const handlePrev = () => {
    setSlider(slider - 1)
  }

//   const imgArr = data?.results

  const {url} = useSelector((state)=>state.home)

//   console.log(typeof(imgArr))

  return (
    <div className="w-full h-full bg-[#1e293b] rounded-2xl flex flex-col items-center justify-between py-2">

      <div className="w-full text-center py-2">
        <div className="text-[#C3E200] font-oswald uppercase text-2xl font-medium">
          Top tv shows
        </div>
        <div className="bg-[#C3E200] h-[1.5px] w-full"></div>
      </div>

      <div className="w-4/5 flex gap-1 items-center justify-center">
        <FaArrowAltCircleLeft className="text-white text-9xl" onClick={handlePrev}/>
        <LazyLoadImages src={url + data?.results[slider].poster_path} className={'rounded-xl'}/>
        <FaArrowAltCircleLeft className="text-white text-9xl" onClick={handleNext}/>
      </div>
    </div>
  );
};

export default DetailsSlider;
