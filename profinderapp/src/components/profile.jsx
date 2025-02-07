import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import authService from "../services/authService";
import { toast } from "react-toastify";
import ModalMessage from "./common/modalMessage";

class Profile extends Form {
  state = {
    data: { name: "", lastName: "", email: "" },
    showModal: false,
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    lastName: Joi.string()
      .required()
      .label("Last name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  async componentDidMount() {
    try {
      const { data } = await userService.getProfile(authService.getJwt());
      this.setState({
        data: { name: data.name, lastName: data.lastName, email: data.email }
      });
    } catch (ex) {
      if (ex && ex.message === "tokenExpiredException") {
        this.handleOpen();
      }
    }
  }

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.props.history.push("/logout");
  };

  doSubmit = async () => {
    try {
      const { id: currentUserId } = authService.getCurrentUser();
      const profile = { ...this.state.data, externalId: currentUserId };
      await userService.updateProfile(authService.getJwt(), profile);
      toast.success("Profile successfully updated.");
    } catch (ex) {
      if (ex && ex.message === "tokenExpiredException") {
        this.handleOpen();
      }
      if (ex.response && ex.response.status === 400) {
        toast.error("An error has ocurred.");
      }
    }
  };

  render() {
    return (
      <div className="col-5">
        <h1>Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("lastName", "Last name")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Save")}
        </form>
        <ModalMessage
          message="Session has expired"
          showModal={this.state.showModal}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Profile;
