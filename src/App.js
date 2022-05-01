import React, { useState, useEffect } from "react";
import "./App.css";
import {authService} from "./fbase";
import AppRouter from "./components/AppRouter";

function App() {
  console.log(authService);
  // State to save if user is logged in;
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if (user) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
      setInit(true);
    })
  })
  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing"}
    </div>
  );
}

export default App;