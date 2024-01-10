import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { url } from "../../App";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { commentReducer, commentState } from "./commentState";
import Loader from "../../components/Loader";

function PostPage() {
  const [state, dispatch] = useReducer(commentReducer, commentState);
  const [userComment, setUserComment] = useState({
    name: `${sessionStorage.getItem("username")}`,
    comment: "",
    userId: `${sessionStorage.getItem("userId")}`,
  });

  const location = useLocation();
  const { card } = location.state;
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FetchingComments" });
    axios
      .get(`${url}/blogs/comment/${id}`)
      .then((res) => {
        dispatch({ type: "FetchCommentSuccess", payload: res.data.comments });
      })
      .catch((error) => {
        dispatch({ type: "FetchCommentError", payload: error });
        console.log(error);
      });
  }, []);

  const addComment = async () => {
    axios
      .post(`${url}/blogs/comment/${id}`, userComment)
      .then((res) => {
        dispatch({ type: "NewComment", payload: res.data.comment });
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setUserComment({ ...userComment, comment: "" });
  };
  const deleteComment = (commentId) => {
    axios
      .delete(`${url}/blogs/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: {
          commentId: commentId,
        },
      })
      .then((res) => {
        dispatch({ type: "DeleteComment", payload: commentId });
        toast.success(res.data.message);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  };
  if (state.loading === true) {
    return <Loader />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col style={{ backgroundColor: "#f8f9fa" }}>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h1>{card.title}</h1>
              <p>{card.description}</p>
              <p>{card.content}</p>
              <Form
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button>Like</button>
                  <p>Likes: {card.likes.length}</p>
                </div>
                <Form.Group controlId="comment" style={{ width: "50%" }}>
                  {/* <Form.Label>Add a comment:</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={userComment.comment}
                    placeholder="Add New Comment"
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
        </Col>
        <Col style={{ margin: "10px", backgroundColor: "#f8f9fa" }}>
          {state.data.length > 0 && (
            <Row>
              <Col>
                <h2 className="mt-3">Comments:</h2>
                {state.data.map((comment) => (
                  <div
                    key={comment._id}
                    style={{ border: "1px solid black" }}
                    className="mt-1"
                  >
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
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
