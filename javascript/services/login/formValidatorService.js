class FormValidatorService {
    
    /**
     * Checks to see if the inputs the users gave are valid or not
     * 
     * @param {HTMLInputElement[]} formInputs
     */
    validateForm(formInputs) {

        const errors = {errorMessage: 'this field cannot be empty!', inputElements: []}

        formInputs.forEach(formInput => {
            if(!formInput.value) {
                errors.inputElements.push(formInput);
            };
        });

        return errors;
    }
}

export default FormValidatorService;