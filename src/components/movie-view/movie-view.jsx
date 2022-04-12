import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {


  render() {
      const {movie, onBackClick }=this.props;
      
     
      return (

          <div className="movie-view">
            <div className="movie-poster">
                <img src={movie.ImagePath}/>
                </div>
                <div className="movie-title">
                    <span className="label">Title:</span>
                    <span className="label">{movie.Title}</span>
                    </div>  
                <div className="movie-description">
                    <span className="label">Description:</span>
                    <span className="label">{movie.Description}</span>
                    </div> 
                    <div className="movie-genre">
                    <span className="label">Genre:</span>
                    <span className="label">{movie.Genre.Name}</span>
                    </div> 
                    <div className="movie-release">
                    <span className="label">Release Year:</span>
                    <span className="label">{movie.releaseYear}</span>
                    </div> 
                    <div className="movie-director">
                    <span className="label">Director:</span>
                    <span className="label">{movie.Director.Name}</span>
                    </div> 
                    <div className="movie-director-bio">
                    <span className="label">Director's bio:</span>
                    <span className="label">{movie.Director.Bio}</span>
                    </div> 
                    <div className="movie-director-birth">
                    <span className="label">Director's birth date:</span>
                    <span className="label">{movie.Director.Birth}</span>
                    </div> 
                    { (movie.Director.Death) &&
                        <div className="movie-director-death">
                        <span className="label">Director's death date:</span>
                        <span className="label">{movie.Director.Death}</span>
                        </div> 
                      }  
                    <div className="movie-actor">
                    <span className="label">Main Actor:</span>
                    <span className="label">{movie.Actors[0].Name}</span>
                    </div> 
                    <div className="movie-actor-bio">
                    <span className="label">Main Actor's bio:</span>
                    <span className="label">{movie.Actors[0].Bio}</span>
                    </div> 
                    <div className="movie-actor-birth">
                    <span className="label">Main Actor's birth date:</span>
                    <span className="label">{movie.Actors[0].Birth}</span>
                    </div> 
                    { (movie.Actors[0].Death) &&
                        <div className="movie-actor-death">
                        <span className="label">Main Actor's death date:</span>
                        <span className="label">{movie.Actors[0].Death}</span>
                        </div>
                      } 
                    
                    <button onClick={()=>{onBackClick(null);}}>Back</button>
          </div>
      )
  }}

