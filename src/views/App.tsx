import React, {useState} from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";
import * as localforage from "localforage";
import {ResponseLogin, User} from "../interfaces";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Social App</h1>
      </header>
        <nav className="AppNavbar">
            <ul>
                <li>
                    <Link to={"/home"}>HOME</Link>
                </li>
                <li>
                    <Link to={"/login"}>LOG IN</Link>
                </li>
                <li>
                    <Link to={"/signup"}>SIGN UP</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
  );
}

export default App;

export async function setLoggedUser(user: ResponseLogin) {
    await localforage.setItem("loggedUser", user);
    return user;
}

export async function getLoggedUser() {
    let loggedUser = await localforage.getItem("loggedUser");
    return loggedUser ?? null;
}

export async function removeLoggedUser() {
    let loggedUser = await localforage.getItem("loggedUser");
    if (loggedUser)
    {
        await localforage.setItem("loggedUser", null);
        return true;
    }
    return false;
}
