import PostDataManager from "./postDataManagerService.js";
import ElementSelectorService from "./elementSelectorService.js";

const favorites = {};

class favoritesManagerService {

    constructor() {
        this.postDataManager = new PostDataManager();
        this.elementSelectorService = new ElementSelectorService();
    }

    /**
     * Toggles icon classes
     * 
     * @param {HTMLElement} element - favorites icon 
     */
    _toggleFavoritesIcon(element) {
        element.target.classList.toggle('fa-regular');
        element.target.classList.toggle('fa-solid');
    }

    /**
     * Returns a list of favorites
     * 
     * @returns {object}
     */
    getFavorites() {
        return favorites;
    }

    /**
     * Toggles favorite on and off
     * 
     * @param {HTMLElement} element - favorites icon
     */
    toggleFavorite(element) {
        const data = this.postDataManager.getData();
        const card = this.elementSelectorService.getParentCardElement(element);
        const postImageUrl = this.elementSelectorService.getPostImageUrl(card);

        data.forEach(item => {

            if(item.url === postImageUrl) {
                if(favorites[postImageUrl]) {
                    delete favorites[postImageUrl];
                } else {
                    favorites[postImageUrl] = item;
                }
            
                this._toggleFavoritesIcon(element);
            }


        });
    }
}

export default favoritesManagerService;