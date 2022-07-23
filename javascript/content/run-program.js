/***********************
 * EXAMPLE OOP PROJECT *
 ***********************/

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
});