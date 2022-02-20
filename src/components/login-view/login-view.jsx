import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export function LoginView(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //send user data to the database to check if the user exists
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(username.password);
          /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
    };

    const handleRegister=(e)=>{
        e.preventDefault();
        //logic to handle the registration button and get the registration-view 
       // console.log(username.password);
          /* Send a request to the server for authentication */
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e=>
            setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onClick={e=>
            setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </Form>
            //non  react bootstrap 
            /*<label>Username: <input type="text" value={username}
            onChange={e=>setUsername(e.target.value)}/>
            </label>

            <button type="submit" onClick={handleSubmit}>Submit</button>*/
        
    )
}
LoginView.propTypes={
 user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
 }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
  }
  