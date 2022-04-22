import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required!");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long!");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required!");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long!");
      isReq = false;
    }else if (username)
    return isReq;
  };

  //send user data to the database to check if the user exists
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://my-flix-api-2022.herokuapp.com/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          const data = response.data;
         props.onLoggedIn(data);

        })
        .catch((e) => {
          alert("you're not already registered or you have deleted your profile! Please register");
          window.open("/register", "_self");
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Sign in to your account</h1>
          <Form className="register-form">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/*code added here to display validation error*/}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/*code added here to display validation error*/}
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Button
              variant="primary"
              className="custom-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <br></br>
            <br></br>
            <Container >
              <Row className="d-flex justify-content-center">
              <p className="m-2">
              Don't have an account?</p>
              
                <Link to={"/register"}>
                  <Button
                    variant="primary"
                    className="custom-btn"
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Link>
            
            
            </Row>
            </Container>
            <br></br>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  
  onLoggedIn: PropTypes.func.isRequired,
};
