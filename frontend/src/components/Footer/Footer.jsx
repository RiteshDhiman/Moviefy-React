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
        <div className='w-full py-10 flex flex-col mt-24 gap-4'>

          <div className='flex flex-col md:flex-row w-full gap-4'>
            
            <div className='font-monoton text-5xl 2xl:text-6xl uppercase cursor-pointer text-white w-full centering md:w-1/2'>Moviefy</div>
            
            <div className='w-full md:w-1/2 flex flex-col gap-2 centering text-white'>
              <div className='text-lg md:text-xl font-fina'>Get in Touch</div>
              <div className='flex w-full justify-center gap-3'>
                <a href="https://www.linkedin.com/in/ritesh-dhiman-542ab8261/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} className='w-9 cursor-pointer hover:scale-110 duration-200' />
                </a>
                <a href="mailto:riteshdhiman24@gmail.com">
                  <img src={gmail} className='w-9 cursor-pointer hover:scale-110 duration-200' />
                </a>
                <a href="https://www.instagram.com/ritesh3112_/" target="_blank" rel="noopener noreferrer">
                  <img src={instagram} className='w-9 cursor-pointer hover:scale-110 duration-200' />
                </a>
              </div>
            </div>

          </div>

          <div className='text-center font-fina text-lg text-slate-200'>
            Discover the latest hits, rediscover classics, and keep track of every episode and movie you've watched. Personalize your viewing journey and never miss a moment of entertainment.
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
