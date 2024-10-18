import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ContentCenter from "../../../utilityComponent/ContentCenter";
import ProfileCarousel from "../ProfileComponents/ProfileCarousel";
import OverlayProfile from "../ProfileComponents/OverlayProfile/OverlayProfile";

const WatchLaterMovies = ({data}) => {
  const navigate = useNavigate()
  const [overlay, setOverlay] = useState(false)

  const handleOverlay = () => {
    setOverlay(!overlay)
  }

  console.log(data)
  return (
    <div>
      <div>
        <ContentCenter>
          <div className="flex justify-between items-center mt-8 mb-4">
            <div className="text-xl md:text-3xl font-fina font-medium text-white">
              Watch Later
            </div>
            <div
              className="text-white flex w-[80px] justify-between items-center text-lg hover:text-[#c3e200] hover:cursor-pointer hover:scale-105 duration-200"
              onClick={() => navigate("/watchlist")}
            >
              <span>See All</span>
              <FaArrowRight />
            </div>
          </div>

          <div>
            {data?.length>0 ? 
              <ProfileCarousel data={data} endpoint={'movie'} handleOverlay={handleOverlay}/>
              :
              <div className="w-full bg-slate-600 h-[25vh] rounded-2xl centering font-roboto text-2xl text-slate-200">
                No Media in Watch Later 😞
              </div>
            }
          </div>
        </ContentCenter>
      </div>

      {
        overlay && <OverlayProfile mediaType={'movie'} data={data} handleOverlay={handleOverlay} overlay={overlay}/>
      }
    </div>
  );
};

export default WatchLaterMovies;
