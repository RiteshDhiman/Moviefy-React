import React from 'react'
import Herobanner from '../../components/HeroBanner/Herobanner'
import Trending from '../../components/Trending/Trending'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import TopRated from '../../components/TopRated/TopRated'
import Popular from '../../components/Popular/Popular'

const Home = () => {
  return (
    <div>
      <Herobanner/>
      <Trending/>
      <NowPlaying/>
      <TopRated/>
      <Popular/>
    </div>
  )
}

export default Home
