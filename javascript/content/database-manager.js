class DatabaseManager {

    async fetchNewPostData() {
        const apiKey = 'api_key=VGvReHv4hFXCJodYUjJFiAxPR3qamK5kWiVf4OdX';
        const count = 10;
    
        // fetch data from external nasa API
        try {
            const data = await fetch(`https://api.nasa.gov/planetary/apod?${apiKey}&count=${count}`);
            const responseData = await data.json();
            return responseData;
        } catch(err) {
            alert('Not able to fetch new data', err);
        }
    }
}