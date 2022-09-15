import UsersApiService from "../services/login/usersApiService.js";
import FormValidatorService from "../services/login/formValidatorService.js";

class LoginView {
    
    constructor() {
        this.username = document.getElementById('usernameField');
        this.usernameInput = this.username.querySelector('#username');
        this.usernameErrorElement = this.username.querySelector('#usernameError');
        
        this.password = document.getElementById('passwordField');
        this.passwordInput = this.password.querySelector('#password');
        this.passwordErrorElement = this.password.querySelector('#passwordError');
        
        this.userLoginForm = document.getElementById('loginForm');

        this.formValidator = new FormValidatorService();
        this.usersApiService = new UsersApiService();

        this.userLoginForm.onsubmit = (e) => {
            e.preventDefault();
            this._resetValidationErrors();
            this.validateForm();
        }

    }

    /**
     * validates the data recieved from form
     */
    async validateForm() {
        const formInputs = this._getFormInputs();
        const errors = await this.formValidator.validateForm(formInputs);

        if(errors.inputElements.length === 0) {
            this._validateUser(formInputs[0].value, formInputs[1].value);
        } else {
            this._displayErrors(errors.errorMessage, errors.inputElements);
        };
    };
    
    /**
     * will reset validation errors every time we submit the form
     */
    _resetValidationErrors() {
        this.usernameErrorElement.classList.add("hidden");
        this.passwordErrorElement.classList.add("hidden");
    }

    /**
     * gets form input elements
     * 
     * @returns {Array<object>}
     */
    _getFormInputs() {
        const username = this.usernameInput;
        const password = this.passwordInput;
        const formData = [username, password];

        return formData;
    };

    /**
     * makes sure the data user entered matches the user data we get from usersApiService
     */
    _validateUser() {
        const response = this.usersApiService.validateUser(this.usernameInput, this.passwordInput);

        if(response.isValid) {
            this.usersApiService.logUserIn(response.role);
        } else {
            const errorMessage = response.error.errorMsg;

            // needs to be an Array
            const errorInputElements = [];
            errorInputElements.push(response.error.inputField);

            this._displayErrors(errorMessage, errorInputElements);
        }
    }

    /**
     * loops trough inputElements array, grabs their error siblings, and displays the error
     * 
     * @param {string} errorText 
     * @param {Array<object>} inputElements 
     */
    _displayErrors(errorText, inputElements) {
        inputElements.forEach(inputElement => {
            const errorElement = this._getFormInputError(inputElement);
            this._displayErrorToElement(errorText, errorElement);
        });
    }

    /**
     * returns the error sibling from the input element that we send to it
     * 
     * @param {object} inputElement
     * @returns {object}
     */
    _getFormInputError(inputElement) {
        const errorElement = inputElement.parentNode.querySelector('.error');
        return errorElement;
    }

    /**
     * displays an error that we pass to it
     * 
     * @param {object} element 
     * @param {string} errorText 
     */
    _displayErrorToElement(errorText, element) {        
        element.innerText = errorText;
        element.classList.remove('hidden');
    };
};

new LoginView();