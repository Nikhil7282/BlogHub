import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
// import { url } from "../../App";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { commentReducer, commentState } from "../../components/PostPage/State";
import {authFetchDel } from "../../axios/customeInstence";

function PostPage() {
  const [render, rerender] = useState(false);
  const [state,dispatch]=useReducer(commentReducer,commentState)

  const [userComment, setUserComment] = useState({
    name: `${sessionStorage.getItem("username")}`,
    comment: "",
    userId: `${sessionStorage.getItem("userId")}`,
  });
  // const [comments, setComments] = useState([]);

  const location = useLocation();
  const { card } = location.state;
  // console.log(card);
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    // console.log("rerender")
    dispatch({type:"FetchingComments"})
    axios
      .get(`/blogs/comment/${id}`)
      .then((res) => {
        dispatch({type:"FetchCommentSuccess",payload:res.data.comments})
        // console.log(res.data.comments);
        // setComments(res.data.comments);
      })
      .catch((error) => {
        dispatch({type:"FetchCommentError",payload:error})
        console.log(error);
      });
  }, [render]);

  const addComment = async () => {
    // console.log(userComment);
    axios
      .post(`/blogs/comment/${id}`,userComment)
      .then((res) => {
        // console.log(res.data.message);
        setUserComment({...userComment,comment:""})
        rerender(!render);
        toast.success(res.data.message);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message)
      });
  };

  const deleteComment = (commentId) => {
    // axios
    //   .delete(
    //     `/blogs/comment/${id}`,
    //     {
    //       // headers: {
    //       //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //       //   "Content-Type": "application/json",
    //       // },
    //     data:{
    //       commentId:commentId
    //     }
    //     })
        authFetchDel(`/blogs/comment/${id}`,{data:{commentId:commentId}})
      .then((res) => {
        // console.log(res.data.message);
        // state.data.filter((comment)=>{
        //     return comment._id !== commentId
        // })
        toast.success(res.data.message);
        rerender(!render)
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
    // const log=(config)=>{
    //   console.log(config.headers);
    //   console.log('Token:',config.headers.Authorization);
    //   console.log('Body:',config.data);
    //   return config
    // }
    // axios.interceptors.request.use(log)
  };
  if(state.loading===true){
    return (
      <h1>Loading Comments...</h1>
    )
  }
  return (
    <Container
      className="mt-5"
      style={{
        width: "fit-content",
        backgroundColor: "#f8f9fa",
        padding: "2rem",
      }}
    >
      <Row>
        <Col>
          <h1>{card.title}</h1>
          <p>{card.description}</p>
          <p>{card.content}</p>
          <p>Likes: {card.likes.length}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="comment" style={{ width: "100%" }}>
              <Form.Label>Add a comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={userComment.comment}
                placeholder="Add a Comment"
                onChange={(event) =>
                  setUserComment({
                    ...userComment,
                    comment: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={addComment}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {/* {console.log(comments)} */}
      {  state.data.length > 0 && (
        <Row>
          <Col>
            <h2 className="mt-3">Comments:</h2>
            {state.data.map((comment, index) => (
              <div style={{ border: "1px solid black" }} className="mt-1">
                <h6 style={{ margin: 0 }}>{comment.name + ":"}</h6>
                <p style={{ margin: 0 }} key={index}>
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
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default PostPage;
