import React, { useEffect, useState } from 'react'
import { useFirebase } from "../../Context/Firebase";
import axios from 'axios';
import ProfileHerobanner from './ProfileComponents/ProfileHerobanner';
import ProfileTabs from './ProfileComponents/ProfileTabs';
import TrackedShows from './ProfileComponents/TrackedShows/TrackedShows';
import TrackedMovies from './ProfileComponents/TrackedMovies/TrackedMovies';
import WatchLaterMovies from './WatchLaterMovies/WatchLaterMovies';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';

const Profile = () => {

  const auth = getAuth();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false)

  const [trackingData, settrackingData] = useState([]);

  // const BASE_ENDPOINT = import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL

  // console.log(trackingData)

  const fetchTrackingData = async (uid) => {
    try {
      if (uid) {
        setLoading(true)
        const response = await axios.get(
          // "http://localhost:3000/track/fetch",
          "https://moviefy-react.onrender.com/track/fetch",
          // `${BASE_ENDPOINT}/track/fetch`,
          {params: { userId:uid },}
        );
        setLoading(false)
        settrackingData(response.data);
        console.log(response)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    // Listen to changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Here')
        console.log(user)
        // User is signed in
        setUserId(user.uid);
        setUserName(user.displayName);
        fetchTrackingData(user.uid); // Fetch data when the user is authenticated
      } else {
        // User is signed out, handle this case if needed
        console.log('User not available')
        setUserId(null);
        setUserName(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);


  // console.log(trackingData)

  return (
    <div>
      {loading && <LoadingScreen />}
      <ProfileHerobanner userName={userName}  />
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
