import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Carousel from "../../../../components/Carousel/Carousel";
import ContentCenter from "../../../../utilityComponent/ContentCenter";
import ProfileCarousel from "../ProfileCarousel";
import OverlayProfile from "../OverlayProfile/OverlayProfile";

const TrackedMovies = ({data}) => {

  const [overlay, setOverlay] = useState(false)

  const handleOverlay = () => {
    setOverlay(!overlay)
  }

  const navigate = useNavigate()
  console.log(data)
  return (
    <div>
      <div>
        <ContentCenter>
          <div className="flex justify-between items-center mt-8 mb-4">
            <div className="text-xl md:text-3xl font-fina font-medium text-white">
              Tracked Movies
            </div>
            <div
              className="text-white flex w-[80px] justify-between items-center text-lg hover:text-[#c3e200] hover:cursor-pointer hover:scale-105 duration-200"
              onClick={() => handleOverlay()}
            >
              <span>See All</span>
              <FaArrowRight />
            </div>
          </div>

          <div>
            {data?.watchedMedia?.movies?.length > 0 ? 
              (<ProfileCarousel data={data?.watchedMedia?.movies} endpoint={'movie'} handleOverlay={handleOverlay}/>)
              :
              <div className="w-full bg-slate-600 h-[25vh] rounded-2xl centering font-roboto text-2xl text-slate-200">
                No Movies Tracked 😞
              </div>
            }
          </div>
        </ContentCenter>
      </div>

      {
        overlay && <OverlayProfile mediaType={'movie'} data={data?.watchedMedia?.movies} handleOverlay={handleOverlay} overlay={overlay}/>
      }
    </div>
  );
};

export default TrackedMovies;
