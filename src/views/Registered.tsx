import React from "react";
import {useNavigate} from "react-router-dom";

export default function Registered() {

    const navigate = useNavigate();

    return (<div className="Container">
        <h2>Registered</h2>
        <p>You have been successfully registered!</p>
        <button className="Button PrimaryButton"
                onClick={() => navigate("/login")}>
            Go to login page
        </button>
    </div>);
}
