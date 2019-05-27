import React from "react";
import { Route, Switch } from "react-router-dom";
import Companies from "./components/companies";
import NavBar from "./components/navBar";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/companies" component={Companies} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
