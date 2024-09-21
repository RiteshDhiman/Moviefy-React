import { useFormik } from 'formik'
import React, { useState } from 'react'
import { loginSchema } from '../../../schemas'
import google from '../../../assets/google.png'
import { useFirebase } from '../../../Context/Firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'

const Login = ({loginsignuphandle, handleFormClose, setLoading}) => {

  const firebase = useFirebase();

  const onSubmit = async (values, actions) => {
    try {
      setLoading(true)
      await firebase.signinwithemailandpassword(values.email, values.password);
      setLoading(false)
      toast.success('Login Successful');
      actions.resetForm()
      handleFormClose('close')
    } catch (error) {
        alert('Login failed')
    }
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
            <motion.button 
              type='submit' 
              className='mt-4 rounded-full h-[40px] bg-[#c4e200] font-semibold'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Sign In
            </motion.button>
          </form>

          <div className='flex text-white font-mukta gap-2'>
            <p>----------</p>
            Or Login with
            <p>----------</p>
          </div>

          <button 
            className='flex items-center justify-center rounded-full w-11/12 gap-3 h-[40px] border-[1px] border-gray-300'
            onClick={()=>firebase.googlesignup()}
          >
            <img src={google} className='h-2/3'/>
            <span className='text-white font-semibold'>Google</span>
          </button>

          <div className='font-mukta text-white font-semibold'>
            Don't have an account? <span className='text-[#c4e200] cursor-pointer' onClick={loginsignuphandle}>Sign Up now</span>
          </div>
      </div>
    </div>
  )
}

export default Login
