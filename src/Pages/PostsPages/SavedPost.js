import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../App";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SavedPost() {
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSavedBlogs();
  }, []);
  const fetchSavedBlogs = async () => {
    const res = await axios.get(`${url}/blogs/savedPosts?populate=true`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    // console.log(res.data.data.savedBlogs);
    setSavedPosts(res.data.data.savedBlogs);
  };
  const handleRemoveSavedPost = async (id) => {
    try {
      let res = await axios.delete(`${url}/blogs/removeSavedPosts/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setSavedPosts(savedPosts.filter((post) => post._id !== id));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };
  return (
    <div className="d-flex flex-wrap justify-content-center mt-5">
      {savedPosts.length > 0 ? (
        savedPosts.map((item) => (
          <Card
            className="my-3"
            style={{ width: "18rem", margin: "5px" }}
            key={item._id}
          >
            <Card.Body
              onClick={() =>
                navigate(`/user/postPage/${item._id}`, {
                  state: { card: item },
                })
              }
            >
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="secondary"
                onClick={() => handleRemoveSavedPost(item._id)}
              >
                UnSave
              </Button>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <h1>No saved posts</h1>
      )}
    </div>
  );
}

export default SavedPost;
