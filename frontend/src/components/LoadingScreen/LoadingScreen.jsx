import React, { useEffect } from 'react'
import { Bounce, Dots, Sentry, Spinner } from 'react-activity'
import "react-activity/dist/library.css";

const LoadingScreen = () => {

  useEffect(()=>{
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])
  
  return (
    <div className='z-50 fixed top-0 h-screen w-full bg-black bg-opacity-55 text-white centering'>
      {/* <Spinner size={40} speed={0.8}/> */}
      <Bounce size={50} speed={1}/>
      {/* <Dots size={40}/> */}
    </div>
  )
}

export default LoadingScreen
