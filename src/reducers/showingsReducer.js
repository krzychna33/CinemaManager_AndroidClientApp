const showingReducerDefaultState = [];

export default (state = showingReducerDefaultState, action) => {
    switch(action.type){
        case 'GET_SHOWINGS':
            return action.showings;
        default:
            return state;
    }
}