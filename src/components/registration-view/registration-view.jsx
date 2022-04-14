import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Container, Row, Col, CardGroup, Card, CardBody} from 'react-bootstrap';

export function UserRegistration(props){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
      nameErr: '',
      usernameErr: '',
      passwordErr: '',
      emailErr: '',
      birthdayErr: '',
    });

    //form validation logic
    const validate = () =>{
      let isReq = true;
      if(!name){
        setValues({...values, nameErr: 'Name is required'
        });
        isReq = false
      }
      if(!username){
        setValues({...values, usernameErr: 'username is required'});
        isReq = false;
      }else if(username.length<2){
        setValues({...values, usernameErr: 'Username must be 2 characters long'});
        isReq  = false;
      }
      if(!password){
        setValues({...values, passwordErr: 'Password required'});
        isReq = false;
      }else if(password.length<6){
        setValues({...values, passwordErr: 'Password must be 6 characters long'});
        isReq = false;
      };
      if(!email){
        setValues({...values, emailErr: 'Email address is required'});
        isReq = false;
      }else if(email.indexOf('@')===-1){
        setValues({...values, emailErr: 'Email must be a valid email address'});
        isReq = false
      }
      if(!birthday){
        setValues({...values, birthdayErr: 'You must enter a date of birth'});
        isReq = false
      }else if(birthday.typeOf(!date)){
        setValues({...values, birthdayErr: 'Birthday must be in the following format: yyyy/mm/dd'});
        isReq = false
      }
    }
       
    const handleRegistration=(e)=>{
        e.preventDefault();
        console.log(username.password);
          /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
    };

    //post new user to the database 
       

    return (
        <Container>
            <Row>
            <Col>
            <CardGroup>
                <Card>
                    <CardBody>
            <Card.Title>Sign up here</Card.Title>
        <Form className="register-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}
            onChange={e=>
                setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Enter a username" value={username}
            onChange={e=>
                setUsername(e.target.value)} />
          </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Your password should be at least 8 characters" value={password}
            onChange={e=>
                setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirthdate">
        <Form.Label>Birth date: </Form.Label>
          <Form.Control type="date" placeholder="yyyy/mm/dd" value={birthday}
            onChange={e=>
                setBirthday(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegistration}>
          Sign me up!
        </Button>
        Already have an account?
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Sign in
            </Button>
                         </Form>
                     </CardBody>
                 </Card>
             </CardGroup>
             </Col>
         </Row>
      </Container>

    )
}

UserRegistration.propTypes={

    newUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,

        //custom proptype
        email: PropTypes.string.isRequired,
        Birthday: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    //
    registered: PropTypes.func,
  }
  