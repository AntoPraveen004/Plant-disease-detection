import React from 'react'
import './views/signup.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Login'
import background from './img/login.jpg'

const SignIn = () => {
  return (
    <div className="container" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
      <div className="box">
        <h2>Sign Up</h2><br /><br />
        <form>
          <div className="error">
            <input type="text" className="username" placeholder="Enter Username" />
            <input type="password" className="password" placeholder="Enter Password" />
            <input type="submit" className="submit" value="Login" />
          </div>
        </form>
        <a className="fp" href="">Forget password?</a><br /><br />
        <div className="acc">Already have an account?
          <Link to="/user/login">Login</Link>
          <Routes>
            <Route path="/user/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default SignIn
