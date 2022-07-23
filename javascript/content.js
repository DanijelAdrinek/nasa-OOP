/***********************
 * EXAMPLE OOP PROJECT *
 ***********************/

const contentContainer = document.getElementById("contentContainer");

let postData = [];
let favorites = {};
let displayFavorites = false;
let isFetchingData = false;

// could've also been a function but just in case the program grows and we need to add more functionality to it, I've decided to make it a class

class UserRoleManager {
    getUserRole() {
        return sessionStorage.getItem('role');
    }
}

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

class LoadingManager {
    hideLoading() {
        const loadingScreen = document.getElementById('loadingContainerParent');

        loadingScreen.style.display = 'none';
    }
}

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

class FavoritesManager {

    constructor() {
        this.postDataManager = new PostDataManager();
    }

    _returnCardImageUrl(card) {
        const contentImageUrl = card.querySelector('.nasaContentImg')
            .getAttribute('src');

        return contentImageUrl;
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
        const url = this._returnCardImageUrl(element);

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

// runs the program
(async function startProgram() {
    const userRoleManager = new UserRoleManager();
    if(userRoleManager.getUserRole()) {
    const postDataManager = new PostDataManager();
    const dataDisplayHandler = new DataDisplayHandler();
    
    await postDataManager.addData();
    dataDisplayHandler.displayData();
    } else {
        alert('No user role found, you will be redirected back to login!');
        window.href = './index.html';
    }
})()


// Functions


// toggles weather to display favorites or all content
function onFavoritesIconClick(clickedElement) {
    const favoritesManager = new FavoritesManager();
    
    favoritesManager.toggleFavorite(clickedElement);
}

// gets the parent .card element of the element we send to it
function getParentCardElement(element) {
    const card = element.closest('.card');
    return card;
}

// gets url from the image displayed in the post
function getPostImageUrl(card) {
    const contentImageUrl = card.querySelector('.nasaContentImg').getAttribute('src');
    return contentImageUrl;
}

// turns displaying only favorites on or off
function toggleDisplayFavorites() {
    displayFavorites = !displayFavorites;

    const displayHandler = new DataDisplayHandler();
    displayHandler.displayData();
}

// adds new data
function addNewDataToPostData() {
    displayFavorites = false;

    const dataDisplayHandler = new DataDisplayHandler();
    dataDisplayHandler.loadNewData();
}

// deletes a post
function deletePost(clickedElement) {
    const userRoleManager = new UserRoleManager();

    if(userRoleManager.getUserRole() === 'Admin') {
        const dataDisplayHandler = new DataDisplayHandler();
        const postDataManager = new PostDataManager();

        const card = getParentCardElement(clickedElement);
        const postImageUrl = getPostImageUrl(card);

        dataDisplayHandler.removeElement(card);
        postDataManager.removeDataByPostImageUrl(postImageUrl);
    }
}

// loads new content when the user scrolls too close to the bottom 
contentContainer.addEventListener('scroll', () => {

    // if the user is not displaying only favorites
    if(!displayFavorites && !isFetchingData) {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = contentContainer;

        if(clientHeight * 2 > scrollHeight - scrollTop) {
            addNewDataToPostData();
        }
    }
})