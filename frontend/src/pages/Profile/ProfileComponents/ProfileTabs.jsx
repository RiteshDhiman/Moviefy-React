import React from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'
import './Profile.scss'
import { MdLiveTv } from "react-icons/md";

const ProfileTabs = ({data}) => {

  const totalMovieRuntime = data?.watchedMedia?.movies.reduce((total, movie) => {
    return total + (movie.movieRuntime || 0);
  }, 0);

  const totalTVRuntime = data?.watchedMedia?.tvShows.reduce((total, show) => {
    return total + show.seasons.reduce((totalSeason, season) => {
      return totalSeason + season.episodes.reduce((totalEpisode, ep) => {
        return totalEpisode + (ep.episodeRuntime);
      }, 0);
    }, 0);
  }, 0);

  const episodeCount = data?.watchedMedia?.tvShows.reduce((total, show)=>{
    return total + show.seasons.reduce((totalSeason, season) => {
      return totalSeason + season.episodes.length
    },0)
  },0)

  console.log(episodeCount)
  
  console.log(`Total TV Runtime: ${totalTVRuntime} minutes`);
  

  return (
    <ContentCenter>
      <div className='flex centering h-[20vh] w-full '>

        <div className='w-full flex h-3/5 gap-2 mx-2'>

          {/* TV SHOWS WATCHED */}
          <div className='w-1/5 flex flex-col items-center border-[0.5px] border-slate-400 bg-[#15202a] bg-opacity-70 text-white rounded-xl'>
            <div className='h-1/3 w-full centering gap-2 border-b-[0.5px] border-slate-400'>
              <MdLiveTv />
              <span className='font-mukta text-lg'>TV shows watched</span>
            </div>
            <div className='h-2/3 centering font-alfa text-3xl'>{data?.watchedMedia?.tvShows.length}</div>
          </div>

          {/* EPISODES WATCHED */}
          <div className='w-1/5 flex flex-col items-center border-[0.5px] border-slate-400 bg-[#15202a] bg-opacity-70 text-white rounded-xl'>
            <div className='h-1/3 w-full centering gap-2 border-b-[0.5px] border-slate-400'>
              <MdLiveTv />
              <span className='font-mukta text-lg'>Episodes Watched</span>
            </div>
            <div className='h-2/3 centering font-alfa text-3xl'>{episodeCount}</div>
          </div>


          {/* TV TIME */}
          <div className='w-1/5 flex flex-col items-center border-[0.5px] border-slate-400 bg-[#15202a] bg-opacity-70 text-white rounded-xl'>

            <div className='h-1/3 w-full centering gap-2 border-b-[0.5px] border-slate-400'>
              <MdLiveTv />
              <span className='font-mukta text-lg'>TV Time</span>
            </div>

            <div className='h-2/3 centering gap-2 '>
              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalTVRuntime/60/24/30)}</span>
                <span className='font-oswald uppercase'>Months</span>
              </div>

              <span className='font-alfa text-xl'>:</span>

              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalTVRuntime/60/24%30)}</span>
                <span className='font-oswald uppercase'>Days</span>
              </div>

              <span className='font-alfa text-xl'>:</span>

              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalTVRuntime/60%24)}</span>
                <span className='font-oswald uppercase'>Hours</span>
              </div>
            </div>
          </div>

          {/* MOVIES WATCHED */}
          <div className='w-1/5 flex flex-col items-center border-[0.5px] border-slate-400 bg-[#15202a] bg-opacity-70 text-white rounded-xl'>
            <div className='h-1/3 w-full centering gap-2 border-b-[0.5px] border-slate-400'>
              <MdLiveTv />
              <span className='font-mukta text-lg'>Movies Watched</span>
            </div>
            <div className='h-2/3 centering font-alfa text-3xl'>{data?.watchedMedia?.movies.length}</div>
          </div>

          {/* MOVIES TIME */}
          <div className='w-1/5 flex flex-col items-center border-[0.5px] border-slate-400 bg-[#15202a] bg-opacity-70 text-white rounded-xl'>

            <div className='h-1/3 w-full centering gap-2 border-b-[0.5px] border-slate-400'>
              <MdLiveTv />
              <span className='font-mukta text-lg'>Movie Time</span>
            </div>

            <div className='h-2/3 centering gap-2 '>
              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalMovieRuntime/60/24/30)}</span>
                <span className='font-oswald uppercase'>Months</span>
              </div>

              <span className='font-alfa text-xl'>:</span>

              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalMovieRuntime/60/24%30)}</span>
                <span className='font-oswald uppercase'>Days</span>
              </div>

              <span className='font-alfa text-xl'>:</span>

              <div className='flex flex-col items-center justify-center'>
                <span className='font-alfa text-2xl'>{Math.floor(totalMovieRuntime/60%24)}</span>
                <span className='font-oswald uppercase'>Hours</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ContentCenter>
  )
}

export default ProfileTabs