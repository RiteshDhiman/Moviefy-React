import { useFormik } from 'formik'
import React, { useState } from 'react'
import { loginSchema } from '../../../schemas'
import google from '../../../assets/google.png'
import close from '../../../assets/close.png'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import LazyLoadImages from '../../../utilityComponent/LazyLoadImages'
import loginbg from '../../../assets/loginbg.png'
import {motion} from 'framer-motion'

const Login = ({handleLogin}) => {

  const posterPath = [
    "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
    "/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    "/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    "/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
    "/7WfK17BXE6szXlm4WOxfswgbdsL.jpg",
    "/yXCbOiVDCxO71zI7cuwBRXdftq8.jpg",
    "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
    "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    "/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
    "/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
  ]

  const {url} = useSelector((state)=>state.home)

  const loginBg = posterPath[Math.floor(Math.random()*posterPath.length)]

  const [loginSignup, setloginSignup] = useState('login')

  const loginsignuphandle = () => {
    loginSignup === 'login' ? setloginSignup('signup') : setloginSignup('login')
  }

  const onSubmit = (values, actions) => {
    console.log("Form Submitted")
    actions.resetForm()
  }

  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:{
        email : "",
        password : ""
    },
    validationSchema : loginSchema,
    onSubmit
  }) 

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
            loginSignup === 'login' ?
            <div style={{background: 'radial-gradient(circle, #002f4c 30%, #001c2a 100%)',}} className='w-full md:w-1/2 flex items-center justify-center rounded-xl md:rounded-r-xl'>
              <div className='w-4/5 md:w-2/3 h-3/4 flex flex-col items-center justify-center gap-5'>
                <div className='font-fina font-bold text-2xl text-white'>Sign in to Moviefy</div>

                <form onSubmit={handleSubmit} className='font-mukta flex flex-col w-11/12' autoComplete='off'>
                  <input 
                      value={values.email} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      id='email' 
                      placeholder='Email' 
                      type="email" 
                      className={'rounded-full h-[40px] pl-4 outline-none'}
                  />
                  {errors.email && <span className='text-[#c4e200] pl-4 text-sm'>{errors.email}</span>}
                  <input 
                      type="password"
                      value={values.password} 
                      onChange={handleChange}
                      onBlurCapture={handleBlur}
                      className={'mt-2 rounded-full h-[40px] pl-4 outline-none'}
                      id='password'
                      placeholder='Password'
                  />
                  {errors.password && <span className='text-[#c4e200] pl-4 text-sm'>{errors.password}</span>}
                  <button type='submit' className='mt-4 rounded-full h-[40px] bg-[#c4e200] font-semibold'>
                    Sign In
                  </button>
                </form>

                <div className='flex text-white font-mukta gap-2'>
                  <p>----------</p>
                  Or Login with
                  <p>----------</p>
                </div>

                <div className='flex items-center justify-center rounded-full w-11/12 gap-3 h-[40px] border-[1px] border-gray-300'>
                  <img src={google} className='h-2/3'/>
                  <span className='text-white font-semibold'>Google</span>
                </div>

                <div className='font-mukta text-white font-semibold'>
                  Don't have an account? <span className='text-[#c4e200] cursor-pointer' onClick={loginsignuphandle}>Sign Up now</span>
                </div>
              </div>
            </div>

            :

            <div style={{background: 'radial-gradient(circle, #002f4c 30%, #001c2a 100%)',}} className='w-1/2 flex items-center justify-center rounded-r-xl'>
              <div className='w-2/3 h-3/4 flex flex-col items-center justify-center gap-5'>
                <div className='font-fina font-bold text-2xl text-white'>Sign up to Moviefy</div>

                <form onSubmit={handleSubmit} className='font-mukta flex flex-col w-11/12' autoComplete='off'>

                  <div className='flex w-full gap-2 mb-2'>
                    <input 
                      type="text"
                      className='w-1/2 rounded-l-full h-[40px] pl-4 outline-none'
                      placeholder='First Name'
                    />

                    <input 
                      type="text"
                      className='w-1/2 rounded-r-full h-[40px] pl-2 outline-none'
                      placeholder='Last Name'
                    />

                  </div>

                  <input 
                      value={values.email} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      id='email' 
                      placeholder='Email' 
                      type="email" 
                      className={errors.email ? 'rounded-full h-[40px] pl-4 outline-none border-2 border-red-600' : 'rounded-full h-[40px] pl-4 outline-none'}
                  />
                  {errors.email && <span className='text-[#c4e200] pl-4 text-sm'>{errors.email}</span>}
                  <input 
                      type="password"
                      value={values.password} 
                      onChange={handleChange}
                      onBlurCapture={handleBlur}
                      className={errors.email ? 'mt-2 rounded-full h-[40px] pl-4 outline-none border-2 border-red-600' : 'mt-2 rounded-full h-[40px] pl-4 outline-none'}
                      id='password'
                      placeholder='Password'
                  />
                  {errors.password && <span className='text-[#c4e200] pl-4 text-sm'>{errors.password}</span>}
                  <button type='submit' className='mt-4 rounded-full h-[40px] bg-[#c4e200] font-semibold'>
                    Sign In
                  </button>
                </form>

                <div className='flex text-white font-mukta gap-2'>
                  <p>----------</p>
                  Or Login with
                  <p>----------</p>
                </div>

                <div className='flex items-center justify-center rounded-full w-11/12 gap-3 h-[40px] border-[1px] border-gray-300'>
                  <img src={google} className='h-2/3'/>
                  <span className='text-white font-semibold'>Google</span>
                </div>

                <div className='font-mukta text-white font-semibold'>
                  Don't have an account? 
                  <span className='text-[#c4e200] cursor-pointer' onClick={loginsignuphandle}>
                    {loginSignup === 'login' ? 'Sign up now' : ' Sign In now'}
                  </span>
                </div>
              </div>
            </div>
            
          }
        </motion.div>
      </div>
  )
}

export default Login
