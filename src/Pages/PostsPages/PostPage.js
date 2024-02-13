import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { url } from "../../App";
import { toast } from "react-toastify";
import { commentReducer, commentState } from "./commentState";
import Loader from "../../components/Loader";
import Comment from "../../components/Comment";

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

  if (state.loading === true) {
    return <Loader />;
  }

  return (
    <Container
      className="mt-5"
      style={{
        // width: "fit-content",
        backgroundColor: "#f8f9fa",
        // padding: "2rem",
        height: "fit-content",
      }}
    >
      <Row>
        <Col
          style={{
            // width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          xs={12}
          // md={8}
          lg={6}
        >
          <h1>{card.title}</h1>
          <p>{card.description}</p>
          <p>{card.content}</p>
          <p>Likes: {card.likes.length}</p>
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
        <Col
          xs={12}
          // md={8}
          lg={6}
          className="comment-container"
          style={{
            overflowY: "scroll",
            position: "relative",
            height: "50vh",
          }}
        >
          <div className="comment_list">
            {state.data.length > 0 ? (
              <>
                <h3>Comments:</h3>
                {state.data.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    id={id}
                    dispatch={dispatch}
                  />
                ))}
              </>
            ) : (
              <h1>No Comments</h1>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
