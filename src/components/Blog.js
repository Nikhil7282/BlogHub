import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { HiOutlineSaveAs } from "react-icons/hi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { postContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Blog({ blog }) {
  const Navigate = useNavigate();
  const auth = useAuth();
  const { state, dispatch } = useContext(postContext);

  const getRandomColor = () => {
    const colors = [
      "Primary",
      "Secondary",
      "Success",
      "Danger",
      "Warning",
      "Info",
      "Dark",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleLike = async (id, userId) => {
    try {
      const post = await state.data.find((post) => post._id === id);
      const index = await post.likes.findIndex((user) => user === userId);
      if (index === -1) {
        await axios
          .post(
            `${url}/blogs/likePost/${id}`,
            {},
            {
              headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch({
                type: "Like_Post",
                payload: { userId, postId: post._id },
              });
              toast.success("Liked");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLike = async (id, userId) => {
    const post = await state.data.find((post) => post._id === id);
    const index = await post.likes.findIndex((user) => user === userId);
    try {
      await axios.post(
        `${url}/blogs/unLikePost/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "DisLike_Post",
        payload: { index, postId: post._id },
      });
      toast.error("Disliked");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePost = async (id) => {
    try {
      let res = await axios.post(
        `${url}/blogs/addSavedPost`,
        { blogId: id },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <Card
      border={getRandomColor().toLocaleLowerCase()}
      className="cards"
      style={{
        width: "30rem",
        boxShadow:
          "0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
        margin: "8px",
      }}
    >
      <Card.Header>
        <div style={{ width: "100%" }} className="blog-header">
          <img
            src="/Avatar.png"
            alt="image"
            width="30px"
            style={{ borderRadius: "10px" }}
          />
          <div>
            <span style={{ marginLeft: "5px", display: "block" }}>
              {blog?.userDetails?.name || "Name"}
            </span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </Card.Header>
      <Card.Body
        onClick={() =>
          Navigate(`/user/postPage/${blog._id}`, {
            state: { card: blog },
          })
        }
      >
        <Card.Title>
          <h3>{blog.title}</h3>
        </Card.Title>
        <Card.Text>{blog.description}</Card.Text>
        <Card.Footer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {blog.likes.some((userId) => {
                return userId == sessionStorage.getItem("userId");
              }) ? (
                <AiFillLike
                  style={{ color: "red" }}
                  onClick={() => {
                    handleDisLike(blog._id, sessionStorage.getItem("userId"));
                  }}
                />
              ) : (
                <AiFillLike
                  onClick={() => {
                    handleLike(blog._id, sessionStorage.getItem("userId"));
                  }}
                />
              )}
              <span style={{ marginLeft: "5px" }}>
                {blog.likes.length} Likes
              </span>
            </div>
            <div className="save" style={{ cursor: "pointer" }}>
              {localStorage.getItem("savedBlogs").includes(blog._id) ? (
                <IoCheckmarkDoneCircleOutline />
              ) : (
                <HiOutlineSaveAs
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    handleSavePost(blog._id);
                  }}
                />
              )}
            </div>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default Blog;
