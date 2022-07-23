class DataDisplayHandler {
    constructor() {
        this.favoritesManager = new FavoritesManager();
        this.postDataManager = new PostDataManager();
        this.userRoleManager = new UserRoleManager();
        this.loadingManager = new LoadingManager();
    }

    async loadNewData() {
        await this.postDataManager.addData();
        this.displayData();
    }

    removeElement(card) {
        card.remove();
    }

    displayData() {
        const content = document.getElementById('content');
        const role = this.userRoleManager.getUserRole();
        let data;

        if(displayFavorites === false) {
            data = this.postDataManager.getData();
        } else {
            data = Object.values(this.favoritesManager.getFavorites());
        }
        
        let card;
        
        content.innerHTML = '';

        // yes, I am aware that rendering the entire content again every time is not the optimal solution, but I was in a hurry with this program because I have a huge project coming up and I have to be done ASAP :)
        
        // create each new element from data recieved from NASA API
        data.forEach(element => {
            card = `<div class="card">
                <img class="nasaContentImg" src="${element.url}" alt="nasa image">
                <div class="textContent">
                <h1>${element.title}</h1>
                ${element.explanation}
                <div class="iconsContainer">`

            if(favorites[element.url]) {
                card += '<div class="addToFavoritesBtn"><i class="fa-solid fa-heart favoritesIcon"  onclick="onFavoritesIconClick(this);"></i></div>'
                    
            } else {
                card += '<div class="addToFavoritesBtn"><i class="fa-regular fa-heart favoritesIcon"  onclick="onFavoritesIconClick(this);"></i></div>'
            }
                
            if(role === 'Admin') {
                card += '<button class="deletePost" onclick="deletePost(this)">Delete Post</button>';
            }

            card += '</div></div></div>';

            content.innerHTML += card;
        });

        // removes loading after the content has been rendered
        this.loadingManager.hideLoading();
    }
}