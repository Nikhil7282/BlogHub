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
    else if(action.type==="NewComment"){
        // console.log(action.payload);
        const newData=[...state.data,action.payload]
        return {...state,loading:false,data:newData}
    }
    else if(action.type==="DeleteComment"){
        const filteredComments=state.data.filter((comment)=>{
            return comment._id !== action.payload
        })
        // console.log(filteredComments);
        return {...state,data:filteredComments}
    }
    else{
        return state
    }
}