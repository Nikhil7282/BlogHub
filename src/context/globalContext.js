import axios from "axios";
import { url } from "../App";
const { createContext, useReducer, useEffect, useCallback } = require("react");

export const initialState = {
  loading: false,
  data: [],
  error: null,
};
export const reducer = (state, action) => {
  if (action.type === "Fetching") {
    return { ...state, loading: true };
  } else if (action.type === "Fetch_Success") {
    return { ...state, loading: false, data: action.payload };
  } else if (action.type === "Fetch_Error") {
    return { ...state, loading: false, error: action.payload };
  } else if (action.type === "Add_Post") {
    return { ...state, loading: false, data: [...state.data, action.payload] };
  } else if (action.type === "Like_Post") {
    const filteredPost = state.data.find((post) => {
      return post._id === action.payload.postId;
    });
    filteredPost.likes = [...filteredPost.likes, action.payload.userId];
    return { ...state, loading: false, data: [...state.data] };
  } else if (action.type === "DisLike_Post") {
    const filteredPost = state.data.find((post) => {
      return post._id === action.payload.postId;
    });
    filteredPost.likes.splice(action.payload.index, 1);
    return { ...state, loading: false, data: [...state.data] };
  } else {
    return state;
  }
};

export const postContext = createContext(initialState);

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: "Fetching" });
      const res = await axios.get(`${url}/blogs`);
      dispatch({ type: "Fetch_Success", payload: res.data });
    } catch (error) {
      dispatch({ type: "Fetch_Error", payload: error });
      console.log(error);
    }
  }, [state]);
  return (
    <postContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
