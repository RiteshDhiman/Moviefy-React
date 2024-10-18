import React, { useEffect, useState } from "react";
import ContentCenter from "../../utilityComponent/ContentCenter";
import axios from "axios";
import { useFirebase } from "../../Context/Firebase";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import LazyLoadImages from "../../utilityComponent/LazyLoadImages";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";

const WatchLater = () => {
  const auth = getAuth();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const navigate = useNavigate();

  // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL

  // console.log(watchLaterList)

  const fetchWatchlist = async (uid) => {
    try {
      if (uid) {
        setLoading(true);
        const response = await axios.get(
          // "http://localhost:3000/add/watchlist",
          "https://moviefy-react.onrender.com/add/watchlist",
          // `${BASE_ENDPOINT}/add/watchlist`,
          {
            params: { userId: uid },
          }
        );
        setLoading(false);
        setWatchLaterList(response.data); // Set the fetched watch later array
      }
    } catch (error) {
      setLoading(false);
      toast.error("Some error occurred. Reload the page.");
    }
  };

  const removeWatchlist = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        // "http://localhost:3000/add/wishlistRemove",
        "https://moviefy-react.onrender.com/add/wishlistRemove",
        // `${BASE_ENDPOINT}/add/wishlistRemove`,
        { userId, id }
      );
      setLoading(false);

      if (response.status === 200) {
        setWatchLaterList((prevList) =>
          prevList.filter((item) => item.id !== id)
        );

        toast.success("Removed from Watch List", { autoClose: 1500 });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchWatchlist(user.uid);
        // console.log(user)
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const movies = watchLaterList.filter((item) => item.mediaType === "movie");
  const tvShows = watchLaterList.filter((item) => item.mediaType === "tv");

  return (
    <div>
      <ContentCenter>
        <div className="text-white">
          <div className="py-7 font-roboto font-semibold text-[#c3e200] text-4xl">Watch Later</div>
          <div className="w-full mb-5">
            <div className="text-2xl font-roboto font-semibold py-2">Movies</div>
            {movies.length > 0 ?
              (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10">
                {movies?.map((item, index) => (
                  <div
                    className="w-full h-[220px] text-white flex flex-col rounded-2xl bg-black border-slate-400"
                    style={{
                      background:
                        "radial-gradient(circle, #002f4c 30%, #001c2a 100%)",
                    }}
                  >
                    <div className="flex h-full">
                      <div className=" w-[40%] rounded-tl-2xl h-full">
                        <img
                          src={item.posterPath}
                          className="rounded-tl-2xl shadow-xl h-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="w-[65%] flex flex-col items-center gap-2 overflow-hidden">
                        <div className="py-3 centering text-2xl font-fina text-nowrap">
                          {item.mediaName}
                        </div>

                        <div className="w-11/12 centering gap-4">
                          <motion.button
                            className="w-[60px] h-[60px] rounded-full bg-[#c8e200df] bg-opacity-75 centering"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                            <IoMdCheckmark className="invert h-1/2 w-1/2" />
                          </motion.button>

                          <motion.button
                            className="w-[60px] h-[60px] rounded-full bg-red-600 bg-opacity-75 centering"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                            <MdDeleteOutline className="invert h-1/2 w-1/2" />
                          </motion.button>
                        </div>

                        <div className="w-full centering font-roboto">
                          <span>
                            Added on :{" "}
                            {dayjs(item.mediaDate).format("D MMM YYYY")}
                          </span>
                        </div>

                        <motion.button
                          className="w-4/5 rounded-xl bg-sky-500 bg-opacity-70 py-2 font-poppins text-md font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() =>
                            navigate(`/${item.mediaType}/${item.id}`)
                          }
                        >
                          Explore Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            ) : (
              <div className="bg-slate-800 w-full rounded-2xl h-[20vh] centering font-roboto text-2xl text-slate-200">
                No Movies added to Watch Later 😞
              </div>
            )}

          </div>
          {/*TV SHOWS SECTION*/}
          <div className="w-full">
            <div className="text-2xl font-roboto font-semibold py-2">TV Shows</div>

            {tvShows.length > 0 ?
              (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10">
                {tvShows?.map((item, index) => (
                  <div
                    className="w-full h-[220px] text-white flex flex-col rounded-2xl bg-black border-slate-400"
                    style={{
                      background:
                        "radial-gradient(circle, #002f4c 30%, #001c2a 100%)",
                    }}
                  >
                    <div className="flex h-full">
                      <div className=" w-[40%] rounded-tl-2xl h-full">
                        <img
                          src={item.posterPath}
                          className="rounded-tl-2xl shadow-xl h-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="w-[65%] flex flex-col items-center gap-2 overflow-hidden">
                        <div className="py-3 centering text-2xl font-fina text-nowrap">
                          {item.mediaName}
                        </div>

                        <div className="w-11/12 centering gap-4">
                          <motion.button
                            className="w-[60px] h-[60px] rounded-full bg-[#c8e200df] bg-opacity-75 centering"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                            <IoMdCheckmark className="invert h-1/2 w-1/2" />
                          </motion.button>

                          <motion.button
                            className="w-[60px] h-[60px] rounded-full bg-red-600 bg-opacity-75 centering"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => removeWatchlist(item.id)}
                          >
                            <MdDeleteOutline className="invert h-1/2 w-1/2" />
                          </motion.button>
                        </div>

                        <div className="w-full centering font-roboto">
                          <span>
                            Added on :{" "}
                            {dayjs(item.mediaDate).format("D MMM YYYY")}
                          </span>
                        </div>

                        <motion.button
                          className="w-4/5 rounded-xl bg-sky-500 bg-opacity-70 py-2 font-poppins text-md font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() =>
                            navigate(`/${item.mediaType}/${item.id}`)
                          }
                        >
                          Explore Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            ) : (
              <div className="bg-slate-800 w-full rounded-2xl h-[20vh] centering font-roboto text-2xl text-slate-200">
                No TV Shows added to Watch Later 😞
              </div>
            )}
          </div>
        </div>
      </ContentCenter>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default WatchLater;
