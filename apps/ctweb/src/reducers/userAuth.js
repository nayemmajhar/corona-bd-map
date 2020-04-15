var initialState ={
    isLogedIn: localStorage["userAuth"] && JSON.parse(localStorage["userAuth"]).auth_token
        ? true: false
}


const userAuth = ((state = initialState, action)=>{
    switch(action.type){
        case 'SET_LOGIN':
        case 'SET_LOGOUT':
            return Object.assign({},state,{
                isLogedIn: action.isLogedIn
            })
        default:
            return state;
    }
    
})

export default userAuth;