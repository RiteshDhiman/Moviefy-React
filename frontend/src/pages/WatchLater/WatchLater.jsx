  import React, { useEffect, useState } from 'react';
  import ContentCenter from '../../utilityComponent/ContentCenter';
  import axios from 'axios';
  import { useFirebase } from '../../Context/Firebase';
import { useNavigate } from 'react-router-dom';

  const WatchLater = () => {
    const firebase = useFirebase();
    const userId = firebase.firebaseauth.currentUser?.uid;
    const [watchLaterList, setWatchLaterList] = useState([]);
    const navigate = useNavigate()
    // console.log(watchLaterList)

    const fetchWatchlist = async () => {
      try {
        if (userId) {
          const response = await axios.get('https://moviefy-react.vercel.app/add/watchlist', {
            params: { userId }
          });
          setWatchLaterList(response.data);  // Set the fetched watch later array
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    const removeWatchlist = async (id) => {
      try {
        const response = await axios.post('https://moviefy-react.vercel.app/add/wishlistRemove', { userId, id });
        
        if (response.status === 200) {
          // Update the watchLaterList by removing the item with the given id
          setWatchLaterList(prevList => prevList.filter(item => item.id !== id));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };
    

    useEffect(() => {
      fetchWatchlist();
    }, [userId]);

    const movies = watchLaterList.filter(item => item.mediaType === 'movie');
    const tvShows = watchLaterList.filter(item => item.mediaType === 'tv');

    return (
      <ContentCenter>

        <div className='text-white'>
          <div className='py-10 font-poetsen text-4xl'>
            Watch Later
          </div>
          <div className='w-full'>
            <div className='text-3xl font-mukta py-5'>Movies</div>
            <div className='grid md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-5'>
              {
                movies.length > 0 ? (
                  movies.map((item, index) => (

                    <div className='w-full bg-slate-900 h-[50vh] flex flex-col justify-around rounded-3xl'>
                      <div className='relative w-full h-3/5 bg-black flex'>
                        <div className='w-full h-full flex justify-center items-center text-9xl font-alfa font-bold pr-6'>
                          {index+1}
                        </div>
                        <div className='absolute h-full w-1/2 top-0 right-0'>
                          <img src={item.posterPath} className='h-full brightness-75' />
                        </div>
                      </div>

                      <div className='w-full h-2/5 px-4 py-2 flex flex-col gap-2 justify-center items-center'>
                        <p className='h-1/3 font-roboto text-xl'>{item.mediaName}</p>
                        <div className='flex justify-around w-full gap-5 h-1/3'>
                          <button className='w-1/2 rounded-xl py-2 bg-green-500' onClick={()=>removeWatchlist(item.id)}>
                            Watched
                          </button>
                          <button className='w-1/2 rounded-xl py-2 bg-red-600'>Remove</button>
                        </div>

                        <button className='h-1/3 bg-sky-300 w-full rounded-xl py-1' onClick={()=>navigate(`/${item.mediaType}/${item.id}`)}>
                          Explore Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No movies</p>
                )
              }
            </div>
          </div>
        </div>
      </ContentCenter>
    );
  };

  export default WatchLater;
