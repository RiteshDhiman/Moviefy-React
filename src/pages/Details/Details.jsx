import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ContentCenter from '../../utilityComponent/ContentCenter'
import play from '../../assets/play.png'
import dayjs from 'dayjs';
import add  from '../../assets/add.png'

const Details = () => {

  const {mediaType, id} = useParams();

  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  const epCount = () => {
    let count = 0;
    data?.seasons.map((item)=>{
      count += item.episode_count
    })

    return count;
  }



  return (
    <div>

      <div className='relative w-full h-[60vh]'>
        <div className='absolute z-10 w-full h-full'>
          <img src={posterImg.url+data?.backdrop_path} className='w-full h-full object-cover'/>
          <div className='absolute inset-0 bg-black opacity-40'></div>
        </div>

        <ContentCenter>
          <div className='absolute w-1/2 h-1/3 z-20 bottom-1/4 flex flex-col gap-4 text-white'>

            <div className='font-oswald text-5xl font-bold uppercase'>{data?.title || data?.name}</div>
            {
              data?.number_of_seasons ? 
              <div className='font-poppins'>
                {data?.seasons/length} Seasons • {epCount()} Episodes
              </div>
              :
              <div className='font-poppins'>
                Runtime : {data?.runtime} Minutes
              </div>
            }
            <div className='flex gap-3'>
              {data?.genres.map((genre)=>{
                return(
                  <div className='border-white rounded-lg border-[1px] px-2 py-1 bg-[#464847] bg-opacity-50'>
                    {genre.name}
                  </div>
                )
              })}
            </div>
          </div>

          <div className='w-3/5 h-1/4 absolute z-30 -bottom-12 flex gap-4'>

            <div className='w-1/4 h-full bg-[#c4e200e4] rounded-3xl flex items-center font-poppins justify-start font-bold text-[#ababab]'>
              <div className='transform -rotate-90 text-xl text-black'>TRAILER</div>
              <img src={play}/>
            </div>

            <div className='w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl'>
              
            </div>

            <div className='w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl flex items-center font-poppins justify-center font-bold text-[#ababab]'>
              <div className='transform -rotate-90 text-sm'>
                TRAILER
              </div>

              <div className='font-oswald text-white text-2xl w-3/4'>
                {data?.first_air_date || data?.release_date ? dayjs(data?.first_air_date || data?.release_date).format('MMMM D, YYYY') : 'N/A'}
              </div>
            </div>

            <div className='w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl'>H</div>
          </div>
          
          <div className='text-white absolute z-30 -bottom-14 right-0 w-1/6 mr-36 rounded-xl'>
            <img src={posterImg.url + data?.poster_path} className="rounded-xl" />
          </div>

        </ContentCenter>
          {/* <div className='absolute z-10 -bottom-24 left-0 w-full h-[200px] bg-gradient-to-t from-[#030c1e] via-transparent to-transparent'></div> */}

      </div>

      <div className='w-full h-[50vh]'>
        <ContentCenter className={'mt-20'}>

          <div className='w-full flex justify-between'>

            <div className='w-3/4'>
              <div className='bg-slate-800 rounded-2xl p-5 px-6 flex flex-col gap-3'>
                <div className='text-[#C3E200] font-oswald text-3xl'>DESCRIPTION</div>
                <div className='font-lato text-white text-lg'>
                  {data?.overview}
                </div>
              </div>
            </div>

            <div className='w-1/5 flex flex-col'>
              <button className='bg-[#C3E200] py-2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl'>
                <img src={add} alt="" />
                Add to WatchList
              </button>
            </div>
          </div>
        </ContentCenter>
      </div>

    </div>

  )
}

export default Details
