import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
const jwt_decode = require("jwt-decode");

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: true,
      token: "",
      message: "",
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //username change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.status === 200) {
        this.setState({
          token: response.data,
          authFlag: false,
        });
      } else {
        this.setState({
          authFlag: true,
        });
      }
    });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.token.length > 0) {
      localStorage.setItem("token", this.state.token);

      var decoded = jwt_decode(this.state.token.split(" ")[1]);
      localStorage.setItem("user_id", decoded._id);
      localStorage.setItem("email", decoded.email);

      redirectVar = <Redirect to="/home" />;
    }
    let { authFlag } = this.state;
    let invalidID;
    if (authFlag) {
      invalidID = (
        <div>
          <span className="errorClass" style={{ color: "red" }}>
            Error: Email or password is incorrect. Please enter correct email
            and password
          </span>
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>LOGIN</h2>
                <p>Please enter your email and password</p>
              </div>
              {invalidID}
              <form onSubmit={this.submitLogin}>
                <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                <div class="form-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="text"
                    class="form-control"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.passwordChangeHandler}
                    type="password"
                    class="form-control"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
