import React from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter.jsx'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-red-300 h-[80px] backdrop-blur-lg'>
      <ContentCenter className={"h-full"}>
        <div className='text-white flex justify-between items-center h-full '>
            
            <div onClick={()=>navigate('/')} className='hover:cursor-pointer'>MOVIEFY</div>

            <div>
                <ul className='flex gap-6 items-center text-xl font-semibold'>
                <li className='hover:text-yellow-500 cursor-pointer'>Movies</li>
                <li className='hover:text-yellow-500 cursor-pointer'>TV Shows</li>
                <li><FiSearch onClick={()=>setSearchBar(true)} className='text-2xl hover:text-yellow-500 cursor-pointer'/></li>
                </ul>
            </div>

        </div>
      </ContentCenter>
    </div>
  )
}

export default Navbar
