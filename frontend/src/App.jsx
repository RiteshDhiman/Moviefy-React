import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { getConfigApi } from './store/homeSlice'
import fetchDataFromAPI from './utils/api'
import Details from './pages/Details/Details'
import SearchPage from './pages/SearchPage/SearchPage'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import Footer from './components/Footer/Footer'
import ScrolltoTop from './utilityComponent/ScrolltoTop'
import WatchLater from './pages/WatchLater/WatchLater'
import Profile from './pages/Profile/Profile'

function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetching = () =>{
      fetchDataFromAPI('/configuration').then((res)=>{
        dispatch(getConfigApi(res.images.base_url+ 'original'))
      })
    }

    fetching();

  })

  return (
    <div className='bg-[#030c1e]'>
    {/* <div style={{background: 'radial-gradient(circle, #001c2a 30%, #002f4c 100%)'}}> */}
      <BrowserRouter>
        <Navbar/>
        <ScrolltoTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/multi/:text' element={<SearchPage/>}/>
          <Route path='/movie/now_playing/' element={<SearchPage/>}/>
          <Route path='/trending/:media/week/' element={<SearchPage/>}/>
          <Route path='/:media/popular/' element={<SearchPage/>}/>
          <Route path='/:media/top_rated/' element={<SearchPage/>}/>
          <Route path='/movie/upcoming/' element={<SearchPage/>}/>
          <Route path='/discover/tv/' element={<SearchPage/>}/>
          <Route path='/tv/airing_today/' element={<SearchPage/>}/>
          <Route path='/watchlist' element={<WatchLater/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      <SpeedInsights/>
      <Analytics/>
    </div>
  )
}

export default App
