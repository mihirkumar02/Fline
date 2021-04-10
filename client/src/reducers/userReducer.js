export const initialState = {
    type: "buyer",
    user: null,
    product: null
};

export const reducer = (state, action) => {
    if(action.type === "USER"){ // on user login
        return {
            type: action.payload.type,
            user: action.payload,
            product: null
        }
    }
    if(action.type === "CLEAR"){
        return {
            type: action.payload,
            user: null,
            product: null
        }
    }
    if(action.type === "USERTYPE"){
        return {
            type: action.payload // usertype
        }
    }
    if(action.type === "EDITPRODUCT"){
        return{
            product: action.payload
        }
    }
    return state
}