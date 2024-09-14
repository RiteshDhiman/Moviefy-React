import { useFormik } from "formik";
import React from "react";
import { signupSchema } from "../../../schemas";
import { useFirebase } from "../../../Context/Firebase";
import google from '../../../assets/google.png'
import { updateProfile } from "firebase/auth";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({loginsignuphandle, handleFormClose}) => {

  const firebase = useFirebase();

  const onSubmit = async(values, actions) => {
    try {
      const userCredentials = await firebase.signupwithemailandpassword(values.email, values.password)

      await updateProfile(userCredentials.user, {
        displayName : `${values.first_name} ${values.last_name}`
      })

      const userId = userCredentials.user.uid;
      const fullName = userCredentials.user.displayName

      // const userIDSend = await axios.post('http://localhost:3000/auth/signup', {userId, fullName})
      const userIDSend = await axios.post('https://moviefy-backend.vercel.app/auth/signup', {userId, fullName})

      toast.success('Account created successfully')
      actions.resetForm()
      handleFormClose('close')
    } catch (error) {
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
          <button type='submit' className='mt-4 rounded-full h-[40px] bg-[#c4e200] font-semibold'>
            Sign Up
          </button>
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
          Already have an account? <span className='text-[#c4e200] cursor-pointer' onClick={loginsignuphandle}>Sign In now</span>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
