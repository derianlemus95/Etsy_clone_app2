import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
class Shop extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      shop: [],
      owner: false,
      added: false,
      edited: false,
      itemname: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      photo: "",
    };
    //Bind the handlers to this class
    this.itemnamehandler = this.itemnamehandler.bind(this);
    this.categoryhandler = this.categoryhandler.bind(this);
    this.descriptionhandler = this.descriptionhandler.bind(this);
    this.quantityhandler = this.quantityhandler.bind(this);
    this.pricehandler = this.pricehandler.bind(this);
    this.photohandler = this.photohandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //iten name change handler
  itemnamehandler = (e) => {
    this.setState({
      itemname: e.target.value,
    });
  };
  //category change handler
  categoryhandler = (e) => {
    this.setState({
      category: e.target.value,
    });
  };
  //description change handler
  descriptionhandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  //quantity change handler
  quantityhandler = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };
  //price change handler
  pricehandler = (e) => {
    this.setState({
      price: e.target.value,
    });
  };
  //photo change handler
  photohandler = (e) => {
    this.setState({
      photo: e.target.value,
    });
  };
  imageHandler = (event) => {
    this.setState({
      photo: event.target.files[0],
    });
  };
  imageHandler2 = (event) => {
    const file = event.target.files[0];
    const username = localStorage.getItem("email"); // {  username:"adfafsd"}// cookie.load('cookie')}
    const shop = cookie.load("shopname");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);
    formData.append("shopname", shop);
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    axios
      .post("http://localhost:3001/shop/shopImageUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("IMAGE UPDATED");
        } else {
          console.log("IMAGE FAILED TO BE UPDATED");
        }
      });
  };
  handleClickFavorites(e) {
    //e.stopPropagation();
    // access to e.target here
    console.log(e.target.value);

    const data = {
      username: localStorage.getItem("email"),
      itemname: e.target.value,
    };
    axios.post("http://localhost:3001/addfavorites", data).then((response) => {
      if (response.status === 200) {
        console.log("passed favorites");
      } else if (response.status === 201) {
        console.log("INVALID DATA  favorites");
      }
    });
  }
  //add item
  submitLogin1 = (e) => {
    e.preventDefault();
    const data = {
      username: localStorage.getItem("email"),
      itemname: this.state.itemname,
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      photo: this.state.photo,
    };

    const file = this.state.photo;
    // const data = cookie.load('cookie')// {  username:"adfafsd"}// cookie.load('cookie')}

    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", localStorage.getItem("email"));
    formData.append("itemname", this.state.itemname);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity);
    console.log("File");
    console.log(data);
    console.log("File");
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    axios
      .post("http://localhost:3001/editItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Status Code Register : ", response.status);
        if (response.status === 200) {
          this.setState({
            edited: true,
          });
        } else if (response.status === 201) {
          this.setState({
            successflag: false,
            duplicateid: true,
          });
        }
      });
  };
  //add item
  submitLogin = (e) => {
    e.preventDefault();
    const data = {
      username: localStorage.getItem("email"),
      itemname: this.state.itemname,
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      photo: this.state.photo,
    };

    const file = this.state.photo;
    // const data = cookie.load('cookie')// {  username:"adfafsd"}// cookie.load('cookie')}

    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", localStorage.getItem("email"));
    formData.append("itemname", this.state.itemname);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity);

    //send data to backend
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    axios
      .post("http://localhost:3001/shop/addItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            added: true,
          });
        } else if (response.status === 201) {
          this.setState({
            successflag: false,
            duplicateid: true,
          });
        }
      });
  };
  //get the books data from backend
  componentDidMount() {
    const data = {
      username: localStorage.getItem("email"),
      shopname: cookie.load("shopname"),
      owner: false,
    };
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    axios
      .post("http://localhost:3001/shop/getShopData", data)
      .then((response) => {
        if (response) {
          this.setState({
            items: response.data[0],
            shop: response.data[1],
            owner: response.data[2],
          });
        } else {
          console.log("ERROR");
        }
      });
  }

  render() {
    let editowner = null;
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
          <td>${item.price}</td>
          <td>{item.salesCount}</td>
          <td>{editowner}</td>
        </tr>
      );
    });
    let shops = this.state.shop.map((shop) => {
      return (
        <div class="container">
          <h1>{shop.shopname}</h1>
          <figure>
            {shop.shopimage && (
              <img src={"http://localhost:3000/" + shop.shopimage} alt="img" />
            )}
          </figure>
          <p>About the seller: {shop.about}</p>
          <p>Email: {shop.email}</p>
          <p>
            Seller Is From: {shop.city}, {shop.country}
          </p>
        </div>
      );
    });

    let { owner } = this.state;

    let shopowner = null;
    let sales = null;
    let additem = null;
    let modalval = null;
    let { edited } = this.state;
    let editsuccess = null;
    let { added } = this.state;
    let addsuccess = null;
    if (added) {
      addsuccess = (
        <div>
          <span className="errorClass" style={{ color: "blue" }}>
            Succesfully added Item!
          </span>
        </div>
      );
    }
    if (edited) {
      editsuccess = (
        <div>
          <span className="errorClass" style={{ color: "blue" }}>
            Succesfully Edited Item!
          </span>
        </div>
      );
    }
    let ownerFlag;
    console.log(owner);
    if (owner) {
      ownerFlag = (
        <div class="container">
          <h1>Welcome back owner</h1>
        </div>
      );
      editowner = (
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Edit item
        </button>
      );
      shopowner = (
        <div>
          <label class="form-label" for="customFile">
            Change Shop Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple={false}
            onChange={this.imageHandler2}
          />
        </div>
      );
      sales = (
        <div>
          <Form class="form-control">
            <label>
              Item Name:{" "}
              <input
                onChange={this.itemnamehandler}
                type="text"
                class="form-control"
                name="idnum"
                placeholder=""
              />
            </label>

            <label>
              Category:{" "}
              <input
                onChange={this.categoryhandler}
                type="text"
                class="form-control"
                name="idnum"
                placeholder=""
              />
            </label>

            <label>
              Description:{" "}
              <input
                onChange={this.descriptionhandler}
                type="text"
                class="form-control"
                name="idnum"
                placeholder=""
              />
            </label>

            <label>
              Price:{" "}
              <input
                onChange={this.pricehandler}
                type="text"
                class="form-control"
                name="booktitle"
                placeholder=""
              />
            </label>

            <label>
              Quantity:
              <input
                onChange={this.quantityhandler}
                type="text"
                class="form-control"
                name="bookauthor"
                placeholder=""
              />
            </label>
            <label>
              Photo of Item:
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
                onChange={this.imageHandler}
              />
            </label>
            <Button
              onClick={this.submitLogin}
              type="button"
              class="btn btn-primary"
            >
              Add item
            </Button>
            <Button
              onClick={this.submitLogin1}
              type="button"
              class="btn btn-primary"
            >
              Edit item
            </Button>
            {addsuccess}
            {editsuccess}
          </Form>
        </div>
      );
      additem = (
        <div>
          <Button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add item
          </Button>
        </div>
      );

      modalval = (
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div style={{ width: "100%" }} class="form-group">
                  <div class="col col-lg-3">
                    <label>
                      New Item Name:
                      <input
                        onChange={this.itemnamehandler}
                        type="text"
                        class="form-control"
                        name="idnum"
                        placeholder=""
                      />
                    </label>
                    <br />
                    <label>
                      Category:{" "}
                      <input
                        onChange={this.categoryhandler}
                        type="text"
                        class="form-control"
                        name="idnum"
                        placeholder=""
                      />
                    </label>
                    <br />
                    <label>
                      Description:{" "}
                      <input
                        onChange={this.descriptionhandler}
                        type="text"
                        class="form-control"
                        name="idnum"
                        placeholder=""
                      />
                    </label>
                    <br />
                    <label>
                      Price:{" "}
                      <input
                        onChange={this.pricehandler}
                        type="text"
                        class="form-control"
                        name="booktitle"
                        placeholder=""
                      />
                    </label>
                    <br />
                    <label>
                      Quantity:
                      <input
                        onChange={this.quantityhandler}
                        type="text"
                        class="form-control"
                        name="bookauthor"
                        placeholder=""
                      />
                    </label>
                  </div>

                  <label>
                    Item Image:{" "}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      multiple={false}
                      onChange={this.imageHandler}
                    />
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={this.submitLogin}
                  type="button"
                  class="btn btn-primary"
                >
                  Save Item
                </button>
              </div>
              {addsuccess}
            </div>
          </div>
        </div>
      );
    }
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}

        <div class="container">
          {shops}
          {shopowner}
          {sales}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Sales Count</th>
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
export default Shop;
