import React, {FormEvent, useState} from "react";
import './Login.css';
import {FormDataLogin, ResponseLogin} from "../interfaces";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "../index";

export default function Login() {
    const [formData, setFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${API_URL}/login`, {
            username: formData.username,
            password: formData.password
        }).then((response: AxiosResponse<ResponseLogin>) => {
            console.log('response', response);
        })
            .catch((error) => console.error("An error has occured during logging in:", error));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        });
    }
    console.log(formData);
    return <div className="LoginFormContainer">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="LoginForm">
            <label form={formData.username}>Username*:</label>
            <input type="text"
                   name="username"
                   placeholder="Enter username"
                   onChange={handleInputChange}/>
            <label form={formData.password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   name="password" onChange={handleInputChange}/>
            <button type="submit" className="LoginFormButton">Login</button>
        </form>
    </div>;
}
