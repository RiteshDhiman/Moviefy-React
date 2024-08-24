import { useFormik } from 'formik'
import React, { useState } from 'react'
import { loginSchema } from '../../../schemas'
import google from '../../../assets/google.png'
import close from '../../../assets/close.png'

const Login = ({handleLogin}) => {

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
    <div className = {`w-full h-[100vh] absolute z-10 top-0 flex justify-center items-center`}>
        <div className='w-2/3 h-5/6 bg-red-300 fixed flex rounded-xl'>

        <div className='absolute top-3 right-4 z-10'>
          <img src={close} className='w-7 invert hover:scale-110 duration-200 cursor-pointer' onClick={handleLogin}/>
        </div>

          <div className='w-1/2 bg-orange-300 rounded-l-xl'>1</div>
          {
            loginSignup === 'login' ?
            <div style={{background: 'radial-gradient(circle, #002f4c 30%, #001c2a 100%)',}} className='w-1/2 flex items-center justify-center rounded-r-xl'>
              <div className='w-2/3 h-3/4 flex flex-col items-center justify-center gap-5'>
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
        </div>
      </div>
  )
}

export default Login
