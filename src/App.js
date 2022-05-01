import React, { useState, useEffect } from "react";
import "./App.css";
import {authService} from "./components/fbase";
import AppRouter from "./components/AppRouter";

function App() {
  console.log(authService);
  // State to save if user is logged in;
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);

  const ChangeToLog = () => {
    setLoggedIn(true);
  }
  return (
    <div className="App">
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
