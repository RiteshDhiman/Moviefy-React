import React, { useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import useFetch from '../../hooks/useFetch'
import Carousel from '../Carousel/Carousel'

const NowPlaying = () => {

    const {data, loading} = useFetch('/movie/now_playing')

    return (
        <div>
            <ContentCenter>
                <div className="flex justify-between items-center mt-8 mb-4">
                    <div className="text-xl md:text-3xl font-poppins font-medium text-white">
                        In Cinemas
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
