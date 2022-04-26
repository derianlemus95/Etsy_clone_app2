import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
class Purchases extends Component {
  constructor() {
    super();
    this.state = {
      total: [],
      items: [],
      username: localStorage.getItem("email"),
    };
  }

  handleSubmit(e) {}

  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
    };
    axios
      .post("http://localhost:3001/shop/purchaseHistory", data)
      .then((response) => {
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
  render() {
    //iterate over books to create a table row
    let details = this.state.items.map((item) => {
      return (
        <tr>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>
            {item.image && (
              <img src={"http://localhost:3000/" + item.image} alt="img" />
            )}
          </td>
          <td>{item.giftDesc}</td>
          <td>{item.quantity}</td>
          <td>@ ${item.price} each</td>
        </tr>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <h2>Purchase History</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Gift Description</th>
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
      </div>
    );
  }
}
//export Home Component
export default Purchases;
