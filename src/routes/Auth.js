import React from 'react'
import { useState } from 'react';
import { authService } from '../fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
  // Email
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [errorBool, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  async function clickedSubmit(event) {
    event.preventDefault();
    // Create Account if account is new:
    try {
      let data;
        if (newAccount) {
          data = await createUserWithEmailAndPassword(authService, email, passwd);
        }
        else {
          data = await signInWithEmailAndPassword(authService, email, passwd);
        }
        // No error message displayed
        setError(false);
    }
    catch (error) {
      setError(true);
      // error.code in the format of auth/{error name}
      setErrorMsg(error.code.split("/")[1].split("-").join(" "));
    }
  }

  function onChange(event) {
    const {target : {name, value}} = event;
    if (name === "email") {
      setEmail(value);
    }
    else if (name === "passwd") {
      setPasswd(value);
    }
  }

  function toggleAccount() {
    setnewAccount((prev) => !prev);
  }

  // Authenticate with Google
  async function authWithGoogle() {
    let provider;
    try {
      provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authService, provider);
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    }
    catch(error) {
      console.log(error);
    }
}

  return (
    <div>
      <form onSubmit={clickedSubmit}>
        <input name="email" type="text" placeholder='Enter your email' required value={email} onChange={onChange} />
        <input name="passwd" type="password" placeholder='Password' required value={passwd} onChange={onChange}/>
        <input type="submit" value = {newAccount? "Create Account" : "Sign In"}/> 
      </form>
      <div>
        <button onClick={authWithGoogle}>Continue with Google</button>
      </div>
      <div>
        <button onClick={toggleAccount}>{newAccount ? "Have an account?" : "First time user?"}</button>
      </div>
      {errorBool ? <div>{errorMsg}</div> : <></>}
    </div>
    
  )
}

export default Auth