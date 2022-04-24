import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Delete from "./Delete/Delete";
import Create from "./Create/Create";
import Navbar from "./LandingPage/Navbar";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import RegisterShop from "./Shop/RegisterShop";
import Shop from "./Shop/Shop";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Navbar} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/shop" component={Shop} />
        <Route path="/registerShop" component={RegisterShop} />
        <Route path="/home" component={Home} />
        <Route path="/delete" component={Delete} />
        <Route path="/create" component={Create} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
