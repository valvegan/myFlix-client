import React from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Container,
  FormControl,
  Card,
  Col,
} from "react-bootstrap";
import PropTypes, { string } from "prop-types";
import {ProfileView} from "./profile-view";
///here im retaining the user's old details
export class UserDetailsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { userData, movies, token } = this.props;
    return (
      <Container>
        <div className="titles h1 text-center">Hi, {userData.username}</div>
        <Card.Title className="titles text-center custom-card-title">
          View and update your details
        </Card.Title>
        <Container className="d-flex justify-content-right text-center">
          <Col className="d-inline">
            <FormGroup>
              <Form.Label className="titles h3">Username</Form.Label>
              <Container className="p-1">
                <FormControl
                  className=" custom-form-label"
                  type="text"
                  name="username"
                  placeholder={userData.username}
                  disabled
                ></FormControl>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label className="titles h3">Password</Form.Label>
              <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="custom-form-label"
                  type="text"
                  name="password"
                  placeholder={userData.password}
                  disabled
                ></FormControl>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label className="titles h3">Email</Form.Label>
              <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="custom-form-label"
                  type="email"
                  name="email"
                  placeholder={userData.email}
                  disabled
                ></FormControl>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label className="titles h3">Birth date</Form.Label>
              <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="custom-form-label"
                  type="text"
                  name="birthday "
                  placeholder={userData.birthday}
                  disabled
                ></FormControl>
              </Container>
              <ProfileView userData={userData} 
              movies={movies}
              token={token}/>
            </FormGroup>
          </Col>
        </Container>
      </Container>
    );
  }
}

UserDetailsView.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(string),
  }),
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
