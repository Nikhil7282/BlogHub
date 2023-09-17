import React, { useState } from "react";
import { Form, Button, Container} from "react-bootstrap";
import axios from "axios";
import { url } from "../../App";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
function AddPost() {
  const Navigate=useNavigate()
  const [userBlog, setUserBlog] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleSubmit = () => {
    axios.post(`${url}/blogs`,userBlog,{
      headers:{
        Authorization:`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      console.log(res.data)
      toast.success(res.data.message)
      Navigate('/user/dashboard')
    })
    .catch((error)=>{
      toast.error(error.response.data.message)
      console.log(error)
    })
    // console.log(userBlog);
    // Your code to handle form submission
  };

  return (
    <Container
      style={{
        maxHeight:"100vh",
        maxWidth:"100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        minHeight: "100vh",
        backgroundColor:"lightgray"
      }}
    >
      <h1 className="mb-5">Post New Blog</h1>
      <Form style={{ width: "100%", maxWidth: "400px",marginBottom:"55px"}}>
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
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={userBlog.content}
            onChange={(e) => {
              setUserBlog({ ...userBlog, content: e.target.value });
            }}
          />
        </Form.Group>
        <Button className="mt-4" variant="primary" onClick={handleSubmit}>
          Post Blog
        </Button>
      </Form>
    </Container>
  );
}

export default AddPost;
