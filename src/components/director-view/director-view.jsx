import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Card>

        <Card.Body>
        <Container className="director-view">

        <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Name: </Card.Text>
              <span className="movie-director-bio card-text  ml-3 ">
                {director.Name}
              </span>
            </Col>


            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Bio: </Card.Text>
              <span className="movie-director-bio card-text  ml-3 ">
                {director.Bio}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Born: </Card.Text>
              <span className="movie-director-birth titles ml-3 ">
                {director.Birth}
              </span>
            </Col>

            {director.Death && (
              <Col className="d-sm-flex justify-content-between justify-content-lg-start">
                <Card.Text className="label titles">Death: </Card.Text>
                <span className="movie-director-death titles ml-3 ">
                  {director.Death}
                </span>
              </Col>
            )}
          </Container>
          <Button className="custom-btn" type="submit" onClick={()=>{onBackClick()}}>Go back</Button>
          <Link to={`/`}>
          <Button className="custom-btn" type="submit">Back to List</Button></Link>
                  </Card.Body>
      </Card>
    );
  }
}



