export const commentState={
    loading:false,
    data:[],
    error:null
}
export const commentReducer=(state,action)=>{
    if(action.type==="FetchingComments"){
        return {...state,loading:true}
    }
    else if(action.type==="FetchCommentSuccess"){
        return {...state,data:action.payload,loading:false}
    }
    else if(action.type==="FetchCommentError"){
        return {...state,error:action.payload}
    }
    else{
        return state
    }
}