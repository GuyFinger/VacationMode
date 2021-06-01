import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './COMP/Login'
import Signup from './COMP/Signup'
import Main from './COMP/Main'
import Navbar from './COMP/Navbar'
import Reports from './COMP/Reports'
import Add from './COMP/Add'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



import './App.css';


function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {

      const ls = localStorage.getItem('userType')
      const parsedLs = JSON.parse(ls)
      dispatch({ type: "LOGGED_IN", payload: parsedLs })
    })()
  }, [])

  const ls = localStorage.getItem('userType')
  const parsedLs = JSON.parse(ls)





  return (
    <Router>
      <div className="App">
        {parsedLs !== null ? <Navbar /> : ''}

        <Route path='/' exact component={() => parsedLs !== null ? <Main /> : <Redirect to='/login' />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/reports' component={() => parsedLs == 'admin' ? <Reports  /> : <Redirect to='/' exact />} />
        <Route path="/add" component={() => parsedLs == 'admin' ? <Add /> : <Redirect to='/' exact />} />

      </div>
    </Router>
  );
}

export default App;
