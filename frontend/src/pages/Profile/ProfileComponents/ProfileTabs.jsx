import React from 'react'
import ContentCenter from '../../../utilityComponent/ContentCenter'

const ProfileTabs = ({data}) => {
  return (
    <ContentCenter>
      <div className='flex gap-2 px-2 w-full py-10 bg-red-400'>

        <div className='w-1/5 flex flex-col items-center justify-center border-2 border-black'>
          <div>TV Show watched</div>
          <div>{data?.watchedMedia?.tvShows.length}</div>
        </div>

        <div className='w-1/5 flex flex-col items-center justify-center border-2 border-black'>
          <div>Episodes watched</div>
          <div>{data?.watchedMedia?.tvShows.length}</div>
        </div>

        <div className='w-1/5 flex flex-col items-center justify-center border-2 border-black'>
          <div>TV time</div>
          <div>{data?.watchedMedia?.tvShows.length}</div>
        </div>

        <div className='w-1/5 flex flex-col items-center justify-center border-2 border-black'>
          <div>Movies watched</div>
          <div>{data?.watchedMedia?.movies.length}</div>
        </div>

        <div className='w-1/5 flex flex-col items-center justify-center border-2 border-black'>
          <div>Movie Time</div>
          <div>{data?.watchedMedia?.tvShows.length}</div>
        </div>

      </div>
    </ContentCenter>
  )
}

export default ProfileTabs
