import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../store/homeSlice';
import { useNavigate } from 'react-router-dom';

  const Herobanner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bg, setBg] = useState();

  const {data, loading} = useFetch('/trending/all/week');

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

  useEffect(()=>{
    {dispatch(getList(data))}
    const background = data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
    setBg(url+background)
  },[data])

  return (
    <div className='relative w-full h-[80vh] mb-10'>
      <div className='w-full h-full'>
        <img src={bg} className="h-full w-full object-cover opacity-50" />
      </div>

      <div className='top-0 left-0 w-full h-full absolute flex justify-center items-center'>
        <div className='w-1/2 h-1/2 flex flex-col items-center justify-around text-white'>

          <div className='flex flex-col items-center justify-center'>
            <span className="text-4xl md:text-6xl lg:text-9xl font-poetsen">
              Welcome
            </span>
            <span className="text-sm md:text-xl lg:text-2xl font-roboto">
              Your Streaming guide for Movies and TV shows
            </span>
          </div>

          <div className="flex w-11/12 md:w-full h-10 md:h-14 text-black">
            <input className="w-3/4 h-full rounded-tl-2xl rounded-bl-2xl p-4 font-roboto text-lg md:text-xl outline-none"type="text" onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>handleSearchEnter(e)}/>
            <button className="w-1/4 h-full bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-tr-2xl rounded-br-2xl font-poetsen text-lg md:text-2xl
              " onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className='absolute z-1 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent'></div>
    </div>
  )
}

export default Herobanner