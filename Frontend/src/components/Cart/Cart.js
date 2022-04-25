import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      total: [],
      items: [],
      username: localStorage.getItem("email"),
      authFlag: false,
    };
  }

  handleSubmit(e) {
    //window.location.href='/purchaseHistory'
  }
  //submit Login handler to send a request to the node backend

  //get the books data from backend
  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
    };
    axios.post("http://localhost:3001/shop/getCart", data).then((response) => {
      if (response) {
        this.setState({
          items: this.state.items.concat(response.data[0]),
          total: this.state.total.concat(response.data[1]),
        });
      } else {
        console.log("Error passing items in cart");
      }
    });
  }
  submitLogin = (e) => {
    e.preventDefault();
    const data = {
      items: this.state.items,
      username: localStorage.getItem("email"),
      total: this.state.total,
    };
    //make a post request with the user data
    axios.post("http://localhost:3001/purchase", data).then((res) => {
      if (res.data === "SUCCESS") {
        this.setState({
          authFlag: true,
        });
      } else {
        this.setState({
          authFlag: false,
        });
      }
    });
  };
  render() {
    //iterate over books to create a table row
    let details = this.state.items.map((item) => {
      return (
        <tr>
          <td>
            {item.image && (
              <img src={"http://localhost:3000/" + item.image} alt="img" />
            )}
          </td>
          <td>{item.name}</td>
          <td>
            <div style={{ width: "15%" }} class="form-check form-check-inline">
              <label class="form-check-label" for="inLineText1">
                qt:
              </label>
              <input
                id="quantity"
                onChange={this.minPriceChangeHandler}
                type="number"
                class="form-control"
                name="quantity"
                placeholder={item.quantity}
              />
            </div>
            {item.quantity} X
          </td>
          <td>${item.price}</td>
        </tr>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    let { authFlag } = this.state;
    let validPurchase = null;
    if (authFlag) {
      validPurchase = <Redirect to="/purchases" />;
    }
    return (
      <div>
        {redirectVar}
        {validPurchase}
        <div class="container">
          <h2>Shopping Cart Page</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
            </tbody>
          </Table>
        </div>
        <div class="container">
          <h3>Total Price: ${this.state.total}</h3>
          <Button onClick={this.submitLogin}>Submit Order</Button>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Cart;
