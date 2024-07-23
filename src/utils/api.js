import axios from 'axios'

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTRmNjk0YmE1ZTQ2MjI0NmMyNmNjZTkzMjFhZmYzZiIsInN1YiI6IjY2NDhiMzVlYTg3YjJlYTBhMzY1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_tf5hRRLDRmYde7FLqNnCE8vl4fI8ZtEdW5QGBBpI";

const headers = {
    Authorization : "bearer " + TMDB_TOKEN
}

const fetchDataFromAPI = async(url, params) => {
    try {
        
        const {data} = await axios.get(BASE_URL+url, {
            headers,
            params
        });

        return data

    } catch (error) {
        console.log(error);
        return err
    }
}

export default fetchDataFromAPI
