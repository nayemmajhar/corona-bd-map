
export const setLogin = (isLogedIn) =>{
    return{
        type: 'SET_LOGIN',
        isLogedIn: isLogedIn
    }
}

export const setLogout = (isLogedIn) => {
    return{
        type: 'SET_LOGOUT',
        isLogedIn: isLogedIn
    }
}