import React from 'react'
import Home from '../pages/Home.js';
import Auth from '../pages/Auth.js';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function AppRouter({ isLoggedIn }) {
  return (
    <div>
        <Router>
            <Routes>
                {isLoggedIn ?
                <Route exact path='/' element={<Home/>}>
                </Route> 
                : <Route exact path='/' element={<Auth/>}>
                </Route>
                }
            </Routes>
        </Router>
    </div>
  )
}

export default AppRouter