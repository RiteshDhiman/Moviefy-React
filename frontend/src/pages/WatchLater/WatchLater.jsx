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
      alert("Error: " + error.message);
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
            <div className="grid md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-5">
              {movies.length > 0 ? (
                movies.map((item, index) => (
                  <div className="w-full bg-slate-900 h-[55vh] flex flex-col justify-around items-center rounded-3xl">
                    <div className="relative w-full h-3/5 bg-black flex">
                      <div className="w-full h-full flex justify-center items-center text-9xl font-alfa font-bold pr-4">
                        {index + 1}
                      </div>
                      <div className="absolute h-full w-1/2 top-0 right-0">
                        <img
                          src={item.posterPath}
                          className="h-full w-full brightness-75"
                        />
                      </div>
                    </div>
                    <div className="w-11/12 h-2/5 px-4 py-2 flex flex-col gap-2 justify-center items-center">
                      <p className="h-1/3 font-roboto text-xl flex justify-center items-center">
                        {item.mediaName}
                      </p>
                      <div className="flex justify-around w-full gap-5 h-1/3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-1/2 rounded-xl py-2 bg-[#C3E200] flex justify-center items-center gap-1 text-black font-poppins text-md font-semibold"
                          onClick={() => removeWatchlist(item.id)}
                        >
                          <GiConfirmed />
                          Watched
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-1/2 rounded-xl py-2 bg-[#cf3817] flex justify-center items-center gap-1 font-poppins text-md font-semibold"
                        >
                          <MdDelete />
                          Remove
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-1/3 bg-sky-300 w-full rounded-xl py-1 text-black text-md font-semibold"
                        onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                      >
                        Explore Now
                      </motion.button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No movies</p>
              )}
            </div>
          </div>
          {/*TV SHOWS SECTION*/}
          <div className="w-full">
            <div className="text-3xl font-mukta py-5">TV Shows</div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-5">
              {tvShows.length > 0 ? (
                tvShows.map((item, index) => (
                  <div className="w-full bg-slate-900 h-[55vh] flex flex-col justify-around items-center rounded-3xl">
                    <div className="relative w-full h-3/5 bg-black flex">
                      <div className="w-full h-full flex justify-center items-center text-9xl font-alfa font-bold pr-4">
                        {index + 1}
                      </div>
                      <div className="absolute h-full w-1/2 top-0 right-0">
                        <img
                          src={item.posterPath}
                          className="h-full w-full brightness-75"
                        />
                      </div>
                    </div>
                    <div className="w-11/12 h-2/5 px-4 py-2 flex flex-col gap-2 justify-center items-center">
                      <p className="h-1/3 font-roboto text-xl flex justify-center items-center">
                        {item.mediaName}
                      </p>
                      <div className="flex justify-around w-full gap-5 h-1/3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-1/2 rounded-xl py-2 bg-[#C3E200] flex justify-center items-center gap-1 text-black font-poppins text-md font-semibold"
                          onClick={() => removeWatchlist(item.id)}
                        >
                          <GiConfirmed />
                          Watched
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-1/2 rounded-xl py-2 bg-[#cf3817] flex justify-center items-center gap-1 font-poppins text-md font-semibold"
                        >
                          <MdDelete />
                          Remove
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-1/3 bg-sky-300 w-full rounded-xl py-1 text-black text-md font-semibold"
                        onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                      >
                        Explore Now
                      </motion.button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No TV shows</p>
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
