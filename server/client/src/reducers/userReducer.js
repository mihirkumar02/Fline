export const initialState = {
    type: "buyer",
    user: null
};

export const reducer = (state, action) => {
    if(action.type === "USER"){
        return {
            type: action.payload.type,
            user: action.payload
        }
    }
    if(action.type === "CLEAR"){
        return {
            type: action.payload,
            user: null
        }
    }
    if(action.type === "USERTYPE"){
        return {
            type: action.payload // usertype
        }
    }
    return state
}