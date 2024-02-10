import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { url } from "../App";
// import { useState } from "react";
// import { lineSpinner } from "ldrs";

function Comment({ comment, id, dispatch }) {
  // const [isLoading, setIsLoading] = useState(false);
  // lineSpinner.register();
  const deleteComment = (commentId) => {
    // setIsLoading(true);
    axios
      .delete(`${url}/blogs/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          commentId: commentId,
        },
      })
      // authFetchDel(`/blogs/comment/${id}`,{data:{commentId:commentId}})
      .then((res) => {
        // setIsLoading(false);
        dispatch({ type: "DeleteComment", payload: commentId });
        toast.success(res.data.message);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div style={{ border: "1px solid black", width: "50%" }} className="mt-1">
      <h6 style={{ margin: 0 }}>{comment.name + ":"}</h6>
      <p style={{ margin: 0 }} key={comment._id}>
        {comment.comment}
      </p>
      {sessionStorage.getItem("userId") === comment.userId && (
        <AiFillDelete
          onClick={() => {
            deleteComment(comment._id);
          }}
        />
      )}
    </div>
  );
}

export default Comment;
