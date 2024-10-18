import React from 'react'
import { useFirebase } from '../../../Context/Firebase'
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';

const ProfileHerobanner = ({userName}) => {

  const firstLetter = userName?.split('')[0];

  const { url } = useSelector((state)=>state.home)

  const backgrounds = [
    "/cHyY5z4txdVyGtYMvBJhCqCcJso.jpg",
    "/3GQKYh6Trm8pxd2AypovoYQf4Ay.jpg",
    "/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
    "/yNU8UF3DOmv3G9gVNAj34beclTG.jpg",
    "/9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg",
    "/wSZbtiFIK1fkKZdSRtn2kz2Ttfd.jpg"   
  ]
  return (
    <div className='relative h-[50vh] w-full'>
      <div className='h-full w-full'>
        <img src={url + backgrounds[Math.floor(Math.random() * backgrounds.length)]} className='h-full w-full object-cover opacity-70' />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className='absolute top-0 h-[50vh] w-full flex items-center justify-center text-white'>
        <div className='w-2/3 md:w-1/2 h-1/3 flex'>
          <div className='centering justify-end h-full w-1/3'>
            <div className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] font-mukta text-4xl border-2 border-[#c3e200] bg-[#c3e200] bg-opacity-30 rounded-full centering'>
              {firstLetter}
            </div>
          </div>
          <div className='w-full h-full centering text-6xl font-poetsen'>
            <Typewriter options={{
              strings : [userName],
              autoStart : true,
              loop : false,
              cursor: '',
              deleteSpeed : 0
            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHerobanner
