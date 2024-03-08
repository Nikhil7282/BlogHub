import axios from "axios";
import React from "react";
import { url } from "../../App";

function SavedPost() {
  const fetchSavedBlogs = async () => {
    const res = await axios.get(`${url}/blogs/savedPosts?populate=false`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(res);
  };
  return <div>This Feature Is Yet To Be Added</div>;
}

export default SavedPost;
