import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import ContentCenter from '../../utilityComponent/ContentCenter';
import SwitchTabs from '../../utilityComponent/SwitchTabs';
import Carousel from '../Carousel/Carousel';

const Popular = () => {

    const [endpoint,setEndpoint] = useState('movie');
    const {data, loading} = useFetch(`/${endpoint}/popular`)

    const onTabChange = (value) => {
        setEndpoint(value === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <div>
            <ContentCenter>
                <div className="flex justify-between items-center my-10">
                    <div className="text-xl md:text-3xl font-fina font-medium text-white">
                        {endpoint === 'movie' ? 'Popular - Movies' : 'Popular - TV Shows'}
                    </div>
                    <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}/>
                </div>
                <div>
                    <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
                </div>

                {/* <div className='text-white flex w-[80px] justify-between items-center text-lg hover:text-[#c3e200] hover:cursor-pointer hover:scale-105 duration-200'>
                    <span>See All</span>
                    <FaArrowRight />
                </div> */}
            </ContentCenter>
        </div>
    );
}

export default Popular
