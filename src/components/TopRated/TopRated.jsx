import React, { useState } from 'react'
import ContentCenter from '../../utilityComponent/ContentCenter'
import useFetch from '../../hooks/useFetch'
import SwitchTabs from '../../utilityComponent/SwitchTabs'
import Carousel from '../Carousel/Carousel'
import { useSelector } from 'react-redux'

const TopRated = () => {

    const dataStore = useSelector((state)=>state.home)

    const [endpoint, setEndpoint] = useState('movie')
    const {data, loading} = useFetch(`/${endpoint}/top_rated`)

    const onTabChange = (value) => {
        setEndpoint(value === 'Movie' ? 'movie' : 'tv')
    }

    console.log(dataStore.list)

    return (
        <div>
            <ContentCenter>
                <div className="flex justify-between items-center my-10">
                    <div className="text-xl md:text-3xl font-poppins font-medium text-white">
                        {endpoint === 'movie' ? 'Top Rated - Movies' : 'Top Rated - TV Shows'}
                    </div>
                    <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}/>
                </div>

                <div>
                    <Carousel data={data?.results} loading={loading}/>
                </div>
            </ContentCenter>
        </div>
    )
}

export default TopRated
