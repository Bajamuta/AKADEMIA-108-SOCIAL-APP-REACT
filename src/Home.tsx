import React from "react";

export default function Home() {
    return <div className="PostsContainer">
        <div className="SinglePost">
            <div className="SinglePostHeader">
                <img src="" alt="user image"/>
                <h3>username</h3>
                <span>2022-12-01</span>
            </div>
            <div className="SinglePostBody">
                <p>Lorem Ipsum dolor si amet...</p>
            </div>
            <div className="SinglePostFooter">
                <span>12345</span>
            </div>
        </div>
    </div>
}
