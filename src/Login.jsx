import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="box">
        <h2>Log In</h2><br /><br />
        <form>
          <div className="error">
            <input type="text" className="username" placeholder="Enter Username" />
            <input type="password" className="password" placeholder="Enter Password" />
            <input type="submit" className="submit" value="Login" />
          </div>
        </form>
        <a className="fp" href="">Forget password?</a><br /><br />
        <div className="acc">Don't Have an Account?
          <a className="li" href="Sign.html">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
