import React, {FormEvent, useState} from "react";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(username, password);
    }

    return <div className="LoginFormContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
            <label form={username}>Username*:</label>
            <input type="text"
                   placeholder="Enter username"
                   value={username} onChange={(e) => setUserName(e.target.value)}/>
            <label form={password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    </div>;
}
