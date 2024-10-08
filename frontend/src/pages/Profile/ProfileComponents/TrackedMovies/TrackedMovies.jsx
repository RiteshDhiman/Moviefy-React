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
              onClick={() => navigate("/movie/now_playing")}
            >
              <span>See All</span>
              <FaArrowRight />
            </div>
          </div>

          <div>
            <ProfileCarousel data={data?.watchedMedia?.movies} endpoint={'movie'} handleOverlay={handleOverlay}/>
          </div>
        </ContentCenter>
      </div>

      {
        overlay && <OverlayProfile mediaType={'movie'} data={data?.watchedMedia?.movies} handleOverlay={handleOverlay}/>
      }
    </div>
  );
};

export default TrackedMovies;
