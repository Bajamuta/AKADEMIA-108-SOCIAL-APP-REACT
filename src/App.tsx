import React from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Social App</h1>
      </header>
        <nav>
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
