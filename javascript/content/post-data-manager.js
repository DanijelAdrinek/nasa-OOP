let postData = [];

class PostDataManager {

    constructor() {
        this.databaseManager = new DatabaseManager();
    }

    getData() {
        return postData;
    }

    async addData() {
        if(!isFetchingData) {
        isFetchingData = true
        
        const newData = await this.databaseManager.fetchNewPostData();
        postData = postData.concat(newData);
    
        isFetchingData = false;
        }
    }

    removeDataByPostImageUrl(postUrl) {
        const dataLength = postData.length;
    
        for(let i = 0; i < dataLength - 1; i++) {
            if(postData[i].url === postUrl) {
               postData.splice(i, 1);
            }
        }
    }
}