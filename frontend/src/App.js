import "./App.css";
import Modal from "./components/Modal";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsList: [],
      //controls opening/closing the modal
      modal: false,
      //passing an empty contact
      activeItem: {
        contactName: "",
        email: "",
        phoneNumber: "",
      },
    };
  }
  //fetches contact list when page first renders
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/contacts/")
      .then((res) => this.setState({ contactsList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //sends in an contact to the backend
  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/contacts/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/contacts/", item)
      .then((res) => this.refreshList())
      .catch(function(error) {
        console.log(error.response.data.message);
      });
    alert("save" + JSON.stringify(item));
  };
  
  //sends in axios request to delete item
  handleDelete = (item) => {
    axios
    .delete(`/api/contacts/${item.id}/`)
    .then((res) => this.refreshList())
    .catch(function(error) {
      console.log(error.response.data.message);
    });
  };
  
  createItem = () => {
    const item = { contactName: "", email: "", phoneNumber: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const { contactsList } = this.state;
    return contactsList.map((item) => (
      <tr>
        <th scope="row"> {item.id}</th>
        <th> {item.contactName} </th>
        <th> {item.email} </th>
        <th> {item.phoneNumber}</th>
        <button
          className="btn btn-danger"
          onClick={() => this.handleDelete(item)}
        >
          Delete
        </button>
      </tr>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Contacts List
        </h1>
        <div className="row">
          <div className="col-md-12 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add contact
                </button>
              </div>
              <table class="table table-condensed table-striped  table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number </th>
                    <th scope="col"> Action </th>
                  </tr>
                </thead>
                <tbody>{this.renderItems()}</tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
