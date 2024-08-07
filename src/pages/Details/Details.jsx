import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ContentCenter from '../../utilityComponent/ContentCenter'
import play from '../../assets/play.png'
import dayjs from 'dayjs';
import Seasons from './detailsComponents/Seasons';
import Similar from '../../components/Similar/Similar';
import Recommendation from '../../components/Recommendation/Recommendation';
import SubDetails from './detailsComponents/SubDetails';
import Tagline from './detailsComponents/Tagline';
import { FaShareAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import DetailsSlider from './detailsComponents/DetailsSlider';

const Details = () => {

  const {mediaType, id} = useParams();

  const [showEps, setShowEps] = useState(false)

  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  const epCount = () => {
    let count = 0;
    data?.seasons.map((item)=>{
      count += item.episode_count
    })

    return count;
  }

  const handleEpisode = () => {
    setShowEps(!showEps)
  }


  return (
    <div>
      {/* <DetailsHerobanner mediaType={mediaType} id={id} data={data} loading={loading}/> */}

      <div className='relative w-full h-[60vh]'>
        <div className='absolute z-10 w-full h-full'>
          <img src={posterImg.url+data?.backdrop_path} className='w-full h-full object-cover'/>
          <div className='absolute inset-0 bg-black opacity-40'></div>
        </div>

        <ContentCenter className={'2xl:w-5/6'}>
          <div className='absolute w-full md:w-1/2 h-1/3 z-20 bottom-1/4 flex flex-col gap-4 text-white'>

            <div className='font-oswald text-3xl md:text-5xl font-bold uppercase'>{data?.title || data?.name}</div>
            {
              data?.number_of_seasons ? 
              <div className='font-poppins'>
                {data?.seasons.length} Seasons • {epCount()} Episodes
              </div>
              :
              <div className='font-poppins'>
                Runtime : {data?.runtime} Minutes
              </div>
            }
            <div className='flex gap-3'>
              {data?.genres.map((genre)=>{
                return(
                  <div key={genre.id} className='hover:scale-95 duration-200 flex justify-center items-center border-white rounded-lg border-[1px] md:px-2 md:py-1 bg-[#464847] bg-opacity-50'>
                    {genre.name}
                  </div>
                )
              })}
            </div>
          </div>

          <div className='w-full md:w-3/5 h-1/4 absolute z-30 -bottom-12 flex gap-4'>

            <div className='hover:scale-95 duration-200 relative w-1/4 h-full bg-[#c4e200e4] rounded-3xl flex items-center font-poppins justify-center font-bold text-[#ababab]'>
              <div className='absolute -left-5 transform -rotate-90 text-xl text-black'>TRAILER</div>
              <img src={play} className='hover:scale-125 duration-300'/>
            </div>

            <div className='hover:scale-95 duration-200 w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl'>
              
            </div>

            <div className='hover:scale-95 duration-200 relative w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl flex items-center font-poppins justify-center font-bold text-[#ababab]'>
              <div className='absolute -left-6 transform -rotate-90 text-lg'>
                AIR DATE
              </div>

              <div className='font-oswald text-white text-[26px]'>
                {data?.first_air_date || data?.release_date ? dayjs(data?.first_air_date || data?.release_date).format('MMM D, YYYY') : 'N/A'}
              </div>
            </div>

            <div className='relative hover:scale-95 font-oswald text-white text-[26px] duration-200 w-1/4 h-full bg-[#15202a] bg-opacity-70 rounded-3xl flex justify-center items-center'>
              
              <div className='text-[#ababab] font-bold absolute -left-4 transform -rotate-90 text-xl'>
                COMPANY
              </div>
              <div className='font-oswald text-2xl font-bold uppercase'>
                {data?.production_companies[0]?.name}
              </div>
            </div>
          </div>
          
          <div className='hidden md:block text-white absolute z-30 -bottom-14 right-0 w-1/6 mr-36 rounded-xl'>
            <img src={posterImg.url + data?.poster_path} className="rounded-xl" />
          </div>

        </ContentCenter>

      </div>


        <ContentCenter className={'mt-20'}>

            <div className='w-full flex justify-between gap-5'>

              <div className='w-3/4'>
                <div className='bg-slate-800 rounded-2xl p-5 px-6 flex flex-col gap-3 h-[]'>
                  <div className='text-[#C3E200] font-oswald text-3xl'>DESCRIPTION</div>
                  <div className='font-lato text-white text-lg'>
                    {data?.overview}
                  </div>
                </div>
                <div className='flex justify-between'> 
                  <div className='w-full flex gap-5 my-10'>
                    <SubDetails data={data} loading={loading}/>
                    <Tagline data={data} loading={loading}/>
                  </div>
                </div>
              </div>

              <div className='w-1/4 flex flex-col gap-5'>

                <div className='w-full h-1/4 flex flex-col gap-3'>
                  <button className='bg-[#C3E200] h-1/2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl'>
                    <IoMdAddCircleOutline className='scale-150'/>
                    Add to WatchList
                  </button>

                  <button className='bg-[#C3E200] h-1/2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl'>
                    <FaShareAlt/>
                    Share
                  </button>
                </div>

                <div className='h-3/4'>
                  <DetailsSlider mediaType={mediaType}/>
                </div>

              </div>

          </div>
        </ContentCenter>

      <ContentCenter>
      </ContentCenter>

      {mediaType === 'tv' ? <Seasons data={data} loading={loading} handleEpisode={handleEpisode}/> : <div/>}
      <Similar id={id} mediaType={mediaType}/>
      <Recommendation id={id} mediaType={mediaType}/>

      {
        showEps && <div className='text-white text-9xl absolute top-0 w-3/4 h-[100vh] z-50 bg-black overflow-scroll'>
          <span onClick={handleEpisode}>XXXXXXXX</span>
        </div>
      }

    </div>

  )
}

export default Details
  