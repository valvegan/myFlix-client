import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, FormGroup, Container, FormControl, Card } from "react-bootstrap";

///here im retaining the user's old details
export class ProfileViewTrial extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
    };

    this.setUsername = this.setUsername.bind(this);
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://my-flix-api-2022.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  setUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  setPassword(value) {
    this.setState({
      password: value,
    });
  }
  setEmail(value) {
    this.setState({
      email: value,
    });
  }
  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }

  render() {
    const { username, password, email, birthday } = this.state;
    return (
      <Container>
        <div className="titles h1 text-center">Hi, {username}</div>
        <Card.Title className="titles text-center custom-card-title">
          View and update your details
        </Card.Title>
        <Container>
          <FormGroup>
            <Form.Label className="titles h3">Username</Form.Label>
            <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
              <FormControl
                className="mb-3 custom-form-label"
                type="text"
                name="username"
                placeholder={username}
                disabled
              ></FormControl>
            </Container>
          </FormGroup>

          <FormGroup>
            <Form.Label className="titles h3">Password</Form.Label>
            <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
              <FormControl
                className="mb-3 custom-form-label"
                type="text"
                name="password"
                placeholder={password}
                disabled
              ></FormControl>
            </Container>
          </FormGroup>

          <FormGroup>
            <Form.Label className="titles h3">Email</Form.Label>
            <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
              <FormControl
                className="mb-3 custom-form-label"
                type="email"
                name="email"
                placeholder={email}
                disabled
              ></FormControl>
            </Container>
          </FormGroup>

          <FormGroup>
            <Form.Label className="titles h3">Birth date</Form.Label>
            <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
              <FormControl
                className="mb-3 custom-form-label"
                type="text"
                name="birthday "
                placeholder={birthday}
                disabled
              ></FormControl>
            </Container>
          </FormGroup>
        </Container>
      </Container>
    );
  }
}
