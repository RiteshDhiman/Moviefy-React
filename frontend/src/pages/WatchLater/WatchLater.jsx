  import React, { useEffect, useState } from 'react';
  import ContentCenter from '../../utilityComponent/ContentCenter';
  import axios from 'axios';
  import { useFirebase } from '../../Context/Firebase';

  const WatchLater = () => {
    const firebase = useFirebase();
    const userId = firebase.firebaseauth.currentUser?.uid;
    const [watchLaterList, setWatchLaterList] = useState([]);

    const fetchWatchlist = async () => {
      try {
        if (userId) {
          const response = await axios.get('http://localhost:3000/add/watchlist', {
            params: { userId }
          });
          setWatchLaterList(response.data);  // Set the fetched watch later array
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
            <div>
              {
                movies.length > 0 ? (
                  movies.map((item, index) => (
                    // <div key={index} className=''>
                    //   {item.mediaName}
                    // </div> 
                    <div className='flex w-full justify-between items-center' key={index}>
                      <div className='w-1/4'>{index + 1}</div>
                      <div className='w-1/2'>{item.mediaName}</div>
                      <div className='w-1/4 flex justify-between'>
                        <button>Watched</button>
                        <button>Remove</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No movies</p>
                )
              }
            </div>
          </div>
          <div className='w-full bg-red-400'>
            <div>TV Shows</div>
            <div>
              {
                tvShows.length > 0 ? (
                  tvShows.map((item, index) => (
                    <div key={index}>
                      {item.mediaName}
                    </div> 
                  ))
                ) : (
                  <p>No tvShows</p>
                )
              }
            </div>
          </div>
        </div>
      </ContentCenter>
    );
  };

  export default WatchLater;
