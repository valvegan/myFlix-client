import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Container className="director-view">
            <Col className="d-sm-flex justify-content-between justify-content-xl-start">
              <Card.Text className="align-self-center label titles h3">Name: </Card.Text>
              <span className="movie-director-bio titles ml-3 h1">
                {director.Name}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-xl-start">
              <Card.Text className="align-self-center label titles h3">Bio: </Card.Text>
              <span className="movie-director-bio card-text ml-3 ">
                {director.Bio}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-xl-start">
              <Card.Text className="align-self-center label titles h3">Born: </Card.Text>
              <span className="movie-director-birth titles ml-3 h1">
                {director.Birth}
              </span>
            </Col>

            {director.Death && (
              <Col className="d-sm-flex justify-content-between justify-content-xl-start">
                <Card.Text className="align-self-center label titles h3">Death: </Card.Text>
                <span className="movie-director-death titles ml-3 h1">
                  {director.Death}
                </span>
              </Col>
            )}
          </Container>
          <Container className="d-flex justify-content-between">
            <Button
              className="custom-btn"
              type="submit"
              onClick={() => {
                onBackClick();
              }}
            >
              Go back
            </Button>
            <Link to={`/`}>
              <Button className="custom-btn" type="submit">
                Back to List
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
  }).isRequired,

  onBackClick: PropTypes.func.isRequired

};