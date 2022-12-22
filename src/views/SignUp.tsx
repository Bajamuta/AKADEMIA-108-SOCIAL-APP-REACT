import React, {FormEvent, useState} from "react";

export default function SignUp() {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(username, email, password);
    }

    return (<div className="RegisterFormContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
            <label form={username}>Username*:</label>
            <input type="text"
                   placeholder="Enter username"
                   value={username} onChange={(e) => setUserName(e.target.value)}/>
            <label form={email}>E-mail*:</label>
            <input type="email" placeholder="Enter e-mail"
                   value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label form={password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label form={passwordConfirm}>Confirm Password*:</label>
            <input type="password" placeholder="Enter password to confirm"
                   value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            <button type="submit">Sign Up</button>
        </form>
    </div>);
}
