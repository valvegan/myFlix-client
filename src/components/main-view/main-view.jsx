import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUserData } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar } from "../navbar-view/navbar-view";
import { ActorView } from "../actor-view/actor-view";
import { RegistrationView } from "../registration-view/registration-view";
import "../../index.scss";

class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null

  }

  getMovies(token) {
    axios
      .get("https://my-flix-api-2022.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.props.setMovies(
          response.data,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }


  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://my-flix-api-2022.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        console.log(response.data)
        this.props.setUserData(
          response.data   
        );
      })
      .catch((e) => console.log(e));
  }


  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUserData({
      user: null,
    });
    window.open("/", "_self");
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getMovies(accessToken);
      //this line makes the user data pop up in the console?!! when opening movie view
      this.getUser(accessToken)
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.getUser({
      user: authData.user.username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }
 

  render() {
    let {movies, userData} = this.props;
    //let {user} = this.state;
    let userName = localStorage.getItem("user")
    console.log(userName)
    
  
    console.log(movies)

    return (
      <Router>
        <Navbar user={userName} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!userName)
                return (
                  <Col>
                    <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies}/>;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (userName) return <Redirect to="/" />;
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
              if (!userName)
                return (
                  <Col>
                    <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
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
              if (!userName)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
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
                      <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
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
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/actors/:name"
            render={({ match, history }) => {
              if (!userName)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
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
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${userName}`}
            render={({ match, history }) => {
              if (!userName)
                return (
                  <LoginView onLoggedIn={(userName) => this.onLoggedIn(userName)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView
                    history={history}
                    movies={movies}
                    userData={userName}
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

let mapStateToProps = state => {
  return { movies: state.movies }
  return {userData: state.user }
}
export default connect(mapStateToProps, { setMovies, setUserData } )(MainView);
