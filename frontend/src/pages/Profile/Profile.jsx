import React, { useEffect, useState } from 'react'
import { useFirebase } from "../../Context/Firebase";
import axios from 'axios';
import ProfileHerobanner from './ProfileComponents/ProfileHerobanner';
import ProfileTabs from './ProfileComponents/ProfileTabs';
import TrackedShows from './ProfileComponents/TrackedShows/TrackedShows';
import TrackedMovies from './ProfileComponents/TrackedMovies/TrackedMovies';
import WatchLaterMovies from './WatchLaterMovies/WatchLaterMovies';

const Profile = () => {

  const firebase = useFirebase();
  const userId = firebase.firebaseauth.currentUser?.uid;
  const userName = firebase.firebaseauth.currentUser?.displayName;
  const [trackingData, settrackingData] = useState([]);

  // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL


  // console.log(trackingData)

  const fetchTrackingData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          // "http://localhost:3000/track/fetch",
          "https://moviefy-react.onrender.com/track/fetch",
          // `${BASE_ENDPOINT}/track/fetch`,
          {params: { userId },}
        );
        settrackingData(response.data);
        console.log(response)
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [userId]);

  // console.log(trackingData)

  return (
    <div>
      <ProfileHerobanner userName={userName}/>
      <ProfileTabs data={trackingData}/>
      <TrackedShows data={trackingData} />
      <TrackedMovies data={trackingData}/>
      <WatchLaterMovies data={trackingData?.wishlist}/>
      {/* {trackingData?.watchedMedia?.movies?.map((item)=>(
        <p>{item.movieName}</p>
      ))} */}
    </div>
  )
}

export default Profile
