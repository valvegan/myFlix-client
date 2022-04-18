import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  //implementing logic for favorite movies
  constructor(props){
    super(props);
    this.state = {
      favoriteMovies: []
    }

    this.addFav= this.addFav.bind(this);
    
  }

  addFav = (e, movie)=> {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.post(`https://my-flix-api-2022.herokuapp.com/users/${user}/favoriteMovies/${movie._id}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response);
      alert(`'` + this.props.movie.Title + `'` + " was added to your favorites! :)");
      window.open(`/movies/${this.props.movie._id}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { movie, onBackClick } = this.props;
    let movieActors = movie.Actors
    let actor = movieActors[0];
    const favorites = this.state.favoriteMovies;


    let isFav = false 
    if (favorites.includes(this.props.movie._id)){
      isFav = true;
    }else{
      isFav= false;
    }

    return (
      <Card>
        <Container className="text-left p-3">
        
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
          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Title: </Card.Text>
            <span className="movie-title titles h1">{movie.Title}</span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Description: </Card.Text>
            <span className="movie-description card-text ml-3 ">
              {movie.Description}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Genre: </Card.Text>
              <Link className="titles movie-genre h1" to={`/genres/${movie.Genre.Name}`}>
                {movie.Genre.Name}
              </Link>      
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Release Year: </Card.Text>
            <span className="movie-release titles h1">
              {movie.releaseYear}
            </span>
          </Col>

          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Director: </Card.Text>
            <Link className="movie-director titles h1" to={`/directors/${movie.Director.Name}`}>
                {movie.Director.Name}
              </Link>  
          </Col>

{movie.Actors[0] && (
          <Col className="d-sm-flex justify-content-between justify-content-lg-start">
            <Card.Text className="label titles custom-card-title">Main Actor: </Card.Text>
            <Link className="titles movie-actor h1" to={`/actors/${actor.Name}`}>
                {movie.Actors[0].Name}
              </Link>
          </Col>)}
          

          <Container className="text-center p-2">
            <Button
              variant="primary"
              className="custom-btn"
              onClick={this.addFav}
            >
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
