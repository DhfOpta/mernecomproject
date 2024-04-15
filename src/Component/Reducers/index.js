const initialValue = {
    textField: []
}
export const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'SET_DYNAMIC_FIELD':
            console.log(action.payload);
            return {
                ...state,
                textField:[...state.textField,action.payload]
            }



        default: return state;
    }
}