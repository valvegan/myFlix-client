import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { Card, Form, FormGroup, Col, Row, Container, FormControl, Button } from "react-bootstrap";

export class ProfileView extends React.Component{
    constructor(){
        super();
        this.state ={
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        }
    }



getUser(token) {
    let username = localStorage.getItem('user');
    axios
      .get(`https://my-flix-api-2022.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        //assign the result to the state
        this.setState({
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
            birthday: response.data.birthday,
            favoriteMovies: response.data.favoriteMovies
        });
      })
      .catch(e => 
        console.log(e)
      )
  }
  componentDidMount(){
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken)
}

onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open('/', '_self')
  }

  editProfile = e =>{
      e.preventDefault();
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios.put(`https://my-flix-api-2022.herokuapp.com/users/${user}`,
      {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday
      },
      {headers: {Authorization: `Bearer ${token}`}
    })
    .then((response)=>{
        this.setState({
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
            birthday: response.data.birthday,
        });
        localStorage.setItem('user', this.state.username);
        alert('profile updated successfully!');
        window.open('/profile', '_self')
    })
  };

  removeFav = (e, movies) =>{
      e.preventDefault();
      const username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios.delete(`https://my-flix-api-2022.herokuapp.com/users/${username}/movies/${movie._id}`,
      
      {headers: {Authorization: `Bearer ${token}`}
    })
    .then((response)=>{
        console.log(response);
        alert('Movie deleted from favorites!');
        this.componentDidMount();
        })
        .catch(e=>console.log(e))
        
    }

    deleteProfile(){
        const username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios.delete(`https://my-flix-api-2022.herokuapp.com/users/${username}`,
      
      {headers: {Authorization: `Bearer ${token}`}
    })
    .then((response)=>{
        console.log(response);
        alert('profile deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        })
        .catch(e=>console.log(e))
        

    }

    setUsername(value){
        this.setState({
            username: value
        })
    }
    setPassword(value){
        this.setState({
            password: value
        })
    }
    setEmail(value){
        this.setState({
            email: value
        })
    }
    setBirthday(value){
        this.setState({
            birthday: value
        })
    }

  

render(){
    const {movies, onBackClick} = this.props;
    const {favoriteMovies, username, email, birthday} = this.state;

    if(!username){
        return null
    }

    return (
     <Container>
      <h1>Can you see this</h1>
         
     </Container>
    )
}


}