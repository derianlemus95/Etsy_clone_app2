import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class Profile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      image: "",
      name: "",
      email: "",
      about: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      birthday: "",
      authFlag: true,
      username: "",
    };
    //Bind the handlers to this class
    this.imageChangeHandler = this.imageChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.birthdayChangeHandler = this.birthdayChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: true,
      username: localStorage.getItem("email"),
    });
  }
  //username change handler to update state variable with the text entered by the user
  imageChangeHandler = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };
  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  //email change handler to update state variable with the text entered by the user
  aboutChangeHandler = (e) => {
    this.setState({
      about: e.target.value,
    });
  };
  //email change handler to update state variable with the text entered by the user
  phoneChangeHandler = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  //email change handler to update state variable with the text entered by the user
  addressChangeHandler = (e) => {
    this.setState({
      address: e.target.value,
    });
  };
  //email change handler to update state variable with the text entered by the user
  countryChangeHandler = (e) => {
    this.setState({
      country: e.target.value,
    });
  };
  //username change handler to update state variable with the text entered by the user
  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  //username change handler to update state variable with the text entered by the user
  birthdayChangeHandler = (e) => {
    this.setState({
      birthday: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("about", this.state.about);
    formData.append("phone", this.state.phone);
    formData.append("address", this.state.address);
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("birthday", this.state.birthday);
    formData.append("username", localStorage.getItem("email"));
    //set the with credentials to true
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    //make a post request with the user data
    axios
      .post("http://localhost:3001/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
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
    //if user not logged in redirect user to log in page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    //If password and username do not match display error
    let { authFlag } = this.state;
    let message;
    if (!authFlag) {
      message = (
        <div>
          <p>Success: Profile has been Updated!</p>
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
                <h1>Profile Page</h1>
                <h3>Update your profile information</h3>
                <p>Only fill in the fields that you want to be updated</p>
              </div>
              {message}
              <div class="form-group">
                <input
                  onChange={this.imageChangeHandler}
                  type="file"
                  class="form-control"
                  multiple={false}
                  name="image"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.nameChangeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Full Name"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.birthdayChangeHandler}
                  type="text"
                  class="form-control"
                  name="birthday"
                  placeholder="Birthday"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.emailChangeHandler}
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.phoneChangeHandler}
                  type="text"
                  class="form-control"
                  name="phone"
                  placeholder="Phone Number"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.addressChangeHandler}
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.cityChangeHandler}
                  type="text"
                  class="form-control"
                  name="city"
                  placeholder="City"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.countryChangeHandler}
                  type="text"
                  class="form-control"
                  name="country"
                  placeholder="Country"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.aboutChangeHandler}
                  type="text"
                  class="form-control"
                  name="about"
                  placeholder="About"
                />
              </div>
              <button onClick={this.submitLogin} class="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Profile;
