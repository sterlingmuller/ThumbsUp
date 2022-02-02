import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js'
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';



export const NewUser = () => {

  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  function validateForm() {
    return username.length > 2 && password.length > 2;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      'username': username,
      'password': password
    }
    axios
      .post('/usersCreate', payload)
      .then((data) => {
        if (data.data === 'Created Account') {
          alert(data.data);
          navigate('/login')
        } else {
          alert(data.data);
        }
      })
  }

  function createUser() {
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required = {true}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </Form.Group>
          <>
          <Button variant="primary" type="submit" disabled={!validateForm()}>
            Create Account
          </Button>{' '}
          <Button variant="secondary" type="button" onClick={() => {navigate('/login')}}>
            Already Have an Account? Log In...
          </Button>{' '}
          </>
        </Form>
      </div>
    );

  }

  return (
    <div className="newUser">
      <h1>Thumbs Up</h1>
      {createUser()}
    </div>
  );

}