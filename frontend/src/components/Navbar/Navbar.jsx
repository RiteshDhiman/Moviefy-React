import React, { useEffect, useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter.jsx'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { LuMenu } from "react-icons/lu";
import moviefy from '../../assets/moviefy_logo.jpeg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Authentication from './LoginSignup/Authentication.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useFirebase } from '../../Context/Firebase.jsx';
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState(false)
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false)
  const [text, setText] = useState();
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(false)
  const firebase = useFirebase()
  const auth = firebase.firebaseauth

  const firstName = user?.displayName.split(' ')[0];

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // console.log(currentUser)
    })

    return () => unsubscribe()
  }, [auth])

  const handleLogin = () => {
    setLogin(!login);
  }

  const handleMenu = () => {
    setMenu(!menu);
    console.log(menu)
  }

  const handleSearch = () => {
    setSearch(!search)
  }
  
  const handleSearchOnclick = () => {
    navigate(`/search/multi/${text}`);
    setSearch(!search)
  }

  const handleSearchEnter = (e) => {
    if(e.key === 'Enter'){
      handleSearchOnclick()
    }
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.reload()
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className='py-3 flex flex-col justify-center items-center w-full z-10 bg-black bg-opacity-70'>
      <ContentCenter className={"h-full relative"}>
        <div className='text-white flex justify-between items-center h-full'>
            
            <div onClick={()=>navigate('/')} className='hover:cursor-pointer w-1/3 md:w-1/6'>
              <img src={moviefy} alt="" />
            </div>

            <div>
              <ul className='flex gap-6 items-center text-lg font-mukta'>

                <li className='hidden md:block hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/search/movie')}>
                  Movies
                </li>

                <li className='hidden md:block hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/search/tv')}>
                  TV Shows
                </li>

                <li className='hidden md:block hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/movie/now_playing')}>
                  In Cinemas
                </li>

                {firebase.firebaseauth.currentUser &&
                  <li className='hidden md:block hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/watchlist')}>
                    WatchList
                  </li>
                }

                <li><FiSearch onClick={handleSearch} className='text-2xl hover:text-[#c3e200] cursor-pointer'/></li>

                {user ? (
                <div className='flex items-center gap-2'>
                  <button className='bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300' 
                    onMouseEnter={()=>setProfile(true)}
                    // onMouseLeave={handleProfile}
                  >
                    {firstName}
                  </button>
                </div>
              ) : (
                <button className='bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300' onClick={handleLogin}>
                  Log In
                </button>
              )}

                <LuMenu className='block md:hidden text-white hover:cursor-pointer' onClick={handleMenu}/>
                
              </ul>
            </div>

        </div>
        
        {menu &&
          <div className='absolute flex flex-col text-white md:hidden '>
            <div>Movies</div>
            <div>TV Shows</div>
            <div>In Cinemas</div>
          </div>
        }

        {profile && (
          <div className='absolute flex flex-col gap-3 right-0 top-12 mt-2 w-1/4 z-50 bg-black text-white p-4 rounded-lg shadow-lg' onMouseLeave={()=>setProfile(false)}>

            <div className='flex flex-col w-full'>
              <div className='flex flex-col items-center justify-center'>
                <div className='h-[50px] w-[50px] border-2 border-[#c3e200] bg-[#c3e200] bg-opacity-30 rounded-full flex items-center justify-center'>{firstName.split('')[0]}</div>
                <div>{user.displayName}</div>
              </div>
              <div className='hover:text-[#c3e200] cursor-pointer' onClick={() => navigate('/profile')}>Profile</div>
              <div className='hover:text-[#c3e200] cursor-pointer' onClick={() => navigate('/watchlist')}>Watch Later</div>

            </div>
            <div className='w-full h-[1px] bg-white'></div>
            <div className='hover:text-[#c3e200] cursor-pointer mt-2' onClick={handleSignOut}>Sign Out</div>
          </div>
        )}

        {search &&
          <div className='w-full flex justify-center items-center mt-10 h-[40px]'>
            <input type="text" className='w-2/3 md:w-1/2 h-full outline-none pl-4 rounded-l-lg' onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>handleSearchEnter(e)}/>
            <button className='w-1/4 md:w-1/6 h-full bg-[#c3e200] font-oswald rounded-r-lg' onClick={handleSearchOnclick}>Search</button>
          </div>
        }
      </ContentCenter>
      {login && <Authentication handleLogin={handleLogin}/>}
    </div>
  )
}

export default Navbar
