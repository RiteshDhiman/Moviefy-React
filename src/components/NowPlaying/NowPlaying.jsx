import React, { useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import useFetch from '../../hooks/useFetch'
import Carousel from '../Carousel/Carousel'
import { FaArrowRight } from "react-icons/fa6";

const NowPlaying = () => {

    const {data, loading} = useFetch('/movie/now_playing')

    return (
        <div>
            <ContentCenter>
                <div className="flex justify-between items-center mt-8 mb-4">
                    <div className="text-xl md:text-3xl font-fina font-medium text-white">
                        In Cinemas
                    </div>
                    <div className='text-white flex w-[80px] justify-between items-center text-lg hover:text-[#c3e200] hover:cursor-pointer hover:scale-105 duration-200'>
                        <span>See All</span>
                        <FaArrowRight />
                    </div>
                </div>

                <div>
                    <Carousel data={data?.results} loading={loading} endpoint={'movie'}/>
                </div>

            </ContentCenter>
        </div>
    )
}

export default NowPlaying
