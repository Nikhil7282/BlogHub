import { Login, LoginFailure, LoginSuccess } from "./userTypes"

const initialState={
    loading:false,
    userDetails:{},
    error:""
}

const userReducer=(state,action)=>{
    switch(action.type){
        case Login:return {
            ...state,
            loading:true
        }
        case LoginSuccess:return{
            ...state,
            userDetails:action.payLoad
        }
        case LoginFailure:return{
            ...state,
            error:action.payLoad.message
        }
        default:return state
    }
}