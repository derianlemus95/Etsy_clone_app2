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
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import Purchases from "./Purchases/Purchases";
import Favorites from "./Favorites/Favorites";
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
        <Route path="/product" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={Home} />
        <Route path="/purchases" component={Purchases} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/create" component={Create} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
