import { useFormik } from "formik";
import React from "react";
import { signupSchema } from "../../../schemas";
import { useFirebase } from "../../../Context/Firebase";
import google from '../../../assets/google.png'
import { updateProfile } from "firebase/auth";
import axios from 'axios'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({loginsignuphandle, handleFormClose, setLoading}) => {

  const firebase = useFirebase();

  const onSubmit = async(values, actions) => {
    try {
      setLoading(true)
      const userCredentials = await firebase.signupwithemailandpassword(values.email, values.password)

      await updateProfile(userCredentials.user, {
        displayName : `${values.first_name} ${values.last_name}`
      })

      const userId = userCredentials.user.uid;
      const fullName = userCredentials.user.displayName


      // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL
      
      // const userIDSend = await axios.post('http://localhost:3000/auth/signup', {userId, fullName})
      const userIDSend = await axios.post('https://moviefy-react.onrender.com/auth/signup', {userId, fullName})
      // const userIDSend = await axios.post(`${BASE_ENDPOINT}/auth/signup`, {userId, fullName})
      setLoading(false)
      toast.success('Account created successfully')
      actions.resetForm()
      handleFormClose('close')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }
  
  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : {
      first_name : "",
      last_name : "",
      email : "",
      password : ""
    },

    validationSchema : signupSchema,
    onSubmit
  })
  return (
    <div style={{background: 'radial-gradient(circle, #002f4c 30%, #001c2a 100%)',}} className='w-full md:w-1/2 flex items-center justify-center rounded-xl md:rounded-r-xl'>
      <div className='w-4/5 md:w-2/3 h-3/4 flex flex-col items-center justify-center gap-5'>
        <div className='font-fina font-bold text-2xl text-white'>Sign Up to Moviefy</div>

        <form onSubmit={handleSubmit} className='font-mukta flex flex-col w-11/12' autoComplete='off'>

          <div className="flex w-full gap-2 mb-2">
            <div className="flex w-1/2 flex-col">
              <input
                type="text"
                className="w-full rounded-l-full h-[40px] pl-4 outline-none"
                placeholder="First Name"
                id="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.first_name && <span className='text-[#c4e200] pl-4 text-sm'>{errors.first_name}</span>}
            </div>

            <div className="flex w-1/2 flex-col">
              <input
                type="text"
                className="w-full rounded-r-full h-[40px] pl-4 outline-none"
                placeholder="Last Name"
                id="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.last_name && <span className='text-[#c4e200] pl-4 text-sm'>{errors.last_name}</span>}
            </div>
          </div>

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
            Sign Up
          </motion.button>
        </form>

        <div className='font-mukta text-white font-semibold'>
          Already have an account? <span className='text-[#c4e200] cursor-pointer' onClick={loginsignuphandle}>Sign In now</span>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
