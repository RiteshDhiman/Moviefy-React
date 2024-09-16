import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages'
import noposter from '../../../assets/no-poster.png'

const ProfileCarousel = ({data, endpoint}) => {

  const navigate = useNavigate();

  const [hover, setHover] = useState(null);
  const [absoluteHover, setAbsolueteHover] = useState(null)
  const itemImg = useSelector((state)=>state.home)

  return (
    <div className='relative text-white'>

          <div className='flex no-scrollbar w-full gap-4 md:gap-6 rounded-xl'>

            {data?.map((item)=>{

              return (
                <div className='relative flex flex-col flex-shrink-0 calc-width-mob sm:w-1/3 md:w-1/4 
                  lg:w-1/5 rounded-xl overflow-hidden hover:scale-105 hover:overflow-hidden hover:rounded-xl hover:cursor-pointer duration-300' 
                  key={item.tvId || item.movieId || item.id} onMouseOver={()=>setHover(item?.tvId || item?.movieId || item?.id)} 
                  onMouseLeave={()=>{
                    setHover(null);
                  }}
                  onClick={()=>endpoint === 'tv' ? navigate(`/tv/${item.tvId}`) : navigate(`/movie/${item.movieId}`)}
                  >
                  <div className={`${absoluteHover === item.id ? 'opacity-40' : ''} hover:opacity-40 duration-300 rounded-xl`}>
                    <LazyLoadImages src={item.posterPath ? itemImg.url + item.posterPath : noposter}/>
                  </div>

                  <div className='absolute right-0 top-3 px-4 py-1 rounded-l-xl border-white border-[1px] border-r-0 bg-black bg-opacity-60'>
                    {item.mediaType ? `${item.mediaType === 'movie' ? 'Movie' : 'TV Show'}` : endpoint === 'movie' ? 'Movie' : 'TV Show'}
                  </div>
                  
                  {(hover === item.tvId || hover === item.movieId || hover === item.id) && 
                    <div className='px-2 text-center absolute bottom-1/4 flex flex-col justify-center items-center w-full' onMouseOver={()=>setAbsolueteHover(item.id)} onMouseLeave={()=>(setAbsolueteHover(null))}>
                      <span className='font-poetsen text-xl'>{item.title || item.tvShowName || item.mediaName}</span>
                    </div>
                  }
                </div>
              )
            })}

          </div>

    </div>
  )
}

export default ProfileCarousel
