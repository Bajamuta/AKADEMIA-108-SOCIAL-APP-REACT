import React, {useEffect} from "react";
import {ObjectContext} from "../interfaces";
import {useOutletContext} from "react-router-dom";
import "./SignOut.css";

export default function SignOut() {

    const obj: ObjectContext = useOutletContext();

    useEffect(() => {
        localStorage.setItem("loggedUser", '');
        obj.setLoggedUser({jwt_token: ''});
    }, [])

    return <div className="Container">
        <h2>Sign Out</h2>
        <p>You have been successfully signed out.</p>
    </div>
}
