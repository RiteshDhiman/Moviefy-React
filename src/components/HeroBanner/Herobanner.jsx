import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../store/homeSlice';
import { useNavigate } from 'react-router-dom';

  const Herobanner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bg, setBg] = useState();

  const {data, loading} = useFetch('/discover/movie');

  const [text, setText] = useState('')

  const {url} = useSelector((state)=>state.home)

  const handleSearch = () => {
    navigate(`/search/multi/${text}`);
  }

  const handleSearchEnter = (e) => {
    if(e.key === 'Enter'){
      handleSearch()
    }
  }

  const setBackground = async() =>{
    const background = await data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
    // console.log(background)
    setBg( "http://image.tmdb.org/t/p/original/" + background )
  }

  useEffect(()=>{
    setBackground();
  },[data])

  return (
    <div className='relative w-full h-[45vh] md:h-[80vh] mb-10'>
      <div className='w-full h-full'>
        <img src={bg} className="h-full w-full object-cover opacity-50" loading='lazy'/>
      </div>

      <div className='top-0 left-0 w-full h-full absolute flex justify-center items-center'>
        <div className='w-11/12 md:w-1/2 h-1/2 flex flex-col items-center justify-around text-white'>

          <div className='flex flex-col items-center justify-center gap-1'>
            <span className="text-5xl md:text-6xl lg:text-9xl font-poetsen">
              Welcome
            </span>
            <span className="text-md md:text-xl lg:text-2xl font-oswald">
              Your Streaming guide for Movies and TV shows
            </span>
          </div>

          <div className="flex w-11/12 md:w-full h-10 md:h-14 text-black">
            <input className="w-3/4 h-full rounded-tl-2xl rounded-bl-2xl p-4 font-roboto text-lg md:text-xl outline-none"type="text" onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>handleSearchEnter(e)}/>
            <button className="w-1/4 h-full bg-gradient-to-br from-[#c3d933] to-[#ddff00] rounded-tr-2xl rounded-br-2xl font-oswald font-bold text-lg md:text-2xl
              " onClick={handleSearch}>
              Searching
            </button>
          </div>
        </div>
      </div>

      <div className='absolute z-1 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent'></div>
    </div>
  )
}

export default Herobanner
