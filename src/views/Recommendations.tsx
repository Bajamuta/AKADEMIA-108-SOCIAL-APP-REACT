import React from "react";
import "./Recommendations.css";
import {User} from "../helpers/interfaces";
import UserFollowElement from "./UserFollowElement";

interface RecommendationsProps {
    recommendations: User[],
    followUser: (id: number) => any
}

export default function Recommendations(props: RecommendationsProps) {
    console.log('reco', props.recommendations);
    return (
        <div className="RecommendationsContainer">
            <h2>Recommendations</h2>
            <div className="RecommendationsUsersList">
                {props.recommendations.map(
                    (user: User) => {
                        // remember: here is only passing the reference to a function, not calling it out!
                        return <UserFollowElement user={user}
                                                  followUser={props.followUser}
                                                  key={user.id}/>
                    }
                )}
                {/*{
                    props.recommendations.length < 1 && <p className="FontItalic">No recommendations found.</p>
                }*/}
            </div>
        </div>
    );
}
