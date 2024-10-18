import React, { useEffect, useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import CircularRating from '../../utilityComponent/CircularRating'
import { Box, Skeleton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import LazyLoadImages from '../../utilityComponent/LazyLoadImages'
import { HiArrowSmLeft } from "react-icons/hi";
import noposter from '../../assets/no-poster.png'

const Carousel = ({data, loading, endpoint}) => {

  const navigate = useNavigate();

  const [hover, setHover] = useState(null);
  const [absoluteHover, setAbsolueteHover] = useState(null)
  const itemImg = useSelector((state)=>state.home)

  // console.log(data)

  return (
    <div className='relative text-white'>

        {!loading ? (
          <div className='flex no-scrollbar w-full gap-4 md:gap-6 rounded-xl'>

            {data?.map((item)=>{

              return (
                item.media_type != 'person' && <div className='relative flex flex-col flex-shrink-0 calc-width-mob sm:w-1/3 md:w-1/4 
                  lg:w-1/5 xl:w-1/6 rounded-xl overflow-hidden hover:scale-105 hover:overflow-hidden hover:rounded-xl hover:cursor-pointer duration-300' 
                  key={item.id} onMouseOver={()=>setHover(item?.id)} 
                  onMouseLeave={()=>{
                    setHover(null);
                  }}
                  onClick={()=>{
                    item.media_type ? navigate(`/${item.media_type}/${item.id}`) : navigate(`/${endpoint}/${item.id}`)
                  }}
                  >
                  <div className={`${absoluteHover === item.id ? 'opacity-40' : ''} hover:opacity-40 duration-300 rounded-xl`}>
                    <LazyLoadImages src={item.poster_path ? itemImg.url + item.poster_path : noposter}/>
                  </div>

                  <div className='absolute right-0 top-3 px-4 py-1 rounded-l-xl border-white border-[1px] border-r-0 bg-black bg-opacity-60'>
                    {item.media_type ? `${item.media_type === 'movie' ? 'Movie' : 'TV Show'}` : endpoint === 'movie' ? 'Movie' : 'TV Show'}
                  </div>
                  
                  {hover === item.id && 
                    <div className='px-2 text-center absolute bottom-6 flex flex-col justify-center items-center w-full' onMouseOver={()=>setAbsolueteHover(item.id)} onMouseLeave={()=>(setAbsolueteHover(null))}>
                      <span className='font-poetsen text-xl'>{item.title || item.name}</span>
                      <CircularRating rating={item.vote_average} width={'w-12'}/>
                      <div>{dayjs(item.release_date || item.first_air_date).format('D MMM YYYY')}</div>
                    </div>
                  }
                </div>
              )
            })}

          </div>
        ) : (
          <div className='w-full md:h-[300px]'>
            {/* <Skeleton variant='rectangular' height={300} animation='wave'/> */}
            <Box display="flex" overflow="hidden" width="100%">
              {Array.from(new Array(10)).map((_, index) => (
                <Box key={index} width={250} marginRight={2}>
                  <Skeleton variant="rectangular" width={200} height={300} className='rounded-xl' animation = 'wave' sx={{backgroundColor : 'rgba(1000,1000,1000,0.2)'}} />
                </Box>
              ))}
            </Box>
          </div>
        )}  

    </div>
  )
}

export default Carousel
