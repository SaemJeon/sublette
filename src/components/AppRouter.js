import React from "react";
import Home from "../routes/Home.js";
import Auth from "../routes/Auth.js";
import {
  HashRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import Navigation from "./Navigation.js";
import Profile from "./Profile.js";
import AddSublet from "../routes/AddSublet.js";

function AppRouter({ isLoggedIn }) {
  return (
    <div>
      <Router>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route exact path="/add_listing" element={<AddSublet />}></Route>
            </>
          ) : (
            <>
              <Route exact path="/" element={<Auth />}></Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
