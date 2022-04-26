import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../LandingPage/Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      term: "",
      minPrice: 0.0,
      maxPrice: 0.0,
      selectedOption: "price",
      outOfStock: false,
      authFlag: true,
    };
    this.termChangeHandler = this.termChangeHandler.bind(this);
    this.minPriceChangeHandler = this.minPriceChangeHandler.bind(this);
    this.maxPriceChangeHandler = this.maxPriceChangeHandler.bind(this);
    this.selectedOptionChangeHandler =
      this.selectedOptionChangeHandler.bind(this);
    this.outOfStockOptionChangeHandler =
      this.outOfStockOptionChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleAddToFavorites(e) {
    const data = {
      username: localStorage.getItem("email"),
      id: e.target.value,
    };
    axios
      .post("http://localhost:3001/favorite/addToFavorites", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("SUCCESS");
        } else if (response.status === 201) {
          console.log("ERROR WITH FAVORITES");
        }
      });
  }
  handleItemPage(e) {
    let d = new Date();
    d.setTime(d.getTime() + 25 * 60 * 1000);
    document.cookie = "id" + "=" + e.target.value + "; Path=/;";
    window.location.href = "/product";
  }
  componentWillMount() {
    this.setState({
      authFlag: true,
      products: [],
    });
  }
  //username change handler to update state variable with the text entered by the user
  termChangeHandler = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  //username change handler to update state variable with the text entered by the user
  minPriceChangeHandler = (e) => {
    this.setState({
      minPrice: e.target.value,
    });
  };
  //username change handler to update state variable with the text entered by the user
  maxPriceChangeHandler = (e) => {
    this.setState({
      maxPrice: e.target.value,
    });
  };
  selectedOptionChangeHandler = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };
  outOfStockOptionChangeHandler = (e) => {
    this.setState({
      outOfStock: true,
    });
  };

  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      term: this.state.term,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      selectedOption: this.state.selectedOption,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/shop/getproducts", data).then((res) => {
      if (res) {
        this.setState({
          authFlag: false,
          products: res.data,
        });
      } else {
        this.setState({
          authFlag: true,
        });
      }
    });
  };
  render() {
    //iterate over books to create a table row
    let details = this.state.products.map((product) => {
      return (
        <tr>
          <td>{product.name}</td>
          <td>
            {product.image && (
              <img src={"http://localhost:3000/" + product.image} alt="img" />
            )}
          </td>
          <td>${product.price}</td>
          <td>
            <div style={{ width: "100%" }}>
              <Button
                value={product.name}
                onClick={this.handleAddToFavorites}
                class="btn btn-success"
                type="submit"
              >
                Favorite
              </Button>
            </div>
          </td>
          <td>
            <div style={{ width: "100%" }}>
              <Button
                value={product.name}
                onClick={this.handleItemPage}
                class="btn btn-success"
                type="submit"
              >
                More Details
              </Button>
            </div>
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
          <h2>Welcome to Home Page</h2>
          <br />
          <div style={{ width: "100%" }} class="form-group">
            <input
              onChange={this.termChangeHandler}
              type="text"
              class="form-control"
              name="term"
              placeholder="Search..."
            />
          </div>
          <div style={{ width: "100%" }}>
            <Button
              onClick={this.submitLogin}
              class="btn btn-success"
              type="submit"
            >
              Search
            </Button>
          </div>
          <br />
          <div style={{ width: "15%" }} class="form-check form-check-inline">
            <label class="form-check-label" for="inLineText1">
              Minimum Price:
            </label>
            <input
              id="inLineText1"
              onChange={this.minPriceChangeHandler}
              type="number"
              class="form-control"
              name="minPrice"
            />
          </div>
          <div style={{ width: "15%" }} class="form-check form-check-inline">
            <label class="form-check-label" for="inLineText2">
              Maximum Price:
            </label>
            <input
              id="inLineText2"
              onChange={this.maxPriceChangeHandler}
              type="number"
              class="form-control"
              name="maxPrice"
            />
          </div>
          <p>Filter Products: </p>
          <div class="form-check form-check-inline">
            <input
              id="inLineRadio1"
              type="radio"
              name="sortType"
              value="price"
              checked={this.state.selectedOption === "price"}
              onChange={this.selectedOptionChangeHandler}
              class="form-check-input"
            />
            <label class="form-check-label" for="inLineRadio1">
              Price: Low to High
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inLineRadio2"
              type="radio"
              name="sortType"
              value="quantity"
              checked={this.state.selectedOption === "quantity"}
              onChange={this.selectedOptionChangeHandler}
              class="form-check-input"
            />
            <label class="form-check-label" for="inLineRadio2">
              Quantity: Low to High
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inLineRadio3"
              type="radio"
              name="sortType"
              value="salesCount"
              checked={this.state.selectedOption === "salesCount"}
              onChange={this.selectedOptionChangeHandler}
              class="form-check-input"
            />
            <label class="form-check-label" for="inLineRadio3">
              {" "}
              Sales Count: Low to High
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inLineRadio4"
              type="checkbox"
              name="outOfStock"
              checked={this.state.outOfStock}
              onChange={this.outOfStockOptionChangeHandler}
              class="form-check-input"
            />
            <label class="form-check-label" for="inLineRadio4">
              Exclude Out of Stock{" "}
            </label>
          </div>

          <br />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price(USD)</th>
                <th>Add to Favorites</th>
                <th>More Details</th>
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
export default Home;
