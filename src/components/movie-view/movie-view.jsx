import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
  }

  //add favorite
  addFav() {
    {
      const user = this.props.userData.username;
      const token = this.props.token;
      const id = this.props.movie._id;
      axios
        .post(
          `https://my-flix-api-2022.herokuapp.com/users/${user}/favoriteMovies/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          alert(
            `${this.props.movie.Title} has been added to your list of favorites`
          );
          window.open(`/movies/${id}`, "_self");
        })
        .catch((e) => console.log(e));
    }
  }

  //remove favorite
  removeFav() {
    {
      const id = this.props.movie._id;
      axios
        .delete(
          `https://my-flix-api-2022.herokuapp.com/users/${this.props.userData.username}/favoriteMovies/${id}`,

          { headers: { Authorization: `Bearer ${this.props.token}` } },
          {}
        )
        .then((response) => {
          alert(
            `${this.props.movie.Title} has been deleted from your list of favorites`
          );
          window.open(`/movies/${id}`, "_self");
        })
        .catch((e) => console.log(e));
    }
  }
  render() {
    const { movie, onBackClick, userData, token } = this.props;
    let movieId = movie._id;
    let isFav = userData.favoriteMovies.includes(movieId);
    return (
      <Card>
        <Container className="text-left p-4 card-custom">
          <Button
            variant="primary"
            className="custom-btn"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Go Back
          </Button>
        </Container>
        <Container className="text-center p-3 card-custom">
          <Card.Img
            className="movie-poster img-responsive"
            variant="top"
            style={{ width: "40%" }}
            src={movie.ImagePath}
          />
        </Container>

        <Card.Body>
          <Col className="d-sm-flex justify-content-between justify-content-xl-center">
            <Card.Text className="label titles h3 align-self-center">
              Title:{" "}
            </Card.Text>
            <span className="movie-title titles ml-3 h1">{movie.Title}</span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-center">
            <Card.Text className="label titles h3 align-self-center">
              Description:{" "}
            </Card.Text>
            <span className="movie-description card-text ml-3 ">
              {movie.Description}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-center">
            <Card.Text className="label titles h3 align-self-center">
              Genre:{" "}
            </Card.Text>
            <Link
              className="titles-expand movie-genre ml-3 h1"
              to={`/genres/${movie.Genre.Name}`}
            >
              {movie.Genre.Name}
            </Link>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-center">
            <Card.Text className="label titles h3 align-self-center">
              Release Year:{" "}
            </Card.Text>
            <span className="movie-release titles ml-3 h1 ">
              {movie.releaseYear}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-center">
            <Card.Text className="label titles h3 align-self-center">
              Director:{" "}
            </Card.Text>
            <Link
              className="movie-director titles-expand ml-3 h1"
              to={`/directors/${movie.Director.Name}`}
            >
              {movie.Director.Name}
            </Link>
          </Col>

          {movie.Actors[0].Name && (
            <Col className="d-sm-flex justify-content-between justify-content-xl-center">
              <Card.Text className="label titles h3 align-self-center">
                Main Actor:{" "}
              </Card.Text>
              <Link
                className="titles-expand movie-actor ml-3 h1"
                to={`/actors/${movie.Actors[0].Name}`}
              >
                {movie.Actors[0].Name}
              </Link>
            </Col>
          )}

          <Container className="text-center p-2">
            {!isFav && (
              <Button
                variant="primary"
                className="custom-btn"
                onClick={this.addFav}
              >
                Add to favorites
              </Button>
            )}
            {isFav && (
              <Button
                variant="primary"
                className="custom-btn"
                onClick={this.removeFav}
              >
                Remove from favorites
              </Button>
            )}
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    releaseYear: PropTypes.arrayOf(PropTypes.number).isRequired,
    Actors: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string,
      })
    ).isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
