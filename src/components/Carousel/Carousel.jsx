import React, { useEffect, useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import { useSelector } from 'react-redux'
import CircularRating from '../../utilityComponent/CircularRating'
import { Box, Skeleton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import LazyLoadImages from '../../utilityComponent/LazyLoadImages'
import { HiArrowSmLeft } from "react-icons/hi";

const Carousel = ({data, loading, endpoint}) => {

  const navigate = useNavigate();

  const [hover, setHover] = useState(null);
  const [absoluteHover, setAbsolueteHover] = useState(null)
  const itemImg = useSelector((state)=>state.home)

  return (
    <div className='relative text-white'>

        {!loading ? (
          <div className='flex no-scrollbar w-full gap-4 md:gap-6 rounded-xl'>

            {data?.map((item)=>{

              return (
                <div className='relative flex flex-col flex-shrink-0 calc-width-mob sm:w-1/3 md:w-1/4 
                  lg:w-1/5 rounded-xl overflow-hidden hover:scale-105 hover:overflow-hidden hover:rounded-xl hover:cursor-pointer duration-300' 
                  key={item.id} onMouseOver={()=>setHover(item?.id)} 
                  onMouseLeave={()=>{
                    setHover(null);
                  }}
                  onClick={()=>{
                    item.media_type ? navigate(`/${item.media_type}/${item.id}`) : navigate(`/${endpoint}/${item.id}`)
                  }}
                  >
                  <div>
                    <LazyLoadImages src={itemImg.url + item.poster_path} className={`${absoluteHover === item.id ? 'opacity-40' : '  '} hover:opacity-40 duration-300 rounded-xl`}/>
                  </div>
                  
                  {hover === item.id && 
                    <div className='px-2 text-center absolute bottom-6 flex flex-col justify-center items-center w-full' onMouseOver={()=>setAbsolueteHover(item.id)} onMouseLeave={()=>(setAbsolueteHover(null))}>
                      <span className='font-poetsen text-xl'>{item.title || item.name}</span>
                      <span>{item.media_type === 'tv' ? 'TV Show' : 'Movie'}</span>
                      <CircularRating rating={item.vote_average}/>
                      <div>{dayjs(item.first_air_date).format('D MMM YYYY')}</div>
                    </div>
                  }
                </div>
              )
            })}

          </div>
        ) : (
          <div className='w-full h-[300px]'>
            {/* <Skeleton variant='rectangular' height={300} animation='wave'/> */}
            <Box display="flex" overflow="hidden" width="100%">
              {Array.from(new Array(10)).map((_, index) => (
                <Box key={index} width={250} marginRight={2}>
                  <Skeleton variant="rectangular" width={250} height={300} className='rounded-xl' animation = 'wave' sx={{backgroundColor : 'rgba(0,0,0,0.2)'}} />
                </Box>
              ))}
            </Box>
          </div>
        )}  

    </div>
  )
}

export default Carousel
