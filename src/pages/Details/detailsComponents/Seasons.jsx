import React from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages';

const Seasons = ({data, loading}) => {

    console.log(data)
    const posterImg = useSelector((state)=>state.home)

  return (
    <div className='w-full text-white'>
      <ContentCenter>
        <div className='grid grid-cols-3 justify-items-center gap-y-5'>
           {data?.seasons.map((item)=>(
            <div key={item.id} className='relative hover:opacity-80 hover:cursor-pointer duration-200'>
                <div>
                  <LazyLoadImages src={posterImg.url + item.poster_path} className="max-h-[70vh] rounded-2xl"/>
                </div>
                {!loading &&
                  <div className='absolute bottom-0 w-full bg-gray-800 bg-opacity-70 py-5 rounded-b-2xl font-poppins flex items-center justify-between '>
                    <span>{item.name} • {item.episode_count} Episodes</span>
                    <FaArrowRight className='text-2xl hover:text-[#c9f92e] hover:scale-110 duration-150'/>
                  </div>
                }
            </div>
           ))}
        </div>
      </ContentCenter>
    </div>
  )
}

export default Seasons
