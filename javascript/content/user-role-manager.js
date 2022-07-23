class UserRoleManager {
    getUserRole() {
        return sessionStorage.getItem('role');
    }
}