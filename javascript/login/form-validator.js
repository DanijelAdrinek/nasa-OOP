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