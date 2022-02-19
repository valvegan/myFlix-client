import React from 'react';
import PropTypes from 'prop-types';
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props

    return (
    <div className="movie-card" onClick={()=>
        onMovieClick(movie)}> {movie.Title} </div>
    )}
}

MovieCard.propTypes={
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,

    Featured: PropTypes.bool.isRequired,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,

    Description: PropTypes.string.isRequired,

    releaseYear: PropTypes.object.isRequired,

    Actors: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      Movies: PropTypes.array.isRequired
    }).isRequired,
    
    ImagePath: PropTypes.string.isRequired,
    //Featured: boolean.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}
