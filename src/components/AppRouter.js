import React from "react";
import Home from "../routes/Home.js";
import Auth from "../routes/Auth.js";
// import Message from "../routes/Message.js";
import Map from "../routes/Map.js";
// import App from "../routes/Temp.js";

import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navigation from "./Navigation.js";
import Profile from "./Profile.js";
import AddSublet from "../routes/AddSublet.js";
import Loader from "./Loader.js";

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
              <Route exact path="/get_listing" element={<Loader />}></Route>
              {/* <Route exact path="/message" element={<App />}></Route> */}
              <Route exact path="/map" element={<Map />}></Route>
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
