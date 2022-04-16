<Container className="extra-info">
            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Bio: </Card.Text>
              <span className="movie-actor-bio card-text  ml-3 ">
                {movie.Actors[0].Bio}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Born: </Card.Text>
              <span className="movie-actor-name titles ml-3 ">
                {movie.Actors[0].Birth}
              </span>
            </Col>

            {movie.Actors[0].Death && (
              <Col className="d-sm-flex justify-content-between justify-content-lg-start">
                <Card.Text className="label titles">Died: </Card.Text>
                <span className="movie-director titles ml-3 ">
                  {movie.Actors[0].Death}
                </span>
              </Col>
            )}
          </Container>