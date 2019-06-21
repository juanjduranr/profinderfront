import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Company from "./components/company";
import Companies from "./components/companies";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/companies/:id" component={Company} />
          <Route path="/companies" component={Companies} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
