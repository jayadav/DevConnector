import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      email: "jay.shankar20@gmail.com",
      password: "123456",
    },
  });

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth", data);
      console.log(res);
      if (res.status === 200) {
        login(res.data.token);
        reset();
        setError(null);
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (e) {
      console.log(e.response.data.msg);
      setError(e.response.data.msg);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem", padding: "20px" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Alert variant="danger" className="mt-2">
                  {errors.email.message}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should have at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <Alert variant="danger" className="mt-2">
                  {errors.password.message}
                </Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="mt-3">
            Not Registered? <Link to={"/register"}>Click Here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
