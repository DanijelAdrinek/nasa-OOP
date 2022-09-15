import UserRoleManagerService from "../services/content/userRoleManagerService.js";
import PostDataManagerService from "../services/content/postDataManagerService.js";
import FavoritesManagerService from "../services/content/favoritesManagerService.js";
import LoadingManagerService from "../services/content/loadingManagerService.js";
import VariablesManagerService from "../services/content/variablesManagerService.js";
import ElementSelectorService from "../services/content/elementSelectorService.js";

const contentContainer = document.getElementById('contentContainer');
const navFavorites = document.getElementById('favorites');
const navLoadMore = document.getElementById('loadMore');

class ContentView {
    
    constructor() {
        this.favoritesManager = new FavoritesManagerService();
        this.userRoleManager = new UserRoleManagerService();
        this.postDataManager = new PostDataManagerService();
        this.loadingManager = new LoadingManagerService();
        this.variablesManager = new VariablesManagerService();
        this.elementSelectorService = new ElementSelectorService();

        this._checkForUserRole();
        this.addDataAndDisplayIt();
        this._startAllEventListeners();
    }

    /** 
     * Checks to see if the user has a role, and redirects them back to login page if they dont
     */
     _checkForUserRole() {
        const userRole = this.userRoleManager.getRole();

        if(!userRole || userRole === "") {
            alert('No user role found, you will be redirected back to login!');
            window.location.href = './index.html';
        }
    }

    /**
     * Fetches new data and adds it to our current data
     */
    async loadNewData() {
        await this.postDataManager.addData();
        this._displayData();
    }

    /**
     * Removes a card from the screen and form our data
     * 
     * @param {HTMLDivElement} card 
     */
    _removeElement(card) {
        card.remove();
    }

    /**
     * Toggles the display between only favorites and all posts
     */
    toggleDisplayFavorites() {
        const displayFavoritesValue = this.variablesManager.getDisplayFavorites();
        this.variablesManager.setDisplayFavorites(!displayFavoritesValue);
        this._displayData();
    }


    /**
     * Displays new data
     */
    async addDataAndDisplayIt() {        
        await this.postDataManager.addData();
        this._displayData();
    }

    /**
     * Toggles whether to display favorites or all elements
     * 
     * @param {HTMLElement} clickedElement - favorites icon
     */
    onFavoritesIconClick = clickedElement => this.favoritesManager.toggleFavorite(clickedElement);

    /**
     * Displays data by mapping trought the elements and displaying them to the users screen
     */
    _displayData() {
        const content = document.getElementById('content');
        const role = this.userRoleManager.getRole();
        const isAdmin = (role === 'Admin');
        const displayFavorites = this.variablesManager.getDisplayFavorites();
        const favorites = this.favoritesManager.getFavorites();
        
        // the data we will display depends on whether the user wants to display favorites or all data
        let data = !displayFavorites ? this.postDataManager.getData() : Object.values(this.favoritesManager.getFavorites());
        
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

            

            favorites[element.url] ?
                card += '<div class="addToFavoritesBtn"><i class="fa-solid fa-heart favoritesIcon"></i></div>'
                    :
                card += '<div class="addToFavoritesBtn"><i class="fa-regular fa-heart favoritesIcon"></i></div>';
                
                card += isAdmin ? '<button class="deletePost">Delete Post</button>' : '';

            card += '</div></div></div>';

            content.innerHTML += card;
        });

        // removes loading after the content has been rendered
        this.loadingManager.hideLoading();
    
        this._addEventListenersToIconsAndButtons();
    }

    /**
     * Deletes a post
     * 
     * @param {HTMLButtonElement} clickedElement - Button with a class of deletePost
     */
    deletePost = (clickedElement) => {
        if(this.userRoleManager.getRole() === 'Admin') {
            const card = this.elementSelectorService.getParentCardElement(clickedElement);
            const postImageUrl = this.elementSelectorService.getPostImageUrl(card);

            this._removeElement(card);
            this.postDataManager.removeDataByPostImageUrl(postImageUrl);
        }
    }

    /**
     * Checks whether we need to load new data or not, and calls addNewDataToPostData function if we do
     */
    checkIfNeedsToAddNewData() {

        const displayFavorites = this.variablesManager.getDisplayFavorites();
        const isFetchingData = this.variablesManager.getIsFetchingData();

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = contentContainer;

        const userIsNearBottom = (clientHeight * 2 > scrollHeight - scrollTop);

        // if the user is not displaying only favorites, we arnt already fetching new data, and user is close to bottom
        const needsToDisplayNewData = (!displayFavorites && !isFetchingData && userIsNearBottom);
        
        needsToDisplayNewData && this.addDataAndDisplayIt();
    }

    /**
     * Starts all event listeners
     */
    _startAllEventListeners() {
        contentContainer.addEventListener('scroll', () => this.checkIfNeedsToAddNewData());

        navFavorites.addEventListener('click', () => this.toggleDisplayFavorites());
    
        navLoadMore.addEventListener('click', () => this.addDataAndDisplayIt())

        this._addEventListenersToIconsAndButtons();
    }

    /**
     * Adds event listeners to favorites icons and if the user is an admin, to delete buttons
     */
    _addEventListenersToIconsAndButtons() {
        const role = this.userRoleManager.getRole();
        const isAdmin = (role === "Admin");
        const favoritesIcons = document.querySelectorAll('.favoritesIcon');
        const deleteButtons = document.querySelectorAll('.deletePost');

        this._addEventListenersToPassedElements(favoritesIcons, this.onFavoritesIconClick);
        isAdmin && this._addEventListenersToPassedElements(deleteButtons, this.deletePost);
    }

    /**
     * Adds event click listeners to passed elemts that call the passed function
     * 
     * @param {HTMLElement} elements - the elements we decide to pass
     * @param {function(HTMLElement): void} functions - the function we want to pass on event
     */
    _addEventListenersToPassedElements(elements, passedFunction) {
        elements.forEach(element => {
            element.addEventListener('click', (clickedElement) => passedFunction(clickedElement));
        });
    }
}

const contentView = new ContentView();