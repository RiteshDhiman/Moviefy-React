import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ContentCenter from "../../../utilityComponent/ContentCenter";
import ProfileCarousel from "../ProfileComponents/ProfileCarousel";

const WatchLaterMovies = ({data}) => {
  const navigate = useNavigate()
  console.log(data)
  return (
    <div>
      <div>
        <ContentCenter>
          <div className="flex justify-between items-center mt-8 mb-4">
            <div className="text-xl md:text-3xl font-fina font-medium text-white">
              Watch Later Movies
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
            <ProfileCarousel data={data} endpoint={'movie'}/>
          </div>
        </ContentCenter>
      </div>
    </div>
  );
};

export default WatchLaterMovies;
