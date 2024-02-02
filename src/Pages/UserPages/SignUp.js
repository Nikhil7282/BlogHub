import React, { useEffect, useRef, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { lineSpinner } from "ldrs";
export default function SignUp() {
  const auth = useAuth();
  lineSpinner.register();

  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    // console.log(username,password);
    try {
      setIsSubmitting(true);
      await auth.signup(username, email, password, phone);
      setIsSubmitting(false);
      toast.success("User Signed Up Successfully", { id: "login" });
      Navigate("/login");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          ref={inputRef}
                          type="text"
                          placeholder="Enter username"
                          name="username"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSignupPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Phone"
                          name="phone"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" type="submit">
                          {isSubmitting ? (
                            <l-line-spinner
                              size="25"
                              speed="0.5"
                              color="white"
                            ></l-line-spinner>
                          ) : (
                            "Sign Up"
                          )}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <button
                          className="text-primary fw-bold signupBtn"
                          onClick={() => {
                            Navigate("/login");
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
