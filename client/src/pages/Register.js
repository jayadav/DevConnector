import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");

  const password = watch("password");

  
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/api/users", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMsg("Registered successfully!!! Please login to continue.");
          reset(); // Reset the form fields after successful submission
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center">Register</h2>
          {msg && (
            <Alert variant="success" className="mt-2">
              {msg}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name", { required: "Name is required!" })}
              />
              {errors.name && (
                <Alert variant="danger" className="mt-2">
                  {errors.name.message}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
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

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password ||
                    "Password and Confirm Password should be same",
                })}
              />
              {errors.confirmPassword && (
                <Alert variant="danger" className="mt-2">
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <p className="mt-3">
            Already Registered? <Link to={"/login"}>Login Here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
