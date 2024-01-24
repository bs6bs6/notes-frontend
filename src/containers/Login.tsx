import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hooksLib";
import { useAppContext } from "../lib/contextLib";
import LoaderButton from "../components/LoaderButton.tsx";
import "./Login.css";
import {signIn} from "@aws-amplify/auth"


export default function Login() {

  const {authService}  = useAppContext();

  const { userHasAuthenticated } = useAppContext();

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    console.log(authService)

    try {
      const res = await signIn({
        username: fields.username,
        password: fields.password,
        options:{
            authFlowType: 'USER_PASSWORD_AUTH',
        }
      });
      console.log(res)
      userHasAuthenticated(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              autoFocus
              size="lg"
              type="username"
              value={fields.username}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <LoaderButton
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}