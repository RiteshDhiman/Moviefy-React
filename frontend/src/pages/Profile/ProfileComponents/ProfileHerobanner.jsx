import React from 'react'
import { useFirebase } from '../../../Context/Firebase'
import { useSelector } from 'react-redux';

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
        <img src={url + backgrounds[Math.floor(Math.random() * backgrounds.length)]} className='h-full w-full object-cover' />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className='absolute top-0 h-[50vh] w-full flex items-center justify-center text-white'>
        <div className='w-2/3 md:w-1/3 h-1/3 flex'>
          <div className='flex justify-center items-center h-full w-1/4'>
            <div className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] border-2 border-[#c3e200] bg-[#c3e200] bg-opacity-30 rounded-full centering'>
              {firstLetter}
            </div>
          </div>
          <div className='w-3/4 flex flex-col justify-center items-center'>
            <div className='flex flex-col'>
              <div className='text-4xl font-mukta '>{userName}</div>
              <button className='border-[1px] border-white rounded-xl w-1/3 '>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHerobanner
