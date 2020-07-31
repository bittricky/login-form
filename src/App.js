import React, { useState } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

const Submit = styled.input`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  width: 100%;
  border: 0;
  padding: 15px;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  background-color: ${props => {
    return props.disabled ? "darkgrey" : "#ffe100";
  }};
  color: ${props => {
    return props.disabled ? "lightgrey" : "#000000";
  }};
`;

const Message = styled.p`
  visibility: ${props => (props.isValid ? "hidden" : "visible")};
  color: #c14321;
  font-family: Helvetica;
  font-size: 0.75em;
`;

const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false)
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validateEmail = (target) => {
    if (validEmail.test(target.value)) {
      setEmail(target.value);
      setEmailError(false);
      setHelperText('');
    } else {
      setEmailError(true);
      setHelperText('Invalid Email. Please input a valid email.');
    }
  }

  const validatePassword = (target) => {
    if (target.value.length >= 1) {
      setPassword(target.value);
      setPasswordError(false);
      setHelperText('');
    } else {
      setPasswordError(true);
      setHelperText('Invalid Password. Please try again.');
    }
  }

  const handleChange = (e) => {
    const { name } = e.target;

    switch (name) {
      case 'email':
        validateEmail(e.target);
        break;
      case 'password':
        validatePassword(e.target);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://reqres.in/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      let successMessage = (data.token) ? 'Login Successful' : 'No user was found.';
      setError(false);
      setHelperText(successMessage);
    })
    .catch(err => {
      console.error(`ERROR: Request failed ${err}`);
      setError(true);
      setHelperText(error);
    });
  } 

  return (
    <div className="App">
      <Wrapper>
        <Message id="message" className={error ? "error" : "no-error"} isValid={error}>{helperText}</Message>
        <Form>
          <Input
            id="email-input"
            type="text"
            name="email"
            placeholder="email address"
            onChange={e => handleChange(e)}>
          </Input>

          <Input
            id="password-input"
            type="password"
            name="password"
            placeholder="password"
            onChange={e => handleChange(e)}>
          </Input>

          <Submit
            id="btn-submit"
            type="submit"
            disabled={error || emailError || passwordError}
            onClick={e => handleSubmit(e)}
          ></Submit>
        </Form>
      </Wrapper>
    </div>
  );
}

export default App;
