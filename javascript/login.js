// this code was written only as an example of how Object Orientated Programming works
// written by Danijel Adrinek

let databaseData;
const usernameErrorElement = document.getElementById('usernameError');
const passwordErrorElement = document.getElementById('passwordError');

class DatabaseManager {

    // in this example it isnt possible to change the data form the database unless manually going into the code and changing it, so we dont need to check for changes and fetch again

    // we also dont want to call the database every time we run this function so we save data in our global scope so we can access it from there once it gets fetched
    async fetchDataFromDatabase() {
        if(!databaseData) {
            try {
                databaseData = await fetch('./data/data.json');
                databaseData = await databaseData.json();
            
                return databaseData;
            } catch (e) {
                alert('there was an error while fetching database data: ', e)
            }
        } else {
            return databaseData;
        }
    }
}

class FormHandler {
    constructor() {
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
    }

    getUsername() {
        return this.usernameInput.value;
            
    }

    getPassword() {
        return this.passwordInput.value;
    }
}

async function displayUsernameAndPassword() {
    const validator = new FormValidator();
    await validator.validate();
}

// validating the form data that we submitted
class FormValidator {
    constructor () {
        const formHandler = new FormHandler();
        this.databaseManager = new DatabaseManager();
        this.login = new Login();
        
        this.username = formHandler.getUsername();
        this.password = formHandler.getPassword();
    }

    async validate() {
        const userData = await this.databaseManager.fetchDataFromDatabase();

        const errors = [];

        if(this.username && this.password) {

            // check to see if the user matches any users in database whose data we retrieved
            for(let user in userData) {
                if(this.username === userData[user].username) {
                    if(this.password === userData[user].password) {
                        this.login.loginComplete(this.username);
                        return;
                    }
                    errors.push('Invalid password!');
                    this.login.loginFailed(errors);
                    return;
                }
            };
            errors.push('Invalid username!');
            this.login.loginFailed(errors);
            return;
        } else {

            if(!this.username) {
                errors.push('please enter username!')
            }

            if(!this.password) {
                errors.push('please enter password!')
            }
            this.login.loginFailed(errors);
        }
    }
}

class Login {

    constructor() {
        this.errorHandler = new LoginErrorHandler();
    }

    loginComplete(role) {
        sessionStorage.setItem('role', role);

        // redirect to other page
        window.location.href = "./content.html";
    }

    loginFailed(errors) {
        errors.map(error => {
            switch(error) {
                case 'Invalid password!':
                    this.errorHandler.passwordError(error);
                    break;
                case 'Invalid username!':
                    this.errorHandler.usernameError(error);
                    break;
                case 'please enter username!':
                    this.errorHandler.usernameError(error);
                    break;
                default:
                    this.errorHandler.passwordError(error);
            }
        })
    }
}

class LoginErrorHandler {
    constructor() {
        // will remove form errors every time a instance of this class gets created
        usernameErrorElement.style.display = "none";
        passwordErrorElement.style.display = "none";
    }

    // display errors with error text
    usernameError(error) {
        usernameErrorElement.innerText = error;
        usernameErrorElement.style.display = "block";
    }

    passwordError(error) {
        passwordErrorElement.innerText = error;
        passwordErrorElement.style.display = "block";
    }
}