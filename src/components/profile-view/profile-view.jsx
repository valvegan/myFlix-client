import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Form,
  FormGroup,
  Col,
  Row,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";
import ProfileViewImmutable from "./profile-view-immutable-labels/profile-view-immutable";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
    this.removeFav = this.removeFav.bind(this);
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
          user: response.data.username,
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

  editProfile = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let newUsername = this.state.username;

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
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem("user", this.state.username);

        alert("profile updated successfully!");
        //redirect to new username profile page
        window.open(`/users/${newUsername}`, "_self");
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
        window.open(`/users/${newUsername}`, "_self");
      })
      .catch((e) => console.log(e));
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
  removeFav() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const id = this.state.favoriteMovies;

    axios
      .delete(
        `https://my-flix-api-2022.herokuapp.com/users/${user}/favoriteMovies/${id}`,

        { headers: { Authorization: `Bearer ${token}` } },
        {}
      )
      .then((response) => {
        console.log(response);
        alert("Movie deleted from favorites!");
        window.open(`/movies/${id}`, "_self");
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { favoriteMovies, username } = this.state;

    if (!username) {
      return null;
    }

    return (
      <Container>
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
                  <ProfileViewImmutable user={this.state} />
                  <Container
                    className="d-flex-columns justify-content-center p-4"
                    style={{ width: "70%" }}
                  >
                    <Form.Label className="titles h3">Username</Form.Label>
                    <FormControl
                      type="text"
                      name="username"
                      placeholder="insert your new username here"
                      onChange={this.setUsername}
                      required
                    />
                    <Form.Text className="text-muted mb-2">
                      Your username should be at least 4 characters long
                    </Form.Text>

                    <Form.Label className="titles h3">Password</Form.Label>
                    <FormControl
                      type="text"
                      name="password"
                      placeholder="insert your new password here"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted mb-2">
                      Your password should be at least 8 characters long
                    </Form.Text>

                    <Form.Label className="titles h3">Email</Form.Label>
                    <FormControl
                      type="email"
                      name="email"
                      className="mb-4"
                      placeholder="insert your new email here"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />

                    <Form.Label className="titles h3">Birth date</Form.Label>
                    <FormControl
                      type="date"
                      name="birthday"
                      placeholder="insert your new email here"
                      onChange={(e) => this.setBirthday(e.target.value)}
                      required
                    />
                  </Container>
                </Container>
                <Container className="text-center">
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

        <Card>
          <Card.Body>
            {favoriteMovies.length === 0 && (
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
                        <Card.Img src={movie.ImagePath} />
                        <Card.Body className="text-center">
                          <Card.Title className="titles custom-card-title">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            className="custom-btn"
                            onClick={this.removeFav}
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
