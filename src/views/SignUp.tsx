import React, {FormEvent, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {REACT_APP_API_URL} from "../react-app-env.d";
import {FormDataRegister, ObjectContext} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";

export default function SignUp() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataRegister>({
        username: {
            value: "", isValid: true, error: "test"
        },
        email: {
            value: "", isValid: true, error: ""
        },
        password: {
            value: "", isValid: true, error: ""
        },
        passwordConfirm: {
            value: "", isValid: true, error: ""
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${REACT_APP_API_URL}/user/signup`, {
            username: formData.username,
            password: formData.password,
            email: formData.email
        }).then((response: AxiosResponse<any>) => {
            if (response.status === 200)
            {
                navigate('/registered');
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("change input", e);
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: {
                value: target.value,
                valid: target.validity.valid,
                error: "test"
            }
        });
    }

    const passwordMatches = () => {
        return formData.password.value.trim().length > 0
            && formData.password.value === formData.passwordConfirm.value;
    }

    return (<div className="FormContainer">
        <h2>Sign Up</h2>
        <form name="signupForm" className="FormBody" onSubmit={(e) => handleSubmit(e)}>
            <label form={formData.username.value}>Username*:</label>
            <input type="text"
                   name="username"
                   placeholder="Enter username"
                   minLength={3}
                   onChange={handleInputChange}/>
            {!formData.username.isValid &&
                <span className="ValidationMessage">
                    {formData.username.error}
                </span>}
            <label form={formData.email.value}>E-mail*:</label>
            <input type="email" placeholder="Enter e-mail"
                   name="email"
                   onChange={handleInputChange}/>
            <label form={formData.password.value}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   name="password" onChange={handleInputChange}/>
            <label form={formData.passwordConfirm.value}>Confirm Password*:</label>
            <input type="password" placeholder="Enter password to confirm"
                   name="passwordConfirm" onChange={handleInputChange}/>
            <button className={passwordMatches() ? 'Button PrimaryButton' : 'Button DisabledButton'}
                    disabled={!passwordMatches()}
                    type="submit">Sign Up</button>
        </form>
    </div>);
}
