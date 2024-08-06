import React from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import LazyLoadImages from '../../utilityComponent/LazyLoadImages'
import moviefy from '../../assets/moviefy_logo.jpeg'
import gmail from '../../assets/contactme/gmail.png'
import instagram from '../../assets/contactme/instagram.png'
import linkedin from '../../assets/contactme/linkedin.png'

const Footer = () => {
  return (
    <div className='w-full bg-black'>
      <ContentCenter>
        <div className='w-full py-12 flex flex-col gap-2 md:flex-row'>

          <div className='w-full flex justify-center items-center md:w-1/3'>
            <img src={moviefy} className="w-2/3 md:w-full" />
          </div>

          <div className='w-full md:w-2/3 flex flex-col items-center font-poppins text-gray-200 gap-5'>

            <div className='flex flex-col items-center w-1/2 md:w-1/4 md:gap-2'>
              <span className='text-lg md:text-xl'>Get in touch</span>
              <div className='flex w-full justify-evenly'>
                <LazyLoadImages className="w-9" src={gmail}/>
                <LazyLoadImages className="w-9" src={instagram}/>
                <LazyLoadImages className="w-9" src={linkedin}/>
              </div>
            </div>

            <div className='text-center'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, ab?
            </div>
          </div>

        </div>
      </ContentCenter>

      <div className='h-[1px] w-full bg-gray-300'></div>

      <div className='w-full text-center font-poppins text-gray-200 py-5'>
        Made with ❤️ by Ritesh Dhiman
      </div>

    </div>
  )
}

export default Footer
