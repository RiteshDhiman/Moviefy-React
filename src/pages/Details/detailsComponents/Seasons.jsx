import React from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages';
import CircleRating from '../../../utilityComponent/CircularRating';
import noposter from "../../../assets/no-poster.png"

const Seasons = ({data, loading, handleEpisode}) => {

    console.log(data)
    const posterImg = useSelector((state)=>state.home)

  return (
    <div className='w-full text-white'>
      <ContentCenter>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-16'>
           {data?.seasons.map((item)=>(
            // <div key={item.id} className=' hover:opacity-80 hover:cursor-pointer duration-200'>
            //     {!loading &&
            //     <div className='relative'>
            //       <LazyLoadImages src={posterImg.url + item.poster_path}/>
            //       <div className='absolute bottom-0 w-full bg-gray-800 bg-opacity-70 py-5 rounded-b-2xl font-poppins flex items-center justify-between '>
            //         <span>{item.name} • {item.episode_count} Episodes</span>
            //         <FaArrowRight className='text-2xl hover:text-[#c9f92e] hover:scale-110 duration-150'/>
            //       </div>
            //     </div>
            //     }
            // </div>
            <div key={item.id} className='flex h-[50vh] bg-[#1e293b83] w-full rounded-3xl'>
              <div className='w-1/2 h-full'>
                {/* <LazyLoadImages src={posterImg.url + item.poster_path} className={'absolute top-0 w-full h-full'}/> */}
                <img src={item.poster_path ? posterImg.url + item.poster_path : noposter} className="w-full h-full object-cover rounded-3xl opacity-85 shadow-2xl shadow-black"/>
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
                  <button className='flex items-center justify-center h-3/5 w-4/5 rounded-2xl bg-[#c3e200] gap-5' onClick={()=>handleEpisode()}>
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
    </div>
  )
}

export default Seasons
