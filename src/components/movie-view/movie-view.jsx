import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  //add favorite

  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: []
    }

   
  }

removeFav = (movie) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  axios
    .delete(
      `https://my-flix-api-2022.herokuapp.com/users/${user}/movies/${movie._id}`,

      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert("Movie deleted from favorites!");
      window.open(`/movies/${this.props.movie._id}`, '_self')
    })
    .catch((e) => console.log(e));
};

addFav = (movie) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  axios
    .put(
      `https://my-flix-api-2022.herokuapp.com/users/${user}/movies/${movie._id}`,

      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert(`${this.movie.Title} has been added to your list of favorites`);
      window.open(`/movies/${this.props.movie._id}`, '_self')
    })
    .catch((e) => console.log(e));
};



  render() {
    const { movie, onBackClick } = this.props;
    let faves = this.state.favoriteMovies
    let isFav = false
     
    if( faves.includes(movie)){
      isFav= true
    }else {
      isFav=false
    }

    return (
      <Card>
        {console.log(movie._id)}
        <Container className="text-left p-4">
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
        <Container className="text-center p-3">
          <Card.Img
            className="movie-poster"
            variant="top"
            src={movie.ImagePath}
          />
        </Container>

        <Card.Body>
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Title: </Card.Text>
            <span className="movie-title titles ml-3 h1">{movie.Title}</span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Description: </Card.Text>
            <span className="movie-description card-text ml-3 ">
              {movie.Description}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Genre: </Card.Text>
              <Link className="titles movie-genre ml-3 h1" to={`/genres/${movie.Genre.Name}`}>
                {movie.Genre.Name}
              </Link>      
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Release Year: </Card.Text>
            <span className="movie-release titles ml-3 h1 ">
              {movie.releaseYear}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Director: </Card.Text>
            <Link className="movie-director titles ml-3 h1" to={`/directors/${movie.Director.Name}`}>
                {movie.Director.Name}
              </Link>  
          </Col>

{movie.Actors[0].Name && (
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3">Main Actor: </Card.Text>
            <Link className="titles movie-actor ml-3 h1" to={`/actors/${movie.Actors[0].Name}`}>
                {movie.Actors[0].Name}
              </Link>
          </Col>)}
          

          <Container className="text-left p-2">
            <Button
              variant="primary"
              className="custom-btn"
              onClick={()=>{this.addFav(movie)}}>
              Add to favorites
            </Button>
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
      Description: PropTypes.string.isRequired,
    }).isRequired,

    Featured: PropTypes.bool,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),

    Description: PropTypes.string.isRequired,
    releaseYear: PropTypes.arrayOf(PropTypes.number).isRequired,

    Actors: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
        Movies: PropTypes.arrayOf(PropTypes.string),
      })
    ),

    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
