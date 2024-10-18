import React from "react";
import detailedDashboard from "../../assets/navbar/dashboard.png";
import watchlater from "../../assets/navbar/watchlater.png";
import heart from "../../assets/heart.png";
import { useNavigate } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";
import { IoMdTv } from "react-icons/io";

const MobileMenu = ({setMenu}) => {

  const navigate = useNavigate();

  return (
    <div className="absolute top-16 z-50 bg-slate-900 w-full flex flex-col text-white md:hidden centering gap-4 text-xl py-10 rounded-b-3xl">
      <div>
        <ul className="font-mukta font-medium text-3xl space-y-4">
          <li
            onClick={() => navigate("/profile")}
            className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2"
          >
            <img src={detailedDashboard} className="w-8" />
            <span>My Dashboard</span>
          </li>
          <li
            onClick={() => navigate("/watchlist")}
            className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2"
          >
            <img src={watchlater} className="w-8" />
            <span>My WatchLater</span>
          </li>
          <li
            onClick={() => navigate("/tv/top_rated")}
            className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2"
          >
            <img src={heart} className="w-8" />
            <span>My Favourites</span>
          </li>
        </ul>
      </div>

      <div className="w-full h-[1px] bg-[#c3e200]"></div>

      <div className="flex w-full">
        <div className="movies flex flex-col w-1/2 h-full gap-2">
          <div className="font-fina text-3xl font-bold text-[#c3e200] flex gap-2">
            <RiMovie2Fill />
            <span>Movies</span>
          </div>
          <div>
            <ul className="font-mukta font-medium text-xl space-y-2 mx-9">
              <li
                onClick={() => {
                  navigate("/trending/movie/week");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Trending</span>
              </li>

              <li
                onClick={() => {
                  navigate("/movie/now_playing");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>In Cinemas</span>
              </li>

              <li
                onClick={() => {
                  navigate("/movie/popular");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Popular</span>
              </li>

              <li
                onClick={() => {
                  navigate("/movie/top_rated");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Top Rated </span>
              </li>

              <li
                onClick={() => {
                  navigate("/movie/upcoming");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Upcoming</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="tv flex flex-col w-1/2 h-full gap-2">
          <div className="font-fina text-3xl font-bold text-[#c3e200] flex gap-2">
            <IoMdTv />
            <span>TV Shows</span>
          </div>
          <div>
            <ul className="font-mukta font-medium text-xl space-y-2 mx-9">
              <li
                onClick={() => {
                  navigate("/discover/tv");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Discover</span>
              </li>

              <li
                onClick={() => {
                  navigate("/trending/tv/week");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Trending</span>
              </li>

              <li
                onClick={() => {
                  navigate("/tv/top_rated");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Top Rated</span>
              </li>

              <li
                onClick={() => {
                  navigate("/tv/popular");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Popular</span>
              </li>

              <li
                onClick={() => {
                  navigate("/tv/airing_today");
                  setMenu(false);
                }}
                className="hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer"
              >
                <span>Airing Today</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
