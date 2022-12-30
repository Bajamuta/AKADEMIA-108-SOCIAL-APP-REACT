import React from "react";
import axios, {AxiosResponse} from "axios";
import {REACT_APP_API_URL} from "../react-app-env.d";
import {ObjectContext} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

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
        axios.post(`${REACT_APP_API_URL}/user/signup`, {
            username: data.username,
            password: data.password,
            email: data.email
        }).then((response: AxiosResponse<any>) => {
            if (response.status === 200) {
                navigate('/registered');
            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));
    }

    /*const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${REACT_APP_API_URL}/user/signup`, {
            username: formData.username,
            password: formData.password,
            email: formData.email
        }).then((response: AxiosResponse<any>) => {
            if (response.status === 200) {
                navigate('/registered');
            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));
    }*/


    const passwordMatches = () => {
        return watch().password?.trim().length > 0
            && watch().password === watch().passwordConfirm;
    }

    return (<div className="FormContainer">
        <h2>Sign Up</h2>
        <form name="signupForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
            <label >Username*:</label>
            <input type="text"
                   placeholder="Enter username"
                   {...register("username", { required: true, minLength: 3 })} />
            {errors.username && <span className="ValidationMessage">{errors.username?.message}</span>}
            <label >E-mail*:</label>
            <input type="email" placeholder="Enter e-mail"
                   {...register("email", { required: true, pattern: /^\/w+@\/w+.\/w{2}$/ })}/>
            {errors.email && <span className="ValidationMessage">{errors.email?.message}</span>}
            <label>Password*:</label>
            <input type="password" placeholder="Enter password"
                   {...register("password", { required: true, pattern: /^\/w+$/ })}/>
            {errors.password && <span className="ValidationMessage">{errors.password?.message}</span>}
            <label>Confirm Password*:</label>
            <input type="password" placeholder="Enter password to confirm"
                   {...register("passwordConfirm", { required: true, pattern: /^\/w+$/ })}/>
            {errors.passwordConfirm && <span className="ValidationMessage">{errors.passwordConfirm?.message}</span>}
            <button className={passwordMatches() ? 'Button PrimaryButton' : 'Button DisabledButton'}
                    disabled={!passwordMatches()}
                    type="submit">Sign Up</button>
        </form>
    </div>);
}
