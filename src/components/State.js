export const initialState={
    loading:false,
    data:[],
    error:null
}

export const reducer=(state,action)=>{
    if(action.type==="Fetching"){
      return {...state,loading:true}
    }
    else if(action.type==="Fetch_Success"){
      return {...state,loading:false,data:action.payload}
    }
    else if(action.type==="Fetch_Error"){
      return {...state,loading:false,error:action.payload}
    }
    else{
      return state
    }
  }