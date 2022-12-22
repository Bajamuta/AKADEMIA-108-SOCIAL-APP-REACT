import React, {useState} from "react";
import {ObjectContext, Post} from "../helpers/interfaces";
import './PostElement.css';
import {useOutletContext} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {REACT_APP_API_URL} from "../react-app-env.d";

interface PostProps {
    post: Post
}

export default function PostElement(props: PostProps) {

    const objectContext: ObjectContext = useOutletContext();

    const datePipe = (dataString: any) => {
        const d: Date = new Date(dataString);
        const year = d.getFullYear();
        const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        return year + '-' + month + '-' + day;
    }

    const [likesCount, setLikesCount] = useState<number>(props.post.likes.length);
    const [dateOfPost, setDateOfPost] = useState<string>(datePipe(props.post.created_at));

    const deletePost = (id: number) => {
        axios.post(`${REACT_APP_API_URL}/post/delete`, {
            post_id: id
        }).then(
            (response: AxiosResponse<any>) => {
                console.log(response);
            }
        )
            .catch((error) => {
                console.error('An error has occurred during deleting the post:', error);
            })
    }

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
                        <button className="SinglePostDeleteButton" onClick={() => deletePost(props.post.id)}>Delete</button>
                    }
                </div>
            </div>
        </div>
    );
}
