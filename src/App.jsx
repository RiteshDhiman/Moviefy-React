import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import useFetch from './hooks/useFetch'
import { getConfigApi } from './store/homeSlice'
import fetchDataFromAPI from './utils/api'
import Details from './pages/Details/Details'
import SearchPage from './pages/SearchPage/SearchPage'

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
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/multi/:text' element={<SearchPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
