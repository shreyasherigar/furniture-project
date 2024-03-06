import './Login.css';
import { Link,  useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import  {loginUser} from "../services/api";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
 

  const loginHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);
    localStorage.setItem("username",username)

    loginUser(loginData)


    try {
      if(await loginUser(loginData)){   
        localStorage.setItem("username",username)     
        navigate("/");
      }else{
        alert("Invalid Credentials. Retry ");
        localStorage.clear();
      }
    } catch (error) {
      alert('Login error:', error);
      setErrMsg('Something went wrong. Please try again later.');
      localStorage.clear();
    }
    
  
    setUsername('');
    setPassword('');
  };
  return (
    <div>
      <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <div className="account-form">
          <form onSubmit={loginHandler}>
            <h1>Login now</h1>
            <div className="ui divider">
              <div className="ui form">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="box"
                  ref={userRef}
                  name="username"
                  value={username}
                  onChange={usernameHandler}
                  required
                />
              </div>
              <div className="ui form">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="box"
                  name="password"
                  value={password}
                  onChange={passwordHandler}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn" />
            </div>
          </form>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
