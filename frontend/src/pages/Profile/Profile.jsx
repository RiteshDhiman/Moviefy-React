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

  // console.log(trackingData)

  const fetchTrackingData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          "http://localhost:3000/track/fetch",
          // "https://moviefy-backend.vercel.app/track/fetch",
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
