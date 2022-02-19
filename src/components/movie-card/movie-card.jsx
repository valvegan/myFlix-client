import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props
    //conditional to check if death year is present for Director.Death and Actors.Death 
    //actors.Death and Director.Death
    if(Actors.Death in this.props === null 
      || Director.Death in this.props === null){
      console.log("no death year")
    }


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
    releaseYear: PropTypes.arrayOf(PropTypes.number).isRequired,

    Actors: PropTypes.arrayOf(PropTypes.shape(
      {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      Movies: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,

    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}
