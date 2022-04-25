import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUserData, setUserName } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../navbar-view/navbar-view";
import { ActorView } from "../actor-view/actor-view";
import { RegistrationView } from "../registration-view/registration-view";
import {UserDetailsView} from "../profile-view/user-details-view";
import "../../index.scss";
import PropTypes from "prop-types";

class MainView extends React.Component {
  constructor() {
    super();
  }

  //componentdidmount keeps the user logged in, had to create a new action/reducer to set only the username vs the full user details
  componentDidMount() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token !== null) {
      this.getMovies(token);
      this.getUser(token);
      //sets username from local storage
      this.props.setUserName(user);
    }
  }

  onLoggedIn(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.username);
    //sets user data from the api response upon loggin in (no need to send a request to the api to receive the users details)
    this.props.setUserData(data.user);
    //get movies
    this.getMovies(data.token);
  }

  getMovies(token) {
    axios
      .get("https://my-flix-api-2022.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //api call to get user data again otherwise it's lost after page refresh
  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://my-flix-api-2022.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUserData(response.data);
      })
      .catch((e) => console.log(e));
  }

  render() {
    let { movies, userData, userName } = this.props;
    let user = userName;
    return (
      <Router>
        <NavBar user={user} />

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              if (user) {
                return <MoviesList movies={movies} />;
              }
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              if (!user)
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/actors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <ActorView
                    actor={
                      movies.find((m) => m.Actors[0].Name === match.params.name)
                        .Actors
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  
                  <UserDetailsView
                    history={history}
                    movies={movies}
                    userData={userData}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    userData: state.userData,
    userName: state.userName,
  };
};
export default connect(mapStateToProps, {
  setMovies,
  setUserData,
  setUserName,
})(MainView);

MainView.propTypes = {
  setMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
