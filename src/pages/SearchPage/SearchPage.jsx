import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentCenter from "../../utilityComponent/ContentCenter";
import noposter from "../../assets/no-poster.png"
import { TbBasketX } from "react-icons/tb";

const SearchPage = () => {

  const navigate = useNavigate();

  const { text } = useParams();
  const { media } = useParams();
  const { data, loading } = text === undefined ? useFetch(`/discover/${media}`) : useFetch(`/search/multi?query=${text}&page=1`);

  const { url } = useSelector((state) => state.home);

  console.log(media)
  console.log(text)

  // const capitalize = (word) => {
  //   const temp = word.slice(0, 1).toUpperCase();
  //   return temp + word.slice(1);
  // };

  // useEffect(()=>{
  //   handleScroll()
  // })

  // const handleScroll = async() => {
  //   console.log(window.innerHeight);
  //   console.log(document.documentElement.scrollTop);
  //   console.log(document.documentElement.scrollHeight)
  // }

  return (
    <div className="flex flex-col text-white">
      {/* <img src={img.url + data?.results[0]?.poster_path} alt="" />
            <span className='text-3xl font-bol bg-red-300'>{data?.results[0]?.title}</span> */}
      <ContentCenter>

        <div className="py-10 font-poetsen text-3xl">
          <span>Search Results for '<span>{text}</span>'</span>
        </div>

        <div className="grid grid-cols-4 gap-6">
            
          {data?.results.map((item) => {
            return (
              <div key={item.id} onClick={()=>navigate(`/${item?.media_type}/${item?.id}`)}>
                <img
                  src={item.poster_path ? url + item.poster_path : noposter}
                  className="hover:opacity-60 duration-300 rounded-tl-xl rounded-tr-xl object-cover"
                  alt="Image Unavailable"/>
                
                <div>
                    {item.title || item.name}
                </div>
              </div>
            );
          })}
        </div>
      </ContentCenter>
    </div>
  );
};

export default SearchPage;
