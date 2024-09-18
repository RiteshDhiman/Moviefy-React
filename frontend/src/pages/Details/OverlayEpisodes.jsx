import React, { useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { motion } from 'framer-motion';
import dayjs from 'dayjs'
import close from '../../assets/close.png'
import axios from "axios";
import { toast } from "react-toastify";

const OverlayEpisodes = ({ posterPath, seasonCount, seriesid, seriesName, seasonNumber, handleEpisode, userId }) => {

  const {url} = useSelector((state)=>state.home)

  const [clickedEpisodes, setClickedEpisodes] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const { data, loading } = useFetch(`/tv/${seriesid}/season/${seasonNumber}`);

  const trackEpisode = async(epNumber, epName, epRuntime, event) => {
    event.stopPropagation();

    const episodeData = {
      userId,
      seriesId : seriesid,
      seriesName : seriesName,
      totalSeasons : seasonCount,
      watchedDate : new Date(),
      episodeNumber : epNumber,
      episodeName : epName,
      seasonNumber : data?.season_number,
      episodeRuntime : epRuntime,
      posterPath,
    }

    // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL

    try {
      // const response = await axios.post('http://localhost:3000/track/tv', episodeData)
      const response = await axios.post('https://moviefy-react.onrender.com/track/tv', episodeData)
      // const response = await axios.post(`${BASE_ENDPOINT}/track/tv`, episodeData)
      const message = response.data.message;

      if(message.includes('Episode already tracked')){
        toast.warning('Episode already tracked')
      }
      else{
        toast.success(`Successfully tracked Ep:${episodeData.episodeNumber}`)
        setClickedEpisodes((prev) => [...prev, epNumber]);
      }
    } catch (error) {
      console.log(error.message)
      toast.error('Failed to track episode. Try again later')
    }
  }
  console.log(data);

  const isEpisodeClicked = (epNumber) => clickedEpisodes.includes(epNumber);

  const totalRunTime = data?.episodes?.reduce((acc, episode) => acc + episode.runtime, 0);
  const hours = Math.floor(totalRunTime / 60);
  const minutes = totalRunTime % 60;

  return (
    <div className="text-white w-full h-[100vh] absolute z-50 top-0 flex justify-center items-center">
      <div className="w-4/5 md:w-2/3 h-3/4 md:h-5/6 fixed flex rounded-xl shadow-2xl shadow-black bg-gray-600 overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600 scrollbar-thumb-rounded-lg">
        <span className="absolute top-3 right-3 text-8xl cursor-pointer" onClick={handleEpisode}>
        <img src={close} className='w-5 md:w-7 invert hover:scale-110 duration-200 cursor-pointer'/>

        </span>

        <div className="w-full flex flex-col">
          <div className="w-full flex items-center py-5 flex-col gap-1">
            <div className="font-oswald text-5xl font-semibold">SEASON {seasonNumber}</div>
            {data?.vote_average !== 0 ?
            <div className="flex gap-2">
              <Box sx={{ '& > legend': { mt: 2} }}>
                <Rating name="read-only" value={data?.vote_average/2 || 0} precision={0.5} readOnly />
              </Box>
              <div>({data?.vote_average/2}/5)</div>
            </div>
            : (
              <div className="font-poppins">Rating Unavailable</div>
              )
            }
            <div className="font-poppins text-md">{`Total Runtime : ${hours} hours ${minutes} minutes`}</div>
          </div>
          
          <div className="w-full flex flex-col items-center">
            {data?.episodes.map((item)=>(
              <div key={item.id} className="w-11/12">
                <Accordion
                expanded={expanded === item.id}
                onChange={() => setExpanded(expanded === item.id ? false : item.id)}
                  sx={{
                    backgroundColor : 'black',
                    color : 'white',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<MdKeyboardArrowDown className="text-white text-5xl"/>}
                  >
                    <div className="flex w-full">
                      <div className="w-[15%]">
                        <img src={url + item.still_path} className="w-full"/>
                      </div>

                      <div className="px-10 flex flex-col h-full items-center justify-center w-3/5">
                        <div className="w-full flex items-center gap-6">
                          <div className="font-mukta md:text-2xl 2xl:text-3xl font-extrabold">{`S${seasonNumber} | E${item.episode_number}`}</div>
                          <div className="text-sm font-semibold text-gray-300 font-mukta">{`(${item.runtime} min)`}</div>
                        </div>
                        <div className="w-full font-mukta text-lg">{item.name}</div>
                      </div>

                      <div className="w-1/5 flex items-center justify-end ">
                        <motion.button 
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`w-[55px] h-[55px] rounded-full border-2 border-white flex justify-center items-center ${isEpisodeClicked(item.episode_number) ? 'bg-green-500' : 'bg-transparent'}`}
                          onClick = {(event)=>trackEpisode(item.episode_number, item.name, item.runtime, event)}
                        >
                          <IoCheckmark className="text-4xl font-bold"/>
                        </motion.button>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-1">
                      <div className="border-t-[1px] border-white pt-2">Air date : {dayjs(item.air_date).format('D MMM YYYY')}</div>

                      {data?.vote_average !== 0 ?
                        <div className="flex gap-2">
                          <Box sx={{ '& > legend': { mt: 2} }}>
                            <Rating name="read-only" value={data?.vote_average/2 || 0} precision={0.5} readOnly />
                          </Box>
                          <div>({data?.vote_average/2}/5)</div>
                        </div>
                        : (
                          <div className="font-poppins">Rating Unavailable</div>
                          )
                      }

                      <div>{item.overview}</div>

                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayEpisodes;
