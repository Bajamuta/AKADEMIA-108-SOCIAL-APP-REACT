import React from "react";
import {Post} from "../interfaces";
import './PostElement.css';

interface PostProps {
    post: Post
}

export default function PostElement(props: PostProps) {
    return (
        <div className="PostsContainer" key={props.post.id}>
            <div className="SinglePost">
                <div className="SinglePostHeader">
                    <img src={props.post.user.avatar_url} alt="user image"/>
                    <h3>{props.post.user.username}</h3>
                    <span>created at: {props.post.created_at.toString()}</span>
                </div>
                <div className="SinglePostBody">
                    <p key={props.post.id}>{props.post.content}</p>
                </div>
                <div className="SinglePostFooter">
                    <span>Likes: {props.post.likes.length}</span>
                </div>
            </div>
        </div>
    );
}
