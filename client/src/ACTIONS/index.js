export const loggedIn = (userType) => {
    return {
        type: 'LOGGED_IN',
        payload: userType

    }
}
export const logout = () => {
    return {
        type: 'LOGGED_OUT'
    }
}