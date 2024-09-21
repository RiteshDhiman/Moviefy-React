import React, { useEffect, useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter.jsx'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { LuMenu } from "react-icons/lu";
import moviefy from '../../assets/moviefy_logo.jpeg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Authentication from './LoginSignup/Authentication.jsx'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { motion } from 'framer-motion'
import dashboard from '../../assets/navbar/dashboard.png'
import watchlater from '../../assets/navbar/watchlater.png'
import menuBar from '../../assets/navbar/menuBar.png'
import DetailedMenu from './DetailedMenu.jsx';

const Navbar = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState(false)
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false)
  const [text, setText] = useState();
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(false)
  const [detailedMenu, setDetailedMenu] = useState(false)
  const [firstName, setFirstName] = useState(null)
  const auth = getAuth()

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setFirstName(currentUser?.displayName?.split(' ')[0])
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
    <div className='h-[9vh] 2xl:h-[7vh] flex flex-col justify-center items-center w-full z-10 bg-black bg-opacity-70'>
      <ContentCenter className={"h-full relative"}>
        <div className='text-white flex justify-between items-center h-full'>
            
            <div onClick={()=>navigate('/')} className='hover:cursor-pointer w-[45%] md:w-1/6'>
              <img src={moviefy} alt="" />
            </div>

            <div className='h-full centering'>
              <ul className='flex gap-4 md:gap-6 items-center text-lg font-mukta h-full'>

                <li 
                  className='hidden md:flex centering gap-2 hover:text-[#c3e200] h-full cursor-pointer' 
                  onClick={()=>setDetailedMenu(!detailedMenu)}
                  onMouseEnter={()=>setDetailedMenu(true)}
                  onMouseLeave={()=>setDetailedMenu(false)}
                >
                  <img src={menuBar} className='w-5 invert'/>
                  <span>Menu</span>
                </li>

                <li className='hidden md:flex hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/profile')}>
                  {/* <img src={dashboard} className='w-6' /> */}
                  Dashboard
                </li>

                <li className='hidden md:flex centering gap-1 hover:text-[#c3e200] cursor-pointer' onClick={()=>navigate('/watchlist')}>
                  <img src={watchlater} className='w-5' />
                  WatchList
                </li>

                <li><FiSearch onClick={handleSearch} className='text-2xl hover:text-[#c3e200] cursor-pointer'/></li>

                {user ? (
                <div className='flex items-center gap-2 h-full' onMouseLeave={()=>setProfile(false)}>
                  <button className='bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300' 
                    onMouseEnter={()=>setProfile(true)}
                    onClick={()=>setProfile(!profile)}
                  >
                    {firstName}
                  </button>
                </div>
                ) : (
                  <button className='bg-[#c3e200] px-4 py-1 rounded-lg font-mukta font-medium text-black hover:scale-105 duration-300' onClick={handleLogin}>
                    Log In
                  </button>
                )}

                <LuMenu className='block md:hidden text-3xl text-white hover:cursor-pointer' onClick={handleMenu}/>
                
              </ul>
            </div>

        </div>

        {profile && (
          <div className='absolute flex flex-col gap-2 right-0 top-[9vh] 2xl:top-[7vh] w-3/4 md:w-1/4 z-50 bg-black text-white p-4 rounded-b-lg shadow-lg' onMouseLeave={()=>setProfile(false)} onMouseEnter={()=>setProfile(true)}>

            <div className='flex flex-col w-full'>
              <div className='flex flex-col items-center justify-center gap-1'>
                <div className='h-[50px] w-[50px] border-2 border-[#c3e200] bg-[#c3e200] bg-opacity-30 rounded-full flex items-center justify-center font-poetsen text-2xl text-[#ffffff]'>
                  {firstName?.split('')[0]}
                </div>
                <div className='font-mukta text-xl'>{user?.displayName}</div>
              </div>

            </div>
            <motion.button 
              className='cursor-pointer bg-red-600 rounded-xl py-2 font-mukta text-lg font-semibold' 
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Sign Out
            </motion.button>
          </div>
        )}

        {search &&
          <div className='absolute z-50 w-full flex justify-center items-center mt-10 h-[40px]'>
            <input type="text" className='w-2/3 md:w-1/2 h-full outline-none pl-4 rounded-l-lg' onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>handleSearchEnter(e)}/>
            <button className='w-1/4 md:w-1/6 h-full bg-[#c3e200] font-oswald rounded-r-lg' onClick={handleSearchOnclick}>Search</button>
          </div>
        }

      </ContentCenter>

      {detailedMenu && <DetailedMenu setDetailedMenu={setDetailedMenu} />} 

      {login && <Authentication handleLogin={handleLogin}/>}

      {menu &&
          <div className='absolute top-13 z-50 bg-black w-full flex flex-col text-white md:hidden centering gap-4 text-xl py-10 '>
            <div onClick={()=>{navigate('/search/movie'); setMenu(false)}}>Movies</div>
            <div onClick={()=>{navigate('/search/tv'); setMenu(false)}}>TV Shows</div>
            <div onClick={()=>{navigate('/movie/now_playing'); setMenu(false)}}>In Cinemas</div>
            <div onClick={()=>{navigate('/watchlist'); setMenu(false)}}>WatchList</div>
            <div onClick={() => {navigate('/profile'); setMenu(false)}}>Profile</div>
          </div>
        }
    </div>
  )
}

export default Navbar
