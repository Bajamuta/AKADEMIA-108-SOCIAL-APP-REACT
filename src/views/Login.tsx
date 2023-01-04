import React, {FormEvent, useState} from "react";
import './Login.css';
import {FormDataLogin, ObjectContext, ResponseLogin} from "../helpers/interfaces";
import axios, {AxiosResponse} from "axios";
import {useNavigate, useOutletContext} from "react-router-dom";
import {REACT_APP_API_URL} from "../react-app-env.d";

export default function Login() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const errorMessage = "Incorrect username or password";

    const [formData, setFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${REACT_APP_API_URL}/user/login`, {
            username: formData.username,
            password: formData.password
        }).then((response: AxiosResponse<ResponseLogin>) => {
            if (response.status === 200) {
                localStorage.setItem("loggedUser", JSON.stringify(response.data));
                objectContext.setLoggedUser(response.data);
                navigate('/');
            }
            else {
                setShowErrorMessage(true);
            }
        })
            .catch((error) => console.error("An error has occurred during logging in:", error));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        });
        setShowErrorMessage(false);
    }
    return (<div className="FormContainer">
        <h2>Log In</h2>
        <form className="FormBody" onSubmit={handleSubmit}>
            <label form={formData.username}>Username*:</label>
            <input type="text"
                   name="username"
                   placeholder="Enter username"
                   onChange={handleInputChange}/>
            <label form={formData.password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   name="password" onChange={handleInputChange}/>
            <button type="submit" className="Button PrimaryButton">Login</button>
        </form>
        {showErrorMessage && <p className="FontItalic FontRed">{errorMessage}</p>}
    </div>);
}
