import React from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Container,
  FormControl,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getUserData } from "../../../actions/actions";

///here im retaining the user's old details
//called "immutable" just because I don't want the data to be updated when the user types in the form control
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
        this.props.getUserData(response.data);
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  render() {
    let { userData } = this.props;

    return (
      <Container className="update-profile-form">
        <div className="titles h1 text-center">Hi, {userData.username}</div>
        <Card.Title className="titles text-center custom-card-title">
          View and update your details
        </Card.Title>

        <Container
          className="d-flex-columns justify-content-center"
          style={{ width: "70%" }}
        >
          <FormControl
            className="mb-3 custom-form-label"
            type="text"
            name="username"
            placeholder={userData.username}
            disabled
          ></FormControl>

          <FormControl
            className="mb-3 custom-form-label"
            type="text"
            name="password"
            placeholder={userData.password}
            disabled
          ></FormControl>

          <FormControl
            className="mb-3 custom-form-label"
            type="email"
            name="email"
            placeholder={userData.email}
            disabled
          ></FormControl>

          <FormControl
            className="mb-3 custom-form-label"
            type="text"
            name="birthday "
            placeholder={userData.birthday}
            disabled
          ></FormControl>
        </Container>
      </Container>
    );
  }
}
let mapStateToProps = (state) => {
  return { userData: state.userData };
};
export default connect(mapStateToProps, { getUserData })(ProfileViewImmutable);
