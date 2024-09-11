import { useFormik } from 'formik'
import React, { useState } from 'react'
import { loginSchema } from '../../../schemas'
import close from '../../../assets/close.png'
import loginbg from '../../../assets/loginbg.png'
import {motion} from 'framer-motion'
import SignUp from './SignUp'
import Login from './Login'

const Authentication = ({handleLogin}) => {

  const [loginSignup, setloginSignup] = useState('login')

  const loginsignuphandle = () => {
    loginSignup === 'login' ? setloginSignup('signup') : setloginSignup('login')
  }

  const handleFormClose = (text) => {
    if(text === 'close'){
      handleLogin()
    }
  }

  return (
    <div className = 'w-full h-[100vh] absolute z-10 top-0 flex justify-center items-center'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className='w-4/5 md:w-2/3 h-3/4 md:h-5/6 fixed flex rounded-xl shadow-2xl shadow-black'
        >

          <div className='absolute top-3 right-4 z-10'>
            <img src={close} className='w-5 md:w-7 invert hover:scale-110 duration-200 cursor-pointer' onClick={handleLogin}/>
          </div>

          <div className='hidden md:block w-1/2 bg-black absolute top-0 h-full opacity-60 z-10'></div>

          <div className='hidden absolute md:flex flex-col justify-center items-center w-1/2 top-1/2 text-white z-20 gap-5'>
            <div className='font-anton text-4xl'>
              Track • Discover • Enjoy
            </div>
            <div className='w-4/5 font-mukta text-lg text-center'>
              Discover the latest hits, rediscover classics, and keep track of every episode and movie you've watched. Personalize your viewing journey and never miss a moment of entertainment.
            </div>
          </div>

          <div className='hidden md:block w-1/2 rounded-l-xl h-full overflow-hidden'>
            {/* <img src={url + loginBg} className='w-full'/> */}
            <img src={loginbg} className='h-full w-auto object-cover' />
          </div>

          {
            loginSignup === 'login' ? <Login loginsignuphandle={loginsignuphandle} handleFormClose={handleFormClose}/> : <SignUp loginsignuphandle={loginsignuphandle} handleFormClose={handleFormClose}/>
          }
        </motion.div>
      </div>
  )
}

export default Authentication
