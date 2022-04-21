import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem("token")) {
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <span class="glyphicon glyphicon-log-in"></span> Register
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    //if (localStorage.getItem("token")) {
    //redirectVar = <Redirect to="/home" />;
    //}
    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand">Book Store App</a>
            </div>
            <ul class="nav navbar-nav">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/create">Add a Book</Link>
              </li>
              <li>
                <Link to="/delete">Delete a Book</Link>
              </li>
            </ul>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
