import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  handleAddToFavorites(e) {
    const data = {
      username: localStorage.getItem("email"),
      id: e.target.value,
    };
    axios
      .post("http://localhost:3001/addToFavorites", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("SUCCESS");
        } else if (response.status === 201) {
          console.log("ERROR WITH FAVORITES");
        }
      });
  }

  handleshopclick(e) {
    let d = new Date();
    d.setTime(d.getTime() + 25 * 60 * 1000);
    document.cookie = "shopname" + "=" + e.target.value + "; Path=/;";
    window.location.href = "/shop";
    // cookie.set("shopname", e.target.value, {path: "/", expires: d});
  }
  handleAddCart(e) {
    const data = {
      username: localStorage.getItem("email"),
      id: e.target.value,
      quantity: 1,
    };
    axios
      .post("http://localhost:3001/shop/addToCart", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Item Added Succesfully");
        } else if (response.status === 201) {
          console.log("Problem Adding Item");
        }
      });
  }
  //get the books data from backend
  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
      id: cookie.load("id"),
    };
    axios.post("http://localhost:3001/shop/getitem", data).then((response) => {
      if (response.status === 200) {
        this.setState({
          items: this.state.items.concat(response.data),
        });
        console.log("Retrieve Item");
      }
    });
  }

  render() {
    //iterate over books to create a table row
    let details = this.state.items.map((item) => {
      return (
        <tr>
          <td>{item.name}</td>
          <td>
            {item.image && (
              <img src={"http://localhost:3000/" + item.image} alt="img" />
            )}
          </td>
          <td>{item.description}</td>
          <td>{item.salesCount}</td>
          <td>${item.price}</td>
          <td>
            <Button
              value={item.name}
              onClick={this.handleAddCart}
              class="btn btn-success"
              type="submit"
            >
              Add to cart
            </Button>
          </td>
          <td>
            <Button
              value={item.id}
              onClick={this.handleAddToFavorites}
              class="btn btn-success"
              type="submit"
            >
              Favorite
            </Button>
          </td>
          <td>
            <Button
              value={item.shopname}
              onClick={this.handleshopclick}
              class="btn btn-success"
              type="submit"
            >
              Visit {item.shopname}
            </Button>
          </td>
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
          <h2>About the Product</h2>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Sales Count</th>
                <th>Price(USD)</th>
                <th>Add Item to Cart</th>
                <th>Add to Favorites</th>
                <th>Visit Shop</th>
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
export default Product;
