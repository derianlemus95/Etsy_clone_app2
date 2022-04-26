import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
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
    const columns = [
      {
        name: "Order ID",
        selector: (row) => row._id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Image",
        selector: (row) => row.image,
        sortable: false,
      },
      {
        name: "Gift Description",
        selector: (row) => row.giftDesc,
        sortable: false,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
        sortable: true,
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
      },
    ];
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
          <h1>Past Orders</h1>
          <DataTable
            pagination
            columns={columns}
            data={this.state.items}
            paginationRowsPerPageOptions={[2, 5, 10]}
          />
        </div>
      </div>
    );
  }
}
//export Home Component
export default Purchases;
