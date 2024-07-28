import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ContentCenter from '../../utilityComponent/ContentCenter'

const Details = () => {

  const {mediaType, id} = useParams();

  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  const uppercase = (text) => {
    if (typeof text === 'string') {
      return text.toUpperCase();
    }
    return '';
  };

  const epCount = () => {
    let count = 0;
    data?.seasons.map((item)=>{
      count += item.episode_count
      console.log(count)
    })

    return count;
  }

  console.log(data)

  return (
    <div>

      <div className='relative w-full h-[60vh] bg-red-300'>
        <div className='w-full h-full bg-purple-200'>
          <img src={posterImg.url+data?.backdrop_path} className='w-full h-full object-cover'/>
          <div className='absolute inset-0 bg-black opacity-40'></div>
        </div>

        <ContentCenter>
          <div className='absolute w-1/2 h-1/3 z-10 bottom-1/4 flex flex-col gap-2 text-white'>

            <div className='font-oswald text-5xl font-bold'>{uppercase(data?.title || data?.name)}</div>
            <div className='font-poppins'>{data?.seasons.length} Seasons • {epCount()} Episodes</div>
            <div className='flex gap-5'>
              {data?.genres.map((genre)=>{
                return(
                  <div className='border-white rounded-lg border-[1px] px-2 py-1 bg-[#464847] bg-opacity-50'>
                    {genre.name}
                  </div>
                )
              })}
            </div>
          </div>

          <div className='w-3/5 h-1/4 absolute -bottom-12 flex gap-5'>
            <div className='w-1/4 h-full bg-red-950 rounded-xl'>H</div>
            <div className='w-1/4 h-full bg-red-950 rounded-xl'>H</div>
            <div className='w-1/4 h-full bg-red-950 rounded-xl'>H</div>
            <div className='w-1/4 h-full bg-red-950 rounded-xl'>H</div>
          </div>
        </ContentCenter>

      </div>

      <div className='w-full h-[45vh] '>
        
      </div>

    </div>

  )
}

export default Details
