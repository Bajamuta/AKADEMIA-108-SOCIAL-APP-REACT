import React, {useEffect} from "react";
import {ObjectContext} from "../helpers/interfaces";
import {useOutletContext} from "react-router-dom";
import "./SignOut.css";

export default function SignOut() {

    const objectContext: ObjectContext = useOutletContext();

    useEffect(() => {
        localStorage.removeItem("loggedUser");
        objectContext.setLoggedUser({jwt_token: ''});
        objectContext.setTimeStamp(new Date('1999-01-01'));
        localStorage.removeItem("timeStamp");
    }, []);

    return (<div className="Container">
        <h2>Sign Out</h2>
        <p>You have been successfully signed out.</p>
    </div>);
}
