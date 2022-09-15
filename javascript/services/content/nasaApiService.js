import { NASA_API_KEY, NASA_GET_ALL_COUNT } from "../../constants.js";

class NasaApiService {

    /**
     * Fetches 10 new posts from the nasa API
     */
    async fetchNewPostData() {
    
        // fetch data from external nasa API
        try {
            const data = await fetch(`https://api.nasa.gov/planetary/apod?${NASA_API_KEY}&count=${NASA_GET_ALL_COUNT}`);
            const responseData = await data.json();
            return responseData;
        } catch(err) {
            alert('Not able to fetch new data', err);
        }
    }
}

export default NasaApiService;