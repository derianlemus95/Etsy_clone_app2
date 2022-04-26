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
      messages: "",
      quantity: 1,
      newquantity: 1,
      username: localStorage.getItem("email"),
      authFlag: false,
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.quantityHandler = this.quantityHandler.bind(this);
  }
  //username change handler to update state variable with the text entered by the user
  messageHandler = (e) => {
    this.setState({
      messages: e.target.value,
    });
  };
  quantityHandler = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };
  submitGift = (e) => {
    //e.preventDefault();
    const data = {
      id: e.target.value,
      username: localStorage.getItem("email"),
      messages: this.state.messages,
    };
    //make a post request with the user data
    axios.post("http://localhost:3001/shop/addMessage", data).then((res) => {
      if (res.data === "SUCCESS") {
        console.log("added descriptoin");
      } else {
        console.log("falied to add descriptoin");
      }
    });
  };

  submitDelete = (e) => {
    //e.preventDefault();
    const data = {
      id: e.target.value,
      username: localStorage.getItem("email"),
    };
    //make a post request with the user data
    axios.post("http://localhost:3001/shop/deleteItem", data).then((res) => {
      if (res.data === "SUCCESS") {
        console.log("added descriptoin");
      } else {
        console.log("falied to add descriptoin");
      }
    });
  };

  submitQuantity = (e) => {
    //e.preventDefault();
    const data = {
      id: e.target.value,
      username: localStorage.getItem("email"),
      quantity: this.state.quantity,
    };
    //make a post request with the user data
    axios
      .post("http://localhost:3001/shop/updateQuantity", data)
      .then((res) => {
        if (res.data === "SUCCESS") {
          console.log("updated quantity");
        } else {
          console.log("falied to add quantity");
        }
      });
  };

  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
    };
    axios.post("http://localhost:3001/shop/getCart", data).then((response) => {
      if (response) {
        console.log(response);
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
      message: this.state.messages,
    };
    //make a post request with the user data
    axios.post("http://localhost:3001/shop/purchase", data).then((res) => {
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
            <Button
              value={item.name}
              onClick={this.submitDelete}
              class="btn btn-primary"
            >
              Remove
            </Button>
          </td>
          <td>
            {item.image && (
              <img src={"http://localhost:3000/" + item.image} alt="img" />
            )}
          </td>
          <td>{item.name}</td>
          <td>
            <input
              onChange={this.quantityHandler}
              type="number"
              class="form-control"
              name="quantity"
              placeholder={item.quantity}
            />
            <Button
              value={item.name}
              onClick={this.submitQuantity}
              class="btn btn-primary"
            >
              Update
            </Button>
          </td>
          <td>${item.price}</td>
          <td>
            <Button
              value={item.name}
              onClick={this.submitGift}
              class="btn btn-primary"
            >
              Make Gift
            </Button>
          </td>
          <td>
            <input
              onChange={this.messageHandler}
              type="text"
              class="form-control"
              name="message"
              placeholder="Write a Message Here..."
            />
          </td>
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
                <th>Remove Item</th>
                <th>Item</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Is Gift</th>
                <th>Message</th>
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
