import React, { useState, useContext } from 'react';
import { MainContext } from '../../contexts/MainContext.js'
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

export const Login = () => {
  const { setCurrentUser } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
      .post('/login', payload)
      .then((data) => {
        if (data.status === 200) {
          setCurrentUser(data.data);
          navigate('/riderOrDriver');
        }
        else {
          alert('Invalid username/password combination');
        }
      })
  }

  function loginForm() {
    return (
      <div className="Login">
        <h1>Thumbs Up</h1>
        <Form action="/login" onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              autoComplete='on'
            />
          </Form.Group>
          <>
            <Button variant="primary" type="submit" disabled={!validateForm()}>
              Login
            </Button>{' '}
            <Button variant="secondary" type="button" onClick={() => { navigate('/newUser') }} >
              Create Account
            </Button>{' '}
          </>
        </Form>
        <div className="wrapperSlide">
          <div className="sliding-background"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="LoginAndSelection">
      {loginForm()}
    </div>
  );
}