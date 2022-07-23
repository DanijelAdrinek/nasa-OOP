let databaseData;

class DatabaseManager {

    // in this example it isnt possible to change the data form the database unless manually going into the code and changing it, so we dont need to check for changes and fetch again

    // we also dont want to call the database every time we run this function so we save data in our global scope so we can access it from there once it gets fetched
    async fetchDataFromDatabase() {
        if(!databaseData) {
            try {
                databaseData = await fetch('./data/data.json');
                databaseData = await databaseData.json();
            
                return databaseData;
            } catch (e) {
                alert('there was an error while fetching database data: ', e)
            }
        } else {
            return databaseData;
        }
    }
}