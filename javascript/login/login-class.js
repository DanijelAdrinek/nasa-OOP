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