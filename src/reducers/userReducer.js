const userReducerDefaultState = {
    email: ''
};

export default (state = userReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_USER_EMAIL': 
            return {
                email: action.email
            };
        default:
            return state;
    }
}