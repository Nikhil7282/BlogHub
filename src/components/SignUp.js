import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { url } from "../App";
import axios from 'axios'
import { toast } from "react-toastify";

export default function SignUp() {
  const [userSignUp,setUserSignUp]=useState({username:"",email:"",password:"",phone:""})
  const Navigate=useNavigate()
  const handleSubmit=async()=>{
   try {
    const status=await axios.post(`${url}/users/signup`,userSignUp)
    console.log(status)
    toast.success(status.data.message)
    Navigate('/login')
   } catch (error) {
    console.log(error.response)
    toast.error(error.response.data.message)
   }
  }
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    BlogHub
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e)=>{setUserSignUp({...userSignUp,username:e.target.value})}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setUserSignUp({...userSignUp,email:e.target.value})}} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserSignUp({...userSignUp,password:e.target.value})}}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Phone" onChange={(e)=>{setUserSignUp({...userSignUp,phone:e.target.value})}}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" onClick={()=>{handleSubmit()}}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <button className="text-primary fw-bold signupBtn"
                        onClick={()=>{
                            Navigate('/login')
                        }}
                        >
                            Login
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