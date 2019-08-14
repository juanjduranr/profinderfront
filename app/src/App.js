import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Profile from "./components/profile";
import Company from "./components/company";
import ReviewForm from "./components/reviewForm";
import Companies from "./components/companies";
import NotFound from "./components/notFound";
import Home from "./components/home";
import ProtectedRoute from "./components/common/protectedRoute";
import authService from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <ToastContainer />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route
              path="/companies/:id"
              render={props => <Company {...props} user={this.state.user} />}
            />
            <Route path="/companies" component={Companies} />
            <ProtectedRoute path="/addreview/:id" component={ReviewForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <footer />
      </React.Fragment>
    );
  }
}

export default App;
