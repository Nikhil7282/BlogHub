import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Container, Card } from "react-bootstrap";
import { url } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";

import {initialState,reducer} from "./State.js"

function Dashboard() {
  const Navigate = useNavigate();
  const [state,dispatch]=useReducer(reducer,initialState)
  // const [blogData, setBlogData] = useState([]);

  const logout = () => {
    sessionStorage.clear();
    Navigate("/login");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchData();
    } else {
      logout();
    }
  }, []);

  const handleLike = async (id, userId) => {
    try {
      const post = await state.data.find((post) => post._id === id);
      console.log(post)
      const index = await post.likes.findIndex((user) => user === userId);
      console.log(index)
      // console.log(id)
      // console.log(userId);
      if (index === -1) {
        await axios
          .post(`${url}/blogs/likePost/${id}`, {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res) {
              // console.log(post.likes);
              // console.log(userId);
              post.likes.push(userId);
              toast.success("Liked")
            }
          })
          .catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message)
          })
      }}
      catch (error) {
      console.error(error);
    }
  };

  const handleDisLike=async(id,userId)=>{
    const post = await state.data.find((post) => post._id === id);
    const index = await post.likes.findIndex((user) => user === userId);

    try {
      await axios.post(`${url}/blogs/unLikePost/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      post.likes.splice(index, 1);
      toast.error("Disliked")

      // setBlogData([...blogData]);
    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchData = useCallback(async () => {
    try {
      dispatch({type:"Fetching"})
      const res = await axios.get(`${url}/blogs`);
      dispatch({type:"Fetch_Success",payload:res.data})
      // setBlogData(res.data);
      // console.log(res.data)
    } catch (error) {
      dispatch({type:"Fetch_Error"})
      if (error.response.status === 401 || error.response.status === 400) {
        logout();
        toast.error(error.response.data.message);
      }
      // console.log(error)
    }
  },[state.data])

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

  if(state.loading===true){
    return (<h1>Loading...</h1>)
  }
  return (
    <div>
      <Container className="text-center mt-5">
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {state.data.map((card, index) => (
            <Card
              bg={getRandomColor().toLowerCase()}
              key={index}
              style={{ width: "18rem", margin: "10px" }}
              text={
                getRandomColor().toLowerCase() === "light" ? "dark" : "white"
              }
            >
              <Card.Body
                onClick={() =>
                  Navigate(`/user/postPage/${card._id}`, {
                    state: { card: card },
                  })
                }
              >
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{new Date(card.createdAt).toLocaleDateString()}</div>
                  {/* <Button variant="primary">Like</Button> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {card.likes.some(
                      (userId) => userId === sessionStorage.getItem("userId")
                    ) ? (
                      <AiFillLike
                        onClick={() => {
                          handleDisLike(
                            card._id,
                            sessionStorage.getItem("userId")
                          );
                        }}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <AiFillLike
                        onClick={() => {
                          handleLike(
                            card._id,
                            sessionStorage.getItem("userId")
                          );
                        }}
                      />
                    )}
                    <span style={{ marginLeft: "5px" }}>
                      {card.likes.length} Likes
                    </span>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
