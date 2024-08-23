import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentCenter from "../../utilityComponent/ContentCenter";
import noposter from "../../assets/no-poster.png"
import { TbBasketX } from "react-icons/tb";
import LazyLoadImages from "../../utilityComponent/LazyLoadImages";

const SearchPage = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(1)
  
  const { text } = useParams();
  const { media } = useParams();
  const { data, loading } = text === undefined ? useFetch(`/discover/${media}?page=${page}`) : useFetch(`/search/multi?query=${text}&page=${page}`);
  const [results, setResults] = useState([])

  const { url } = useSelector((state) => state.home);

  // console.log(media)
  // console.log(text)

  console.log(data?.results)
  // useEffect(()=>{
  //   if(data?.results){
  //     setResults(prevResults => [...prevResults, ...data.results])
  //   }
  // },[data])

  // useEffect(()=>{
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
  //       // Load more results when scrolled to the bottom
  //       setPage(prevPage => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // },[])

  // console.log(results)

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

        {text === !undefined ? 
          <div className="py-10 font-poetsen text-3xl">
            <span>Search Results for '<span className="capitalize">{text}</span>'</span>
          </div>
          :
          <div className="py-10"></div>
        }


        {!loading 
            ?
            (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              
            {data?.results.map((item) => {
              return (
                <div key={item.id} onClick={()=>media === undefined ? navigate(`/${item?.media_type}/${item?.id}`) : navigate(`/${media}/${item?.id}`)} className="rounded-xl hover:scale-105 hover:brightness-[60%] transition-all duration-300">
                  <LazyLoadImages src={item.poster_path ? url + item.poster_path : noposter} className={'hover:cursor-pointer rounded-xl'}/>
                  
                  <div className="w-full text-center font-poppins">
                      {item.title || item.name}
                  </div>
                </div>
              );
            })}
          </div>)
          :
          <div className="grid grid-cols-4 gap-6">
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
            <div className="w-full bg-slate-400 h-[50vh]"></div>
          </div>
        }
      </ContentCenter>
    </div>
  );
};

export default SearchPage;
