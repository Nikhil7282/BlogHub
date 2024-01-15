import React, { useEffect, useRef, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const auth = useAuth();
  const Navigate = useNavigate();
  const inputRefs = useRef([]);
  // console.log(inputRefs);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // let handleKeyPress = (e) => {
    //   e.preventDefault();
    //   if (e.key === "Enter" && inputRefs.current[0] && inputRefs.current[1]) {
    //     handleSubmit();
    //   } else {
    //     inputRefs.current[1].focus();
    //   }
    // };
    // window.addEventListener("keypress", handleKeyPress);

    // return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    // console.log(username,password);
    try {
      await auth.login(username, password);
      toast.success(`Welcome ${username}`, { id: "login" });
      Navigate("/user/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
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
                  <p className=" mb-5">
                    Please enter your Username and Password
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          ref={(input) => (inputRefs.current[0] = input)}
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          ref={(input) => (inputRefs.current[1] = input)}
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="/forgetPassword">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <button
                          className="text-primary fw-bold signupBtn"
                          onClick={() => {
                            Navigate("/register");
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
