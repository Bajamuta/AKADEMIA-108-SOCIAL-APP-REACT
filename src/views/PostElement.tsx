import React, {useState} from "react";
import {ObjectContext, Post} from "../helpers/interfaces";
import './PostElement.css';
import {useOutletContext} from "react-router-dom";
import {datePipe} from "../helpers/functions";

interface PostProps {
    post: Post,
    deletePost: () => void
}

export default function PostElement(props: PostProps) {

    const objectContext: ObjectContext = useOutletContext();

    const [likesCount, setLikesCount] = useState<number>(props.post.likes.length);
    const [dateOfPost, setDateOfPost] = useState<string>(datePipe(props.post.created_at));



    return (
        <div className="PostsContainer" key={props.post.id}>
            <div className="SinglePost">
                <div className="SinglePostHeader">
                    <img src={props.post.user?.avatar_url} alt="user image"/>
                    <h3>{props.post.user?.username}</h3>
                    <span>created at: {dateOfPost}</span>
                </div>
                <div className="SinglePostBody">
                    <p key={props.post.id}>{props.post.content}</p>
                </div>
                <div className="SinglePostFooter">
                    <span>Likes: {likesCount}</span>
                    {
                        objectContext.loggedUser.username === props.post.user?.username &&
                        <button className="SinglePostDeleteButton" onClick={props.deletePost}>Delete</button>
                    }
                </div>
            </div>
        </div>
    );
}
