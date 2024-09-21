import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import close from '../../assets/close.png'
import { RiMovie2Fill } from "react-icons/ri";
import { IoMdTv } from "react-icons/io";
import heart from '../../assets/heart.png'
import watchlater from '../../assets/navbar/watchlater.png'
import dashboard from '../../assets/navbar/dashboard.png'

const DetailedMenu = ({setDetailedMenu}) => {

  const navigate = useNavigate()

  return (
    <motion.div
      className='absolute top-[9vh] 2xl:top-[7vh] z-50 w-11/12 mx-auto bg-black text-white py-10 rounded-b-3xl'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={()=>setDetailedMenu(true)}
      onMouseLeave={()=>setDetailedMenu(false)}
    >
      <div className='absolute top-4 right-5 z-50'>
        <img src={close} className='w-5 md:w-6 invert hover:scale-110 duration-200 cursor-pointer' onClick={()=>setDetailedMenu(false)}/>
      </div>

      <div className='w-4/5 mx-auto h-full flex gap-3'>

        <div className='movies flex flex-col w-1/3 h-full gap-2'>
          <div className='font-fina text-4xl font-bold text-[#c3e200] flex gap-2'>
            <RiMovie2Fill/>
            <span>Movies</span>
          </div>
          <div>
            <ul className='font-mukta font-medium text-xl space-y-2 mx-11'>
              <li 
                onClick={()=>navigate('/trending/movie/week')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Trending</span>
              </li>

              <li 
                onClick={()=>navigate('/movie/now_playing')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>In Cinemas</span>
              </li>
              
              <li 
                onClick={()=>navigate('/movie/popular')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Popular</span>
              </li>
              
              <li 
                onClick={()=>navigate('/movie/top_rated')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Top Rated </span>
              </li>
              
              <li 
                onClick={()=>navigate('/movie/upcoming')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Upcoming Movies</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='tv flex flex-col w-1/3 h-full gap-2'>
          <div className='font-fina text-4xl font-bold text-[#c3e200] flex gap-2'>
            <IoMdTv/>
            <span>TV Shows</span>
          </div>
          <div>
            <ul className='font-mukta font-medium text-xl space-y-2 mx-12'>
            <li 
                onClick={()=>navigate('/discover/tv')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Discover</span>
              </li>
              
              <li 
                onClick={()=>navigate('/trending/tv/week')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Trending</span>
              </li>

              <li 
                onClick={()=>navigate('/tv/top_rated')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Top Rated</span>
              </li>
              
              <li 
                onClick={()=>navigate('/tv/popular')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Popular</span>
              </li>
              
              <li 
                onClick={()=>navigate('/tv/airing_today')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer'
              >
                <span>Airing Today</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='w-1/3 h-full py-8 gap-2'>
          <ul className='font-mukta font-medium text-2xl space-y-4'>
            <li 
                onClick={()=>navigate('/tv/top_rated')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2'
            >
              <img src={heart} className='w-8'/>
              <span>My Favourites</span>
            </li>

            <li 
                onClick={()=>navigate('/profile')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2'
            >
              <img src={dashboard} className='w-8'/>
              <span>My Dashboard</span>
            </li>

            <li 
                onClick={()=>navigate('/watchlist')}
                className='hover:text-[#c3e200] hover:scale-105 duration-150 cursor-pointer flex items-center gap-2'
            >
              <img src={watchlater} className='w-8'/>
              <span>My WatchLater</span>
            </li>


          </ul>
        </div>

      </div>
    </motion.div>
  )
}

export default DetailedMenu
