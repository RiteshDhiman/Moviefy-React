import React, { useState } from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages';
import CircleRating from '../../../utilityComponent/CircularRating';
import noposter from "../../../assets/no-poster.png"
import OverlayEpisodes from '../OverlayEpisodes';

const Seasons = ({data, loading, userId}) => {

    console.log(data)
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
    <div className='w-full text-white'>

      <ContentCenter>

        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8 md:gap-16'>

           {
            data?.seasons.map((item)=>(

            <div key={item.id} className='flex h-[40vh] bg-[#1e293b83] w-11/12 rounded-3xl'>
              <div className='w-1/2 h-full'>
                <img src={item.poster_path ? posterImg.url + item.poster_path : noposter} className="h-full rounded-3xl opacity-85 shadow-2xl shadow-black hover:scale-105 duration-300"/>
              </div>
              
              <div className='w-1/2 flex flex-col items-center justify-between h-full'>
                <div className='h-2/3 w-full flex flex-col justify-center items-center gap-2'>
                  <div className='font-oswald uppercase text-4xl font-semibold'>
                    {item.name}
                  </div>

                  <div className='h-[1px] bg-white w-3/5 rounded-full'></div>
                  
                  <div className='font-poppins text-lg'>
                    {item.episode_count} Episodes
                  </div>

                  <CircleRating rating={item.vote_average} width={'w-20'}/>

                </div>
                <div className='h-1/3 w-full flex items-center justify-center hover:scale-105 duration-200'>
                  <button className='flex items-center justify-center h-3/5 w-4/5 rounded-2xl bg-[#c3e200] gap-5' onClick={()=>handleEpisode(item.season_number)}>
                    <span className='font-oswald text-2xl text-black font-semibold'>
                      EPISODES
                    </span>
                    <FaArrowRight className='text-3xl text-black'/>
                  </button>
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
