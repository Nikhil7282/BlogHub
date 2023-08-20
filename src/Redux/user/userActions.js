import axios from "axios"
import { Login, LoginFailure, LoginSuccess} from "./userTypes"
import { url } from "../../App"

const login=(userDetails)=>{
    return {
        type:Login,
        payLoad:userDetails
    }
}

const loginSuccess=(userDetails)=>{
    return {
        type:LoginSuccess,
        payLoad:userDetails
    }
}

const loginFailure=(userDetails)=>{
    return {
        type:LoginFailure,
        payLoad:userDetails
    }
}

const userLogin=(userDetails)=>{
    return(dispatch)=>{
        axios.post(`${url}/users/login`,userDetails)
        .then((res)=>{
            const user=res.data
            dispatch(loginSuccess(user))
        })
        .catch((error)=>{
            dispatch(loginFailure(error))
        })
    }
}

export { login, loginFailure, loginSuccess} 