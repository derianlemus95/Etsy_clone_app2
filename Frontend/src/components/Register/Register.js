import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

//Define a Register Component
class Register extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      email: "",
      password: "",
      authFlag: false,
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
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
  //name change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  //name change handler to update state variable with the text entered by the user
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/user/register", data).then((response) => {
      if (response.status === 200) {
        this.setState({
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
    let { authFlag } = this.state;
    let invalidID;
    if (authFlag) {
      invalidID = (
        <div>
          <span className="errorClass" style={{ color: "red" }}>
            Error: account already exist. Please log in or create an account
            with a different email
          </span>
        </div>
      );
    }
    return (
      <div>
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Create a new account</h2>
                <p>Please enter your name, email, and password</p>
              </div>
              {invalidID}
              <form onSubmit={this.submitLogin}>
                <div class="form-group">
                  <input
                    onChange={this.nameChangeHandler}
                    type="text"
                    class="form-control"
                    required
                    name="name"
                    placeholder="Full Name"
                  />
                </div>
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
                  Register
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
export default Register;
