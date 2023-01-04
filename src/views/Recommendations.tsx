import React from "react";
import "./Recommendations.css";
import {User} from "../helpers/interfaces";
import UserFollowElement from "./UserFollowElement";

interface RecommendationsProps {
    recommendations: User[],
    followUser: (id: number) => any
}

export default function Recommendations(props: RecommendationsProps) {

    return (
        <div className="RecommendationsContainer">
            <h2>Recommendations</h2>
            <div className="RecommendationsUsersList">
                {props.recommendations.length > 0 && props.recommendations.map(
                    (user: User) => {
                        return <UserFollowElement user={user}
                                                  followUser={props.followUser(user.id)}
                                                  key={user.id}/>
                    }
                )}
                {
                    props.recommendations.length < 1 && <p className="FontItalic">No recommendations found.</p>
                }
            </div>
        </div>
    );
}
