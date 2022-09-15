import NasaApiService from "./nasaApiService.js";
import VariablesManager from "./variablesManagerService.js";

let postData = [];

class PostDataManagerService {

    constructor() {
        this.databaseManager = new NasaApiService();
        this.variablesManager = new VariablesManager();
    }

    /**
     * Returns post data
     * 
     * @returns {array}
     */
    getData() {
        return postData;
    }

    /**
     * Fetches more data if data isnt already being fetched
     */
    async addData() {
        if(!this.variablesManager.getIsFetchingData()) {
            this.variablesManager.setIsFetchingData(true);
            
            const newData = await this.databaseManager.fetchNewPostData();
            postData = postData.concat(newData);
            
            this.variablesManager.setIsFetchingData(false);
        }
    }

    /**
     * Removes data if it has the passed url
     * 
     * @param {string} postUrl 
     */
    removeDataByPostImageUrl(postUrl) {
        const dataLength = postData.length;
    
        for(let i = 0; i < dataLength - 1; i++) {
            if(postData[i].url === postUrl) {
               postData.splice(i, 1);
            }
        }
    }
}

export default PostDataManagerService;