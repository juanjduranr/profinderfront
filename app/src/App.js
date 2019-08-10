import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Company from "./components/company";
import Companies from "./components/companies";
import NotFound from "./components/notFound";
import Home from "./components/home";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <ToastContainer />
        <Switch>
          <Route path="/companies/:id" component={Company} />
          <Route path="/companies" component={Companies} />
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

export default App;
