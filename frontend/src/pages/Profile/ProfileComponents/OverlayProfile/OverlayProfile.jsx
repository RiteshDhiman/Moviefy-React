import React from 'react'
import close from '../../../../assets/close.png'
import { useSelector } from 'react-redux'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const OverlayProfile = ({data, handleOverlay, mediaType}) => {

  const { url } = useSelector((state)=>state.home)
  const navigate = useNavigate()

  console.log(data)

  const epCount = (item) => {
    let count = 0;
    if (item?.seasons) {
      for (let i = 0; i < item.seasons.length; i++) {
        const season = item.seasons[i];
        if (season?.episodes) {
          count += season.episodes.length; // Add the number of episodes in each season
        }
      }
    }
    console.log(count)
    return count || 0; // Return the total episode count, or 0 if none
  };
  

  return (
    <div className='text-white w-full h-[100vh] absolute z-30 top-0 flex justify-center items-center'>

      <div className='w-[95%] md:w-2/3 h-3/4 md:h-5/6 fixed flex rounded-xl shadow-2xl shadow-black bg-gray-600'>

        <span className="absolute z-50 top-3 right-3 text-8xl cursor-pointer" onClick={handleOverlay}>
          <img src={close} className='w-5 md:w-7 invert hover:scale-110 duration-200 cursor-pointer'/>
        </span>

        <div className='w-full flex flex-col'>
          <div className='w-full flex items-center pt-5 pb flex-col gap-1'>
            
            <div className='font-oswald text-4xl md:text-5xl font-semibold uppercase'>
              {mediaType === 'tv' ? 'Tracked TV Shows' : 'Tracked Movies'}
            </div>

            <div className='font-poppins text-md'>
              {mediaType === 'tv' ? `Total TV Shows tracked : ${data?.length}` : `Total Movies tracked : ${data?.length}`}
            </div>
          </div>

          <div className='w-full h-full flex flex-col items-center overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600 scrollbar-thumb-rounded-lg'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mx-7 px-5 py-7 justify-items-center gap-x-5 gap-y-5 bg-black rounded-2xl'>
              {data?.length > 0 ? (
                data?.map((item)=>(
                  <div className='w-full flex flex-col overflow-x-hidden rounded-t-2xl gap-1 hover:scale-105 duration-300 cursor-pointer' onClick={()=>mediaType === 'tv' ? navigate(`/tv/${item.tvId}`) : navigate(`/movie/${item.movieId}`)}>
                    
                    <img src={url + item.posterPath} className='rounded-2xl brightness-90' />
                    <span className='text-nowrap font-poppins text-center'>{mediaType === 'tv' ? item.tvShowName : item.movieName}</span>
                    {mediaType === 'tv' && <ProgressBar completed={epCount(item)/item.totalEpisodes * 100} isLabelVisible={false} height='5px' bgColor='#ffd400'/>}

                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default OverlayProfile
