import React from "react";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/ResiterPage/RegisterPage";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
