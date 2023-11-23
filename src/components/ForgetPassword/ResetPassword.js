// import jwt from 'jsonwebtoken'
// import { loginUser } from "../../axios/customeInstence";
import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import { url } from "../../App";

export default function ResetPassword() {
    const {token}=useParams()
  const [password,setPassword]=useState("")
  const Navigate=useNavigate()
  const handleSubmit=async()=>{
    // console.log(password);
   try {
    axios.post(`${url}/users/resetPassword/${token}`,{password:password})
    .then((res)=>{
        toast.success("Password Updated")
        Navigate('/login')
        // console.log(res.data);
    })
    .catch((error)=>{
        toast.error(error.response.data.message)
        // console.log(error);
    })
   } catch (error) {
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
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Reset Password
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter New Password" onChange={(e)=>setPassword(e.target.value)}/>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" onClick={handleSubmit}>
                          Update-Password
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Go back to login?{" "}
                        <button className="text-primary fw-bold signupBtn"
                        onClick={()=>{
                            Navigate('/login')
                        }}
                        >
                            login
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
