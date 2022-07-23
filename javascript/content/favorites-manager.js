let favorites = {};

class FavoritesManager {

    constructor() {
        this.postDataManager = new PostDataManager();
    }

    _toggleFavoritesIcon(element) {
        element.classList.toggle('fa-regular');
        element.classList.toggle('fa-solid');
    }

    getFavorites() {
        return favorites;
    }

    toggleFavorite(element) {
        const data = this.postDataManager.getData();
        const card = getParentCardElement(element);
        const url = getPostImageUrl(card);

        data.forEach(item => {

            if(item.url === url) {
                if(favorites[url]) {
                    delete favorites[url];
                } else {
                    favorites[url] = item;
                }
            
                this._toggleFavoritesIcon(element);
            }


        });
    }
}