import React from "react";
import axios from "axios";
import { Form, FormGroup, Container, FormControl, Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getUserData } from "../../../actions/actions";

///here im retaining the user's old details
class ProfileViewImmutable extends React.Component {
  constructor() {
    super();
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://my-flix-api-2022.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.getUserData(
          response.data
        )
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  

  render() {
    let {userData} = this.props;
    return (
      <Container>
        <div className="titles h1 text-center">Hi, {userData.username}</div>
        <Card.Title className="titles text-center custom-card-title">
          View and update your details
        </Card.Title>
        <Container className="d-flex justify-content-right" style={{ width: "50%" }}>
          <Col className="d-inline">
          <FormGroup>
            <Form.Label className="titles h3">Username</Form.Label>
            <Container className="p-1">
              <FormControl
                className="mb-3 custom-form-label"
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
                className="mb-3 custom-form-label"
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
                className="mb-3 custom-form-label"
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
                className="mb-3 custom-form-label"
                type="text"
                name="birthday "
                placeholder={userData.birthday}
                disabled
              ></FormControl>
            </Container>
          </FormGroup>
          </Col>
        </Container>
      </Container>
    );
  }
}
let mapStateToProps = (state) => {
  return { userData: state.userData };
};
export default connect(mapStateToProps, { getUserData })(ProfileViewImmutable);
