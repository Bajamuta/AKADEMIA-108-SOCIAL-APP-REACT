import React from "react";
import axios, {AxiosResponse} from "axios";
import {REACT_APP_API_URL} from "../react-app-env.d";
import {ObjectContext} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import "./SignUp.css";

type Inputs = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
};

export default function SignUp() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (Object.entries(errors).length === 0)
        {
            axios.post(`${REACT_APP_API_URL}/user/signup`, {
                username: data.username,
                password: data.password,
                email: data.email
            }).then((response: AxiosResponse<any>) => {
                if (response.status === 201) {
                    navigate('/registered');
                }
                else {
                    console.log(response);
                }
            })
                .catch((error) => console.error("An error has occurred during registering an user:", error));
        }
    }

    return (<div className="FormContainer">
        <h2>Sign Up</h2>
        <form name="signupForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
            <label className={errors.username ? "Invalid" : "Valid"} >Username*:</label>
            <input type="text"
                   className={errors.username ? "Invalid" : "Valid"}
                   aria-invalid={errors.username ? "true" : "false"}
                   placeholder="Enter username"
                   {...register("username",
                       { required: "This field is required",
                           minLength: {value: 3, message: "Requires minimum 3 symbols"} })}
            />
            {errors.username && <p className="ValidationMessage">{errors.username?.message}</p>}
            <label className={errors.email ? "Invalid" : "Valid"} >E-mail*:</label>
            <input type="email" placeholder="Enter e-mail"
                   className={errors.email ? "Invalid" : "Valid"}
                   aria-invalid={errors.email ? "true" : "false"}
                   {...register("email", { required: "This field is required",
                       pattern: {value: /^\w+@\w+.\w{2}$/, message: "Invalid e-mail"} })}/>
            {errors.email && <p className="ValidationMessage">{errors.email?.message}</p>}
            <label className={errors.password ? "Invalid" : "Valid"}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   className={errors.password ? "Invalid" : "Valid"}
                   aria-invalid={errors.password ? "true" : "false"}
                   {...register("password", { required: "This field is required",
                       pattern: {value: /^\w+$/, message: "Password should contain only letters and numbers"},
                       minLength: {value: 8, message: "Requires minimum 8 symbols"}})}/>
            {errors.password && <p className="ValidationMessage">{errors.password?.message}</p>}
            <label className={errors.passwordConfirm ? "Invalid" : "Valid"}>Confirm Password*:</label>
            <input type="password" placeholder="Enter password to confirm"
                   className={errors.passwordConfirm ? "Invalid" : "Valid"}
                   aria-invalid={errors.passwordConfirm ? "true" : "false"}
                   {...register("passwordConfirm",
                       { required: "This field is required",
                           pattern: {value: /^\w+$/, message: "Password should contain only letters and numbers"},
                           minLength: {value: 8, message: "Requires minimum 8 symbols"},
                       validate: {match: (value) => {return watch().password === value ? undefined : "Passwords do not match";}}}
                   )}/>
            {errors.passwordConfirm && <p className="ValidationMessage">{errors.passwordConfirm?.message}</p>}
            <button className="Button PrimaryButton"
                        type="submit">Sign Up</button>
        </form>
    </div>);
}
