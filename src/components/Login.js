import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { url } from "../App";
import axios from 'axios'
import { toast } from "react-toastify";

export default function Login() {
  const [UserDetails,setUserDetails]=useState({username:"",password:""})
  const Navigate=useNavigate()
  const handleLogin=async()=>{
   try {
    await axios.post(`${url}/users/login`,UserDetails)
    // console.log(status)
    .then((res)=>{
      toast.success(res.data.message)
      // console.log(res.data.token)
      sessionStorage.setItem('token',res.data.token)
      Navigate('/user/dashboard')
    })
   } catch (error) {
    // console.log(error)
    toast.error(error.response.data.message)
   }
  }
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-dark"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">BlogHub</h2>
                  <p className=" mb-5">Please enter your Username and Password</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>{setUserDetails({...UserDetails,username:e.target.value})}} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserDetails({...UserDetails,password:e.target.value})}}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" onClick={handleLogin}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <button className="text-primary fw-bold signupBtn"
                        onClick={()=>{
                            Navigate('/register')
                        }}
                        >
                            SignUp
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
