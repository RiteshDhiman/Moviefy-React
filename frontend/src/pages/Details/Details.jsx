import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ContentCenter from '../../utilityComponent/ContentCenter'
import Seasons from './detailsComponents/Seasons';
import Similar from '../../components/Similar/Similar';
import Recommendation from '../../components/Recommendation/Recommendation';
import SubDetails from './detailsComponents/SubDetails';
import Tagline from './detailsComponents/Tagline';
import { FaShareAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import DetailsSlider from './detailsComponents/DetailsSlider';
import DetailsHerobanner from './Herobanner/DetailsHerobanner';
import axios from 'axios';
import { useFirebase } from '../../Context/Firebase';

const Details = () => {

  const firebase = useFirebase();

  const userId = firebase.firebaseauth.currentUser?.uid

  const {mediaType, id} = useParams();

  const [showEps, setShowEps] = useState(false)

  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  const mediaName = data?.title || data?.name
  

  const addtoWatchlist = async() => {
    try {
      const testing = await axios.post('http://localhost:3000/add/wishlist', {userId, id, mediaType, mediaName})
      alert("Added successfully")
    } catch (error) {
      alert(error.message)
    }
  }

  console.log(data)

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

      <DetailsHerobanner data={data} loading={loading} mediaType={mediaType} id={id}/>

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
                <button className='bg-[#C3E200] h-1/2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl' onClick={addtoWatchlist}>
                  <IoMdAddCircleOutline className='scale-150'/>
                  Add to WatchList
                </button>

                <button className='bg-[#C3E200] h-1/2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl'>
                  Track
                </button>
              </div>
              <div className='h-3/4'>
                <DetailsSlider mediaType={mediaType}/>
              </div>
            </div>

          </div>
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
  