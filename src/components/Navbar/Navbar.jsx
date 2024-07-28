import React, { useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter.jsx'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(!login);
    console.log('hello')
  }

  return (
    <div className='h-[60px] top-0 w-full z-10 bg-black bg-opacity-70'>
      <ContentCenter className={"h-full"}>
        <div className='text-white flex justify-between items-center h-full '>
            
            <div onClick={()=>navigate('/')} className='hover:cursor-pointer'>MOVIEFY</div>

            <div>
                <ul className='flex gap-6 items-center text-lg font-mukta'>
                <li className='hover:text-yellow-500 cursor-pointer'>Movies</li>
                <li className='hover:text-yellow-500 cursor-pointer'>TV Shows</li>
                <li className='hover:text-yellow-500 cursor-pointer'>In Cinemas</li>
                <li><FiSearch onClick={()=>setSearchBar(true)} className='text-2xl hover:text-yellow-500 cursor-pointer'/></li>
                <button className='bg-yellow-300 px-4 py-1 rounded-lg font-mukta font-medium text-black' onClick={()=>handleLogin()}>Log In</button>
                </ul>
            </div>

        </div>
      </ContentCenter>
      <div className={`${login ? '' : 'hidden'} w-full h-[100vh] absolute z-10 top-0`}>
        <div onClick={handleLogin} className='text-9nxl text-red-500 cursor-pointer mx-auto w-11/12 h-full bg-red-300'>X</div>
      </div>
    </div>
  )
}

export default Navbar
