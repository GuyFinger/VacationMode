
const userTypeInit = null

const loggedUser = (state = userTypeInit, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return state = action.payload
        case "LOGGED_OUT":
            return state = null
        default: return state



    }
}

export default loggedUser