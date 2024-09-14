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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OverlayEpisodes from './OverlayEpisodes';

const Details = () => {

  const firebase = useFirebase();

  const userId = firebase.firebaseauth.currentUser?.uid
  console.log(userId)

  const {mediaType, id} = useParams();



  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)

  // const mediaName = data?.title || data?.name

  const wishlistData = {
    userId,
    mediaType,
    id,
    mediaName : mediaType === 'movie' ? data?.title : data?.name,
    posterPath : data?.poster_path
  }

  const movieData = {
    userId,
    movieId : id,
    movieName : data?.title || data?.name,
    watchedDate : new Date()
  }

  console.log(movieData)
  

  const addtoWatchlist = async() => {
    try {
      const testing = await axios.post('http://localhost:3000/add/wishlist', wishlistData)
      // const testing = await axios.post('https://moviefy-backend.vercel.app/add/wishlist', wishlistData)
      const message = testing.data.message;

      if (message === "Media Already exists") {
          toast.warning(`${data?.name || data?.title} is already in your Watch Later list`, {style : {width : '400px'}});
      } else if (message === "Added to watchlist") {
          toast.success(`${data?.name || data?.title} added to Watch Later`, {style : {width : '400px'}});
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const addMovie = async() => {
    try {
      const movieTrack = await axios.post('http://localhost:3000/track/movie', movieData)
      // const movieTrack = await axios.post('https://moviefy-backend.vercel.app/track/movie', movieData)
      alert('Added movie to db')
    } catch (error) {
      alert(error.message)
    }
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

                <button className='bg-[#C3E200] h-1/2 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-xl' onClick={mediaType === "movie" && addMovie}>
                  Track
                </button>
              </div>
              <div className='h-3/4'>
                <DetailsSlider mediaType={mediaType}/>
              </div>
            </div>

          </div>
        </ContentCenter>

      {mediaType === 'tv' ? <Seasons userId={userId} data={data} loading={loading}/> : <div/>}
      <Similar id={id} mediaType={mediaType}/>
      <Recommendation id={id} mediaType={mediaType}/>

      

    </div>

  )
}

export default Details
  