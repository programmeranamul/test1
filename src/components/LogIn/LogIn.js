import React from "react";
import { Button, Form } from "react-bootstrap";
import "./LogIn.css";

const LogIn = () => {
  return (
    <Form className="mt-5 mb-3 ms-2 px-2">
      <h2 className="text-dark"> Login to E-Invoice </h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="warning" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LogIn;
