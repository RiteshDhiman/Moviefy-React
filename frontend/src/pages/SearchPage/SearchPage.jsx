import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentCenter from "../../utilityComponent/ContentCenter";
import noposter from "../../assets/no-poster.png"
import LazyLoadImages from "../../utilityComponent/LazyLoadImages";

const SearchPage = () => {

  const location = useLocation()
  const navigate = useNavigate();
  
  const { text } = useParams();
  const { media } = useParams();
  
  let fetchUrl;
  let heading;
  const { url } = useSelector((state) => state.home);

  if(location.pathname.startsWith('/search/multi')){
    fetchUrl = `/search/multi?query=${text}&page=1`
    heading = `Search Results for "${text}"`
  }

  //MOVIES

  else if (location.pathname === `/trending/movie/week`){
    fetchUrl = '/trending/movie/week'
    heading = `Trending Movies`
  }

  else if (location.pathname === `/movie/now_playing`){
    fetchUrl = '/movie/now_playing'
    heading = `In Cinemas Movies`
  }

  else if (location.pathname === `/movie/popular`){
    fetchUrl = '/movie/popular'
    heading = `Popular Movies`
  }

  else if (location.pathname === `/movie/top_rated`){
    fetchUrl = '/movie/top_rated'
    heading = `Top Rated Movies`
  }

  else if (location.pathname === `/movie/upcoming`){
    fetchUrl = '/movie/upcoming'
    heading = `Upcoming Movies`
  }

  //TV SHOWS

  else if(location.pathname === `/discover/tv`){
    fetchUrl = '/discover/tv'
    heading = `Discover TV Shows`
  }

  else if (location.pathname === `/trending/tv/week`){
    fetchUrl = '/trending/tv/week'
    heading = `Trending TV Shows`
  }

  else if (location.pathname === `/tv/top_rated`){
    fetchUrl = '/tv/top_rated'
    heading = `Top Rated TV Shows`
  }

  else if (location.pathname === `/tv/popular`){
    fetchUrl = '/tv/popular'
    heading = `Popular TV Shows`
  }

  else if (location.pathname === `/tv/airing_today`){
    fetchUrl = '/tv/airing_today'
    heading = `Airing Today TV Shows`
  }


  const {data,loading} = useFetch(fetchUrl)

  // const [page, setPage] = useState(1)
  
  // if(location.pathname == `/search/multi/${text}`){
  //   console.log('Location working')
  // }

  // console.log(location)
  // let fetchUrl;
  // if(text === undefined){
  //   if(text === undefined && media === undefined){
  //     fetchUrl = useFetch(`/movie/now_playing`)
  //   }
  //   else{
  //     fetchUrl = useFetch(`/${media}/top_rated?page=${page}`)
  //   }
  // }
  // else{
  //   fetchUrl = useFetch(`/search/multi?query=${text}&page=${page}`)
  // }
  // const { data, loading } = fetchUrl

  // console.log(data?.results)

  return (
    <div className="flex flex-col text-white">

      <ContentCenter>

        <div className="py-10 font-poetsen text-3xl">
          {/* {
            text === undefined ?

            (text === undefined && media === undefined ? <span>In Cinemas</span> : (media === 'tv' ? <span>Top TV Shows</span> : <span>Top Movies</span>)) :

            (data?.results.length === 0 ? <span>No Results Found for '<span className="capitalize">{text}</span>'</span> : <span>Search Results for '<span className="capitalize">{text}</span>'</span>)
          } */}
          {heading}
        </div>


        {!loading 
            ?
            (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 min-h-[50vh]">
              
            {data?.results.map((item) => {
              return (
                item.media_type != 'person' && <div key={item.id} onClick={()=>media === undefined ? navigate(`/${item?.media_type || 'movie'}/${item?.id}`) : navigate(`/${media}/${item?.id}`)} className="rounded-xl hover:scale-105 hover:brightness-[60%] transition-all duration-300">
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
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
            <div className="w-full rgba(1000,1000,1000,0.2) h-[50vh]"></div>
          </div>
        }
      </ContentCenter>
    </div>
  );
};

export default SearchPage;
