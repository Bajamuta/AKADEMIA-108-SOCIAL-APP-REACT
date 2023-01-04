import React from "react";
import {User} from "../helpers/interfaces";
import "./UserFollowElement.css";

interface UserFollowElementProps {
    user: User;
    followUser: (id: number) => any
}

export default function UserFollowElement(props: UserFollowElementProps) {
    return (<div className="RecommendationsUserElement">
        <img src={props.user.avatar_url}/>
        <h4>{props.user.username}</h4>
        <button type="button" className="Button PrimaryButton" onClick={props.followUser(props.user.id)}>Follow</button>
    </div>);
}
