import React, { useEffect, useRef, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { lineSpinner } from "ldrs";
import { loginValidation } from "../../helpers/validation";

export default function Login() {
  const auth = useAuth();
  lineSpinner.register();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    // console.log(username,password);
    try {
      const isValid = await loginValidation.validate(
        { username, password },
        { abortEarly: false }
      );
      setIsSubmitting(true);
      await auth.login(isValid);
      setIsSubmitting(false);
      toast.success(`Welcome ${username}`, { id: "login" });
      Navigate("/user/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      if (error.inner) {
        // console.log(error.inner[0].errors);
        return toast.error(error.inner[0].errors[0], { id: "login" });
      }
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
                          {isSubmitting ? (
                            <l-line-spinner
                              size="25"
                              speed="0.5"
                              color="white"
                            ></l-line-spinner>
                          ) : (
                            "Login"
                          )}
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
