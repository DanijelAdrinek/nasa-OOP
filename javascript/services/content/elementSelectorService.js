class ElementSelectorService {
    /**
     * returns the parent element with a class of card from the element we send to it
     * 
     * @param {HTMLElement} element 
     * @returns {HTMLDivElement}
     */
    getParentCardElement(element) {
        const card = element.target.closest('.card');
        return card;
    }
    
    /**
     * gets url from the image displayed in the post
     * 
     * @param {HTMLDivElement} card - element with a class of card
     * @returns {string} image url 
     */
    getPostImageUrl(card) {
        const contentImageUrl = card.querySelector('.nasaContentImg').getAttribute('src');
        return contentImageUrl;
    }
}

export default ElementSelectorService;