import React, { useState } from 'react'

const SwitchTabs = ({data, onTabChange}) => {

    const [selected, setSelected] = useState(0)

    const activeTab = (item, index) => {
        setSelected(index);
        onTabChange(item)

    }



    return (
        <div className='h-[35px] md:h-[45px] p-1 flex bg-white rounded-2xl text-black'>
            <div className='flex'>
                {data.map((item,index)=>{
                    return(
                        <div key={index} onClick={()=>activeTab(item, index)} className={`flex justify-center items-center w-[80px] md:w-[100px] cursor-pointer rounded-xl font-poppins font-semibold text-sm md:text-lg ${selected === index ? 'bg-gradient-to-br from-yellow-300 to-yellow-600' : ''}`}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SwitchTabs
