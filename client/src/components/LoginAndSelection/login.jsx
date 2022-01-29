import React, { useState, useEffect, useContext } from 'react';
import {MainContext} from '../../contexts/MainContext.js'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";



export const Login = () => {
  const { currentPage, setCurrentPage, setUserId } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      "username": username,
      "password": password
    }
    axios
      .post('/usersLogin', payload)
      .then((data) => {
        if (data.data) {
          successfulLogin();
          setUserId(data.data.userId);
        } else {
          alert('Invalid login attempt!')
        }
      })
  }

  function successfulLogin() {
    setLoginStatus(true);
  }

  function loginForm() {
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
            Login
          </Button>{' '}
          <Button variant="secondary" type="button" onClick={() => { setCurrentPage('newUser') }} >
            Create Account
          </Button>{' '}
          </>
        </Form>
      </div>
    );
  }

  return (
    <div className="LoginAndSelection">
      <h1>Thumbs Up</h1>
      <div className='backToMainNav' onClick={() => { setCurrentPage('siteNavigator') }}> TO NAVIGATOR PAGE</div>
      {loginForm()}
    </div>
  );

}