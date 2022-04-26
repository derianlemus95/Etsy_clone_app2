import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  //get the books data from backend
  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
    };
    axios
      .post("http://localhost:3001/favorite/getMyFavorites", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            items: this.state.items.concat(response.data),
          });
          console.log(response);
        } else if (response.status === 201) {
          console.log("ERROR with Favorites");
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
          <td>${item.price}</td>
          <td>{item.description}</td>
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
          <Button href="/profile">Edit Profile</Button>
          <h1>My Favorite Items...</h1>
          <div style={{ width: "100%" }} class="form-group">
            <input
              onChange={this.termChangeHandler}
              type="text"
              class="form-control"
              name="term"
              placeholder="Search your Favorites..."
            />
          </div>
          <div style={{ width: "10%" }}>
            <Button class="btn btn-success" type="submit">
              Search
            </Button>
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Item</th>
                <th>Price(USD)</th>
                <th>Description</th>
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
export default Favorites;
