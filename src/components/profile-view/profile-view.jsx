import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  Form,
  Col,
  Row,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";
import { deleteProfile, setUserData } from "../../actions/actions";
import { connect } from "react-redux";

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props.userData;
    this.state = {
      userData: this.props.userData,
      password: "",
      username: "",
      password: "",
      email: "",
      birthday: "",
    };
  }

  componentDidMount() {
    this.updateState();
  }

  // componentDidUpdate() {
  //   // this.updateState()
  // }

  updateState = () => {
    this.setState({
      username: this.props.userData.username || "",
      password: this.props.userData.password || "",
      email: this.props.userData.email || "",
      birthday: this.props.userData.birthday || "",
    });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/", "_self");
  }

  changeUsername(value) {
    this.setState({
      username: value,
    });
  }

  editProfile = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { password, username, email, birthday } = this.state;
    // console.log({ password, username, email, birthday })

    // console.log(newUser);
    axios
      .put(
        `https://my-flix-api-2022.herokuapp.com/users/${user}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        // this.setState({
        //   username: response.data.username,
        //   password: response.data.password,
        //   email: response.data.email,
        //   birthday: response.data.birthday,
        // });

        this.props.setUserData(response.data);
        let newUser = response.data.username;

        localStorage.setItem("user", newUser);
        alert("profile updated successfully!");
        window.open(`/users/${newUser}`, "_self");
      });
  };

  deleteProfile() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://my-flix-api-2022.herokuapp.com/users/${username}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch((e) => console.log(e));
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

  //remove favorite
  removeFav(m) {
    {
      const username = this.props.userData.username;
      const token = this.props.token;
      axios
        .delete(
          `https://my-flix-api-2022.herokuapp.com/users/${username}/favoriteMovies/${m}`,
          { headers: { Authorization: `Bearer ${token}` } },
          {}
        )
        .then((response) => {
          alert(`Movie deleted from your list of favorites`);
          window.open(`/users/${username}`, "_self");
        })
        .catch((e) => console.log(e));
    }
  }

  render() {
    const { movies, userData, token } = this.props;
    const { password, username, email, birthday } = this.state;
    let favoriteMovies = userData.favoriteMovies;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editProfile(
                      e,
                      this.username,
                      this.password,
                      this.email,
                      this.birthday
                    )
                  }
                >
                  <Container>
                    <Container className="flex-item pt-5">
                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="text"
                          name="username"
                          placeholder="insert your new username here"
                          onChange={(e) => this.changeUsername(e.target.value)}
                          defaultValue={username}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your username should be at least 4 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="text"
                          name="password"
                          placeholder="insert your new password here"
                          onChange={(e) => this.setPassword(e.target.value)}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your password should be at least 8 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column mb-2">
                        <FormControl
                          type="email"
                          name="email"
                          defaultValue={email}
                          placeholder="insert your new email here"
                          onChange={(e) => this.setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="date"
                          name="birthday"
                          defaultValue={birthday}
                          placeholder="insert your new email here"
                          onChange={(e) => this.setBirthday(e.target.value)}
                          required
                        />
                      </div>
                    </Container>
                  </Container>
                  <Container className="mt-2 text-center">
                    <Button
                      variant="primary custom-btn"
                      type="submit"
                      onClick={this.editProfile}
                    >
                      Update profile info
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-2 mb-2">
              <Container className="p-1 text-center card-custom">
                <Button
                  style={{ width: "80%" }}
                  className="custom-btn-delete m-1"
                  variant="primary"
                  type="submit"
                  onClick={this.deleteProfile}
                >
                  Delete your entire profile
                </Button>{" "}
              </Container>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            {!favoriteMovies.length && (
              <div className="titles h1 text-center">
                <h1>There's no movies in your list of favorites!</h1>
                <p className="h5">
                  Head over to the{" "}
                  <Link to={`/`}>
                    <Button className="custom-btn" type="submit">
                      List of movies
                    </Button>
                  </Link>{" "}
                  to add some
                </p>
              </div>
            )}
            <Row className="favorite-movies d-flex justify-content-around">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie m-2" key={movie._id}>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img
                            variant="top"
                            src={movie.ImagePath}
                            className="img-responsive"
                          />
                        </Link>

                        <Card.Body>
                          <Card.Title className="h1 titles">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            value={movie._id}
                            className="custom-btn"
                            onClick={() => this.removeFav(movie._id)}
                          >
                            Remove from List
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapStateToProps, { setUserData })(ProfileView);
