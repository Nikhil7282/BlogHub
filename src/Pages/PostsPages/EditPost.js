import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../App";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditPost() {
  const location = useLocation();
  const Navigate = useNavigate();
  const blog = location.state;
  const [userBlog, setUserBlog] = useState(blog);
  const [body, setBody] = useState(userBlog.content);

  const handleSubmit = () => {
    axios
      .put(`${url}/blogs/updatePost/${userBlog._id}`, {
        title: userBlog.title,
        description: userBlog.description,
        content: body,
      })
      .then((res) => {
        toast.success(res.data.message);
        Navigate("/user/dashboard");
        // console.log(res);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
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
      {/* {console.log(userBlog._id)} */}
      <h1 className="mb-5">Edit Blog</h1>
      <Form style={{ width: "100%", maxWidth: "400px", marginBottom: "55px" }}>
        <Form.Group controlId="name">
          <Form.Label>Title</Form.Label>
          <Form.Control
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
            type="email"
            name="email"
            value={userBlog.description}
            onChange={(e) => {
              setUserBlog({ ...userBlog, description: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Content</Form.Label>
          <ReactQuill theme="snow" value={body} onChange={setBody} />
        </Form.Group>
        <Button
          className="mt-4"
          variant="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Edit Blog
        </Button>
      </Form>
    </Container>
  );
}

export default EditPost;
