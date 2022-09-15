class userRoleManagerService {
    
    /**
     * Returns the user role
     * 
     * @returns {string} user role
     */
    getRole() {
        return sessionStorage.getItem('role');
    }
}

export default userRoleManagerService;