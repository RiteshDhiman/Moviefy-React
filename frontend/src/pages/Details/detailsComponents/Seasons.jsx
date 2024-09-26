import React, { useState } from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages';
import CircleRating from '../../../utilityComponent/CircularRating';
import noposter from "../../../assets/no-poster.png"
import OverlayEpisodes from '../OverlayEpisodes';
import { motion } from 'framer-motion'

const Seasons = ({data, loading, userId}) => {

    const [showEps, setShowEps] = useState(false)
    const [ep, setEp] = useState(0)
    const posterImg = useSelector((state)=>state.home)
    const seasonCount = data?.number_of_seasons
    const seriesName = data?.title || data?.name
    const posterPath = data?.poster_path

    const handleEpisode = (episode) => {
      setShowEps(!showEps)
      setEp(episode);
    }

  return (
    <div className='w-full text-white mt-24'>

      <ContentCenter>
        <div className='text-xl md:text-3xl font-fina font-medium my-6'>Seasons and Episodes</div>

        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8 md:gap-12 xl::gap-16'>

           {
            data?.seasons.map((item)=>(

            item.name != "Specials" && 
            <div key={item.id} className='flex h-[32vh] xl:h-[35vh] 2xl:h-[32vh] bg-[#1e293b83] w-full xl:w-11/12 rounded-xl md:rounded-3xl'>
              <div className='w-2/5 2xl:w-[40%] h-full'>
                <img src={item.poster_path ? posterImg.url + item.poster_path : noposter} className="h-full w-full rounded-3xl opacity-85 shadow-2xl shadow-black hover:scale-105 duration-300"/>
              </div>
              
              <div className='w-3/5 centering flex-col h-full gap-2 md:py-5'>
                <div className='w-full flex flex-col justify-center items-center gap-2'>
                  <div className='font-oswald uppercase text-2xl md:text-4xl text-center font-semibold'>
                    {item.name}
                  </div>

                  <div className='h-[1px] bg-white w-3/5 rounded-full'></div>
                  
                  <div className='font-poppins text-sm md:text-lg'>
                    {item.episode_count} Episodes
                  </div>

                  <CircleRating rating={item.vote_average} width={'w-10 md:w-16'}/>

                </div>
                <div className='h-1/3 w-full flex items-center justify-center'>
                  <motion.button 
                    className='flex items-center justify-center h-4/5 w-4/5 rounded-2xl bg-[#c3e200] gap-5'
                    onClick={()=>handleEpisode(item.season_number)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10  }}
                  >
                    <span className='font-oswald text-xl md:text-lg lg:text-2xl text-black font-semibold'>
                      EPISODES
                    </span>
                    <FaArrowRight className='text-2xl md:text-2xl lg:text-3xl text-black'/>
                  </motion.button>
                </div>
              </div>
            </div>
           ))}
        </div>
      </ContentCenter>
      {
        showEps && <OverlayEpisodes posterPath={posterPath} seriesName={seriesName} seasonCount={seasonCount} userId={userId} seasonNumber={ep} seriesid={data?.id} handleEpisode={handleEpisode}/>
      }
    </div>
  )
}

export default Seasons
