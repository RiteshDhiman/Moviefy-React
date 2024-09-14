import React, { useEffect, useState } from 'react'
import { useFirebase } from "../../Context/Firebase";
import axios from 'axios';

const Profile = () => {

  const firebase = useFirebase();
  const userId = firebase.firebaseauth.currentUser?.uid;
  const [trackingData, settrackingData] = useState([]);

  console.log(trackingData)

  const fetchTrackingData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          "http://localhost:3000/track/fetch",
          // "https://moviefy-backend.vercel.app/track/fetch",
          {
            params: { userId },
          }
        );
        settrackingData(response.data); // Set the fetched watch later array
        console.log(response)
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [userId]);

  return (
    <div>
      {trackingData?.movies?.map((item)=>(
        <p>{item.movieName}</p>
      ))}
    </div>
  )
}

export default Profile
