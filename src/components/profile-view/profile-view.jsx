import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  Form,
  Col,
  Row,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";


export class ProfileView extends React.Component {
  
  constructor() {
    super();
  }


  

  render() {
    const { movies, user } = this.props;
    console.log(user)
    //if (!user) {
//return null;
  //  }

    return (
      <Container>
        <p>hey</p>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
