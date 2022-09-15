class UsersApiService {

    /**
     * Returns all the users
     * 
     * @returns {object[]} array of users
     */
    async getAll() {
        return window.users;
    }

    /**
     * Validates the data user provides in login field
     * 
     * @param {object} usernameInput 
     * @param {object} passwordInput 
     * @returns {object}
     */
    validateUser(usernameInput, passwordInput) {
        const userData = users;

        const username = usernameInput.value;
        const password = passwordInput.value;

        const validResponse = {isValid: true, role: ''};
        const errorsResponse = {isValid: false, error: {}};

        // check to see if the user matches any users with access to the website
        for(let user in userData) {
            if(username === userData[user].username) {
                if(password === userData[user].password) {
                    validResponse.role = username;
                    return validResponse;
                }
                errorsResponse.error = {errorMsg: 'password is incorrect!', inputField: passwordInput};
                return errorsResponse;
            }
        };
        errorsResponse.error = {errorMsg: 'username is incorrect!', inputField: usernameInput};
        return errorsResponse;
    }
    

    /**
     * Logs user in
     * 
     * @param {string} role
     */
    logUserIn(role) {
        sessionStorage.setItem('role', role);

        window.location = "./content.html";
    }
}

export default UsersApiService;