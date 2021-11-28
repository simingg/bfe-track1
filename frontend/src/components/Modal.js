import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Contact</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Contact</Label>
              <Input
                type="text"
                id="todo-title"
                name="contactName"
                value={this.state.activeItem.contactName}
                onChange={this.handleChange}
                placeholder="Enter New Contact"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Email</Label>
              <Input
                type="text"
                id="todo-description"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Phone Number</Label>
              <Input
                type="text"
                id="todo-description"
                name="phoneNumber"
                value={this.state.activeItem.phoneNumber}
                onChange={this.handleChange}
                placeholder="Phone Number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
