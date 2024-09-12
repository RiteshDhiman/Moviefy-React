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

const OverlayEpisodes = ({ seriesid, seasonNumber, handleEpisode }) => {

  const [epTrack, setEpTrack] = useState(null)

  const {url} = useSelector((state)=>state.home)

  const { data, loading } = useFetch(`/tv/${seriesid}/season/${seasonNumber}`);

  const trackEpisode = () => {
    setEpTrack(!epTrack)
  }
  console.log(data);

  const totalRunTime = data?.episodes?.reduce((acc, episode) => acc + episode.runtime, 0);
  const hours = Math.floor(totalRunTime / 60);
  const minutes = totalRunTime % 60;

  return (
    <div className="text-white w-full h-[100vh] absolute z-50 top-0 flex justify-center items-center">
      <div className="w-4/5 md:w-2/3 h-3/4 md:h-5/6 fixed flex rounded-xl shadow-2xl shadow-black bg-gray-600 overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600 scrollbar-thumb-rounded-lg">
        <span className="absolute right-3 text-8xl cursor-pointer" onClick={handleEpisode}>
          X
        </span>

        <div className="w-full flex flex-col">
          <div className="w-full flex items-center py-5 flex-col gap-1">
            <div className="font-oswald text-5xl font-semibold">SEASON {seasonNumber}</div>
            <div className="flex gap-2">
              <Box sx={{ '& > legend': { mt: 2} }}>
                <Rating name="read-only" value={data?.vote_average/2 || 0} precision={0.5} readOnly />
              </Box>
              <div>({data?.vote_average/2}/5)</div>
            </div>
            <div className="font-poppins text-md">{`Total Runtime : ${hours} hours ${minutes} minutes`}</div>
          </div>
          
          <div className="w-full flex flex-col items-center">
            {data?.episodes.map((item)=>(
              <div key={item.id} className="w-11/12">
                <Accordion
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
                          className={`w-[55px] h-[55px] rounded-full border-2 border-white flex justify-center items-center ${epTrack ? 'bg-green-400' : 'bg-transparent'}`}>
                          <IoCheckmark className="text-4xl font-bold"/>
                        </motion.button>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className="border-t-2 border-white py-5">{item.overview}</p>
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
