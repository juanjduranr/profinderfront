import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import authService from "../services/authService";
import { toast } from "react-toastify";

class Profile extends Form {
  state = {
    data: { name: "", lastName: "", email: "" },
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
        alert("Session has expired.");
        this.props.history.push("/logout");
      }
    }
  }

  doSubmit = async () => {
    try {
      const { id: currentUserId } = authService.getCurrentUser();
      const { data } = this.state;
      const profile = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        externalId: currentUserId
      };
      await userService.updateProfile(authService.getJwt(), profile);
      toast.success("Profile successfully updated.");
    } catch (ex) {
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
      </div>
    );
  }
}

export default Profile;
