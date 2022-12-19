import React, {FormEvent, useState} from "react";
import './Login.css';
import {FormDataLogin, ResponseLogin, User} from "../interfaces";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "../index";
import {setLoggedUser} from "./App";
import {Form, redirect} from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    });

/*    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${API_URL}/user/login`, {
            username: formData.username,
            password: formData.password
        }).then((response: AxiosResponse<any>) => {
            console.log('response', response.data as ResponseLogin);
        })
            .catch((error) => console.error("An error has occurred during logging in:", error));
    }*/

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
        <Form className="LoginForm" method="post">
            <label form={formData.username}>Username*:</label>
            <input type="text"
                   name="username"
                   placeholder="Enter username"
                   onChange={handleInputChange}/>
            <label form={formData.password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   name="password" onChange={handleInputChange}/>
            <button type="submit" className="LoginFormButton">Login</button>
        </Form>
    </div>;
}

export async function loggingAction(request: FormDataLogin) {

    axios.post(`${API_URL}/user/login`, {
        request
    }).then((response: AxiosResponse<any>) => {
        console.log('response', response.data as ResponseLogin);
        const loggedUser = response.data as ResponseLogin;
        setLoggedUser(loggedUser);
        return redirect('/home');
    })
        .catch((error) => console.error("An error has occurred during logging in:", error));
}
