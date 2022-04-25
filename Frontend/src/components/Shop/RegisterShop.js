import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class RegisterShop extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      shopName: "",
      authFlag: true,
      validName: false,
    };
    //Bind the handlers to this class
    this.shopNameChangeHandler = this.shopNameChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      username: localStorage.getItem("email"),
      validName: false,
    });
  }
  //email change handler to update state variable with the text entered by the user
  shopNameChangeHandler = (e) => {
    this.setState({
      shopName: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      shopName: this.state.shopName,
      username: localStorage.getItem("email"),
    };
    document.cookie = "shopname" + "=" + this.state.shopname + "; Path=/;";

    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    //make a post request with the user data
    axios
      .post("http://localhost:3001/user/registerShop", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            authFlag: false,
            validName: true,
          });
        } else {
          this.setState({
            authFlag: true,
            validName: false,
          });
        }
      });
  };

  render() {
    //if not logged in go to login page
    let redirectVar = null;
    let pass = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    //If password and username do not match display error
    let { authFlag } = this.state;
    let invalidID;
    if (authFlag) {
      invalidID = (
        <div>
          <span className="errorClass" style={{ color: "red" }}>
            Error: Name is already taken. Please enter another name.
          </span>
        </div>
      );
    }
    let { validName } = this.state;
    if (validName) {
      pass = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        {invalidID}
        {pass}
        <div class="container" align="center">
          <h2>Name Your Shop</h2>
          <p>Choose a memorable name that reflcts your style</p>
          <div class="form-group">
            <input
              onChange={this.shopNameChangeHandler}
              type="text"
              class="form-control"
              name="shopName"
              placeholder="Enter your shop name..."
            />
          </div>
          <button onClick={this.submitLogin} class="btn btn-primary">
            Check Availability
          </button>
        </div>
      </div>
    );
  }
}
//export Home Component
export default RegisterShop;
