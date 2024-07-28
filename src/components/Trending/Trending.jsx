import React, { useState } from "react";
import ContentCenter from "../../utilityComponent/ContentCenter";
import SwitchTabs from "../../utilityComponent/SwitchTabs";
import useFetch from '../../hooks/useFetch';
import Carousel from "../Carousel/Carousel";

const Trending = () => {

    const [endpoint, setEndpoint] = useState('day')

    const {data, loading} = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (item) => {
        setEndpoint(item === "Day" ? 'day' : 'week')
    }

    return (
        <div>
            <ContentCenter>
                <div className="flex justify-between items-center my-10">
                    <div className="text-xl md:text-3xl font-fina font-medium text-white">
                        {endpoint === 'day' ? 'Trending - Today' : 'Trending - Weekly'}
                    </div>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
                </div>
                <div>
                    <Carousel data={data?.results} loading={loading}/>
                </div>
            </ContentCenter>
        </div>
    );
};

export default Trending;
