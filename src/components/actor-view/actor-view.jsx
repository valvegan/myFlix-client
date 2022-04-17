import React from 'react';
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class ActorView extends React.Component {
  render() {


    const { actor, movie, onBackClick } = this.props;

    return (
     
      <Card>
         
        <Card.Body>
        <Container className="extra-info">
            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Bio: </Card.Text>
              <span className="card-text ml-3">
                {}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Born: </Card.Text>
              <span className="titles ml-3 ">
                {}
              </span>
            </Col>

            {actor.Bio && (
              <Col className="d-sm-flex justify-content-between justify-content-lg-start">
                <Card.Text className="label titles">Died: </Card.Text>
                <span className="titles ml-3 ">
                  {}
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




