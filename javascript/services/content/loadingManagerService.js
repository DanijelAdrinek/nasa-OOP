class loadingManagerService {

    /**
     * Hides loading element after data has been returned from nasa API
     */
    hideLoading() {
        const loadingScreen = document.getElementById('loadingContainerParent');

        loadingScreen.style.display = 'none';
    }
}

export default loadingManagerService;