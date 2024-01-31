import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { lineSpinner } from "ldrs";
import { toast } from "react-toastify";
import { url } from "../../App";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();
  lineSpinner.register();
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      axios
        .post(`${url}/users/forgetPassword`, { email: email })
        .then((res) => {
          setIsSubmitting(false);
          toast.success(res.data.message, { id: "forgetPassword" });
          Navigate("/");
          // console.log(res.data);
        })
        .catch((error) => {
          setIsSubmitting(false);
          toast.error(error.response.data.message, { id: "forgetPassword" });
          console.log(error);
        });
    } catch (error) {
      console.log(error);
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
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Forget Password?
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="dark" onClick={handleSubmit}>
                          {isSubmitting ? (
                            <l-line-spinner
                              size="25"
                              speed="0.5"
                              color="white"
                            ></l-line-spinner>
                          ) : (
                            "Reset-Password"
                          )}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Go back to login?{" "}
                        <button
                          className="text-primary fw-bold signupBtn"
                          onClick={() => {
                            Navigate("/login");
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
