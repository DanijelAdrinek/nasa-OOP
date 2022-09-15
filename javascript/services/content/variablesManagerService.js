let isFetchingData = false;
let displayFavorites = false;

class variablesManagerService {

    /**
     * Returns the value of isFetchingData
     * 
     * @returns {bool} isFetchingData
     */
    getIsFetchingData() {
        return isFetchingData;
    }

    /**
     * Takes a bool value and assigns it so isFetchingData variable
     * 
     * @param {bool} value 
     */
    setIsFetchingData(value) {
        (typeof value === "boolean") ?
            isFetchingData = value :
            alert("wrong type of value has been passed to setIsFetchingData in Variables.js");
    }

    /**
     * Returns the value of displayFavorites
     * 
     * @returns {bool} displayFavorites
     */
    getDisplayFavorites() {
        return displayFavorites;
    }

    /**
     * Takes a bool value and assigns it so displayFavorites variable
     * 
     * @param {bool} value 
     */
    setDisplayFavorites(value) {
        (typeof value === "boolean") ?
            displayFavorites = value :
            alert("wrong type of value has been passed to setDisplayFavorites in Variables.js");
    }

}

export default variablesManagerService;