import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Post} from "../interfaces";
import './Home.css';
export default function Home() {

    const API_URL = "https://akademia108.pl/api/social-app";

    const [posts, setPosts] = useState<Post[]>([]);

    const getLatestPosts = () => {
        axios.post(`${API_URL}/post/latest`).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                console.log(response.data);
                setPosts(response.data as Post[]);
            }
        )
            .catch((error) => {
                console.error('An error has occured:', error);
            })
    }

    useEffect(() => {
        getLatestPosts();
    }, []);

    console.log(posts);

    return (
        <div className="HomeContainer">
            <div className="PostList">
                {posts.map(
                    (post: Post) => {
                        return <div className="PostsContainer" key={post.id}>
                            <div className="SinglePost">
                                <div className="SinglePostHeader">
                                    <img src={post.user.avatar_url} alt="user image"/>
                                    <h3>{post.user.username}</h3>
                                    <span>created at: {post.created_at.toString()}</span>
                                </div>
                                <div className="SinglePostBody">
                                    <p key={post.id}>{post.content}</p>
                                </div>
                                <div className="SinglePostFooter">
                                    <span>{post.likes.length}</span>
                                </div>
                            </div>
                        </div>
                    }
                )}
            </div>
            <button className="LoadMoreButton">Load more</button>
        </div>
    );
}
