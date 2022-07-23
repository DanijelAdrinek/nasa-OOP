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