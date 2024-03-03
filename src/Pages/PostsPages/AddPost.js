import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { url } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postContext } from "../../context/globalContext";
import { lineSpinner } from "ldrs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddPost() {
  lineSpinner.register();
  const Navigate = useNavigate();
  const { state, dispatch } = useContext(postContext);
  const [addingPost, setAddingPost] = useState(false);

  const inputRefs = useRef([]);
  const [userBlog, setUserBlog] = useState({
    title: "",
    description: "",
  });
  const [body, setBody] = useState("");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleSubmit = () => {
    if (userBlog.title === "" || userBlog.description === "" || body === "") {
      toast.info("Please Fill All Fields");
      return;
    }
    setAddingPost(true);
    axios
      .post(
        `${url}/blogs`,
        { ...userBlog, content: body },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setAddingPost(false);
        // console.log(res);
        dispatch({ type: "Add_Post", payload: res.data.data });
        toast.success(res.data.message);
        Navigate("/user/dashboard");
      })
      .catch((error) => {
        setAddingPost(false);
        toast.error(error.response.data.message);
        // console.log(error);
      });
  };

  return (
    <Container
      style={{
        height: "fit-content",
        width: "50vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "25px",
        padding: "25px",
        boxShadow:
          "0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <h1 className="mb-3">Post New Blog</h1>
      <Form style={{ width: "100%", maxWidth: "400px" }}>
        <Form.Group controlId="name">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={(input) => (inputRefs.current[0] = input)}
            type="text"
            name="name"
            value={userBlog.title}
            onChange={(e) => {
              setUserBlog({ ...userBlog, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Description</Form.Label>
          <Form.Control
            ref={(input) => (inputRefs.current[1] = input)}
            type="email"
            name="email"
            value={userBlog.description}
            onChange={(e) => {
              setUserBlog({ ...userBlog, description: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="password" style={{ height: "fit-content" }}>
          <Form.Label>Content</Form.Label>
          <ReactQuill theme="snow" value={body} onChange={setBody} />
        </Form.Group>
        <Button className="mt-4" variant="primary" onClick={handleSubmit}>
          {addingPost ? (
            <l-line-spinner
              size="25"
              speed="0.5"
              color="white"
            ></l-line-spinner>
          ) : (
            "Post Blog"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default AddPost;
