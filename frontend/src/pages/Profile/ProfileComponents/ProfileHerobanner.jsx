import React from 'react'
import { useFirebase } from '../../../Context/Firebase'

const ProfileHerobanner = ({userName}) => {
  const firstLetter = userName?.split('')[0];
  return (
    <div className='h-[45vh] w-full flex items-center justify-center text-white bg-slate-500'>
      <div className='w-1/3 h-1/3 flex'>
        <div className='flex justify-center items-center h-full w-1/4'>
          <div className='w-[100px] h-[100px]  rounded-full flex justify-center items-center'> 
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
  )
}

export default ProfileHerobanner
