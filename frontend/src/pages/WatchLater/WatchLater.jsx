import React, { useEffect, useState } from "react";
import ContentCenter from "../../utilityComponent/ContentCenter";
import axios from "axios";
import { useFirebase } from "../../Context/Firebase";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import LazyLoadImages from '../../utilityComponent/LazyLoadImages'
import dayjs from 'dayjs'

const WatchLater = () => {

  const auth = getAuth()

  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(null)
  const [watchLaterList, setWatchLaterList] = useState([]);
  const navigate = useNavigate();

  // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL

  // console.log(watchLaterList)

  const fetchWatchlist = async (uid) => {
    try {
      if (uid) {
        setLoading(true)
        const response = await axios.get(
          // "http://localhost:3000/add/watchlist",
          "https://moviefy-react.onrender.com/add/watchlist",
          // `${BASE_ENDPOINT}/add/watchlist`,
          {
            params: { userId:uid },
          }
        );
        setLoading(false)
        setWatchLaterList(response.data); // Set the fetched watch later array
      }
    } catch (error) {
      setLoading(false)
      toast.error("Some error occurred. Reload the page.");
    }
  };

  const removeWatchlist = async (id) => {
    try {
      setLoading(true)
      const response = await axios.post(
        // "http://localhost:3000/add/wishlistRemove",
        "https://moviefy-react.onrender.com/add/wishlistRemove",
        // `${BASE_ENDPOINT}/add/wishlistRemove`,
        { userId, id }
      );
      setLoading(false)

      if (response.status === 200) {
        setWatchLaterList((prevList) =>
          prevList.filter((item) => item.id !== id)
        );

        toast.success("Removed from Watch List", {autoClose : 1500})
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        setUserId(user.uid)
        fetchWatchlist(user.uid)
        // console.log(user)
      }
      else{
        setUserId(null)
      }
    })
    return () => unsubscribe()
  },[auth])


  const movies = watchLaterList.filter((item) => item.mediaType === "movie");
  const tvShows = watchLaterList.filter((item) => item.mediaType === "tv");

  return (
    <div>
      <ContentCenter>
        <div className="text-white">
          <div className="py-10 font-poetsen text-4xl">Watch Later</div>
          <div className="w-full">
            <div className="text-3xl font-mukta py-5">Movies</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">

              {movies.length > 0 ? (
                movies?.map((item, index) => (
                  <div className="w-full text-white flex flex-col rounded-2xl bg-black border-[1.5px] border-slate-400">
                    <div className="flex">

                      <div className=" w-[40%] rounded-tl-2xl">
                        <img src={item.posterPath} className="rounded-tl-2xl shadow-xl"/>
                      </div>
                      
                      <div className="w-[65%] flex flex-col items-center gap-2">
                        
                        <div className="w-full centering py-2 font-roboto mb-2">
                          <span>Added on : {dayjs(item.mediaDate).format('D MMM YYYY')}</span>
                        </div>

                        <div className="w-full centering flex-col gap-2 font-poppins text-md font-semibold">
                          <motion.button
                            className="w-4/5 rounded-xl bg-lime-400 bg-opacity-20 border-[1.5px] border-lime-600 py-1 lg:py-2 text-lime-400"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                              Watched
                          </motion.button>
                          <motion.button
                            className="w-4/5 rounded-xl bg-red-400 bg-opacity-20 border-[1.5px] border-red-600 py-1 lg:py-2 text-red-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                              Remove
                          </motion.button>
                          <motion.button
                            className="w-4/5 rounded-xl bg-indigo-400 bg-opacity-20 border-[1.5px] border-indigo-400 py-1 lg:py-2 text-indigo-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                          >
                              Explore Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 centering text-2xl font-fina border-t-[1px] border-slate-400">
                      {item.mediaName}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                </>
              )}
            </div>
          </div>
          {/*TV SHOWS SECTION*/}
          <div className="w-full">
            <div className="text-3xl font-mukta py-5">TV Shows</div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-5">
              {tvShows.length > 0 ? (
                tvShows.map((item, index) => (
                  <div className="w-full text-white flex flex-col rounded-2xl" style={{background: 'radial-gradient(circle, #002f4c 30%, #001c2a 100%)',}}>
                    <div className="flex">

                      <div className=" w-[40%] rounded-tl-2xl">
                        <img src={item.posterPath} className="rounded-tl-2xl shadow-xl"/>
                      </div>
                      
                      <div className="w-[65%] flex flex-col items-center gap-2">
                        
                        <div className="w-full centering py-2 font-roboto mb-2">
                          <span>Added on : {dayjs(item.mediaDate).format('D MMM YYYY')}</span>
                        </div>

                        <div className="w-full centering flex-col gap-2 font-poppins text-md font-semibold">
                          <motion.button
                            className="w-4/5 rounded-xl bg-lime-400 bg-opacity-20 border-[1.5px] border-lime-600 py-2 text-lime-400"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                              Watched
                          </motion.button>
                          <motion.button
                            className="w-4/5 rounded-xl bg-red-400 bg-opacity-20 border-[1.5px] border-red-600 py-2 text-red-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                              Remove
                          </motion.button>
                          <motion.button
                            className="w-4/5 rounded-xl bg-indigo-400 bg-opacity-20 border-[1.5px] border-indigo-400 py-2 text-indigo-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                          >
                              Explore Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 centering text-2xl font-fina">
                      {item.mediaName}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                  <div className="h-[30vh] bg-slate-500 rounded-2xl w-full"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </ContentCenter>
      {loading && <LoadingScreen/>}
    </div>
  );
};

export default WatchLater;
