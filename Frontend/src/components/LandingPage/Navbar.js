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
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/favorites">Favorites</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/profile">Profile</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/cart">My Cart</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/registerShop">Register My Shop</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/shop">My Shop</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/purchases">Past Orders</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/" onClick={this.handleLogout}>
                <span class="glyphicon glyphicon-user"></span>Logout
              </Link>
            </a>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/login">
                <span class="glyphicon glyphicon-log-in"></span> Login
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/register">
                <span class="glyphicon glyphicon-log-in"></span> Register
              </Link>
            </a>
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">
              <Link to="/home">
                <span class="glyphicon glyphicon-log-in"></span> Etsy
              </Link>
            </a>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
