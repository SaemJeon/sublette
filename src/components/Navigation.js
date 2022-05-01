import React from "react";
import { Link } from "react-router-dom";
import LogOut from "../components/LogOut.js";

function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/add_listing">Add Listing</Link>
        </li>
        <li>
          <LogOut />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
