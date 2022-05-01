import React from 'react'
import {authService} from '../fbase';
import {useNavigate} from 'react-router-dom';

function LogOut() {
    const navigate = useNavigate();

    function logOutOnClick() {
        authService.signOut();
        navigate("/");
    }
  return (
    <div onClick={logOutOnClick}>Log Out</div>
  )
}

export default LogOut