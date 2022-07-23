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