import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ContentCenter from '../../utilityComponent/ContentCenter'
import Seasons from './detailsComponents/Seasons';
import Similar from '../../components/Similar/Similar';
import Recommendation from '../../components/Recommendation/Recommendation';
import SubDetails from './detailsComponents/SubDetails';
import Tagline from './detailsComponents/Tagline';
import { IoMdAddCircleOutline } from "react-icons/io";
import DetailsHerobanner from './Herobanner/DetailsHerobanner';
import axios from 'axios';
import { useFirebase } from '../../Context/Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heart from '../../assets/heart.png'
import add from '../../assets/add.png'
import track from '../../assets/track.png'
import { motion } from 'framer-motion'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Details = () => {

  const auth = getAuth();
  const seasonRef = useRef(null)

  const [userId, setUserId] = useState(null)
  console.log(userId)

  const {mediaType, id} = useParams();

  
  const posterImg = useSelector((state)=>state.home)
  const {data, loading} = useFetch(`/${mediaType}/${id}`)
  
  console.log(data)
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
    watchedDate : new Date(),
    movieRuntime : data?.runtime,
    posterPath : data?.poster_path
  }

  const scrollToSection  = (sectionRef) => {
    sectionRef.current?.scrollIntoView({behavior : 'smooth'})
  }

  // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL
  

  const addtoWatchlist = async() => {
    try {
      // const testing = await axios.post('http://localhost:3000/add/wishlist', wishlistData)
      const testing = await axios.post('https://moviefy-react.onrender.com/add/wishlist', wishlistData)
      // const testing = await axios.post(`${BASE_ENDPOINT}/add/wishlist`, wishlistData)
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

  const trackMovie = async() => {
    try {
      // const movieTrack = await axios.post('http://localhost:3000/track/movie', movieData)
      const movieTrack = await axios.post('https://moviefy-react.onrender.com/track/movie', movieData)
      // const movieTrack = await axios.post(`${BASE_ENDPOINT}/track/movie`, movieData)

      const message = movieTrack.data.message;

      if(message === 'Movie already tracked'){
        toast.warning(`${data?.name || data?.title} is already tracked`, {style : {width : '400px'}})
      }
      else if(message === 'Added to tracking'){
        toast.success(`${data?.name || data?.title} Tracked`, {style : {width : '400px'}});
      }
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        setUserId(user.uid)
      }
      else{
        setUserId(null)
      }
    })

    return () => unsubscribe()
  },[auth])

  return (
    <div>

      <DetailsHerobanner data={data} loading={loading} mediaType={mediaType} id={id}/>

        <ContentCenter className={'mt-8'}>

          <div className='w-full flex flex-col md:h-[50vh]'>

            <div className='w-full h-1/2 my-3 flex flex-col md:flex-row gap-3 lg:gap-5'>

              <div className='bg-slate-800 w-full md:w-3/5 lg:w-3/4 max-h-full rounded-2xl p-5 px-6 flex flex-col gap-3'>
                <div className='text-[#C3E200] font-oswald text-3xl uppercase'>Description</div>
                <div className='font-lato text-white text-lg overflow-ellipsis'>
                  {data?.overview}
                </div>
              </div>
              
              <div className='w-full md:w-2/5 lg:w-1/4 flex flex-col gap-3'>
                <motion.button 
                  className='bg-[#C3E200] h-14 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-md md:rounded-xl' 
                  onClick={addtoWatchlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img src={add} className='h-1/2'/>
                  Add to WatchList
                </motion.button>

                <motion.button 
                  className='bg-[#C3E200] h-14 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-md md:rounded-xl' 
                  onClick={()=>{mediaType === 'tv' ? scrollToSection(seasonRef) : trackMovie()}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >                  
                  <img src={track} className='h-1/2'/>
                  {mediaType === 'tv' ? "Track Show" : "Track Movie"}
                </motion.button>

                <motion.button 
                  className='bg-[#C3E200] h-14 font-oswald uppercase text-xl font-medium flex justify-center items-center gap-2 rounded-md md:rounded-xl' 
                  onClick={addtoWatchlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >                  
                  <img src={heart} className='h-1/2'/>
                  Add to Favourites
                </motion.button>
              </div>
            </div>

            <div className='h-1/2 w-full flex flex-col md:flex-row gap-4 my-3' ref={seasonRef}>
              <div className='w-full md:w-1/2'>
                <SubDetails data={data} loading={loading}/>
              </div>

              <div className='w-full md:w-1/2'>
                <Tagline data={data} loading={loading}/>
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
  