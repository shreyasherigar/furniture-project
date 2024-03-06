
import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [enteredFirstName, setEnteredFirst] = useState('');
  const [enteredLastName, setEnteredLast] = useState('');
  const [enteredAddress, setEnteredAdd] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const firstNameChangeHandler = (event) => {
    setEnteredFirst(event.target.value);
  };
  const lastNameChangeHandler = (event) => {
    setEnteredLast(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setEnteredAdd(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    const registeredData = {
      id: Math.random().toString(),
      first_name: enteredFirstName,
      last_name: enteredLastName,
      address: enteredAddress,
      email: enteredEmail,
      phone: enteredPhone,
      username: enteredUsername,
      password: enteredPassword,
    };

    try {
      const response = await registerUser(registeredData);
      navigate('/login')
    } catch (error) {
      alert('Registration failed:', error.message);
    }
    setEnteredFirst('');
    setEnteredLast('');
    setEnteredAdd('');
    setEnteredPhone('');
    setEnteredEmail('');
    setEnteredUsername('');
    setEnteredPassword('');
  };

  return (
    <div className="registercontainer">
      <form onSubmit={submitHandler}>
        <h1>Register Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              value={enteredFirstName}
              placeholder="First Name"
              required
              onChange={firstNameChangeHandler}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              value={enteredLastName}
              placeholder="Last Name"
              required
              onChange={lastNameChangeHandler}
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              value={enteredAddress}
              placeholder="Address"
              required
              onChange={addressChangeHandler}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={enteredEmail}
              placeholder="Email"
              required
              onChange={emailChangeHandler}
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              type="text"
              value={enteredPhone}
              placeholder="Phone"
              required
              onChange={phoneChangeHandler}
            />
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={enteredUsername}
              placeholder="Username"
              required
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={enteredPassword}
              placeholder="Password"
              required
              onChange={passwordChangeHandler}
              minLength="3"
            />
          </div>
          <input type="submit" value="register" className="btn" />
        </div>
      </form>
      <p className="mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
