import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Post} from "../interfaces";
import './Home.css';
import PostElement from "./PostElement";
export default function Home() {

    const API_URL = "https://akademia108.pl/api/social-app";

    const [posts, setPosts] = useState<Post[]>([]);

    const getLatestPosts = () => {
        axios.post(`${API_URL}/post/latest`).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                console.log(response);
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
                        return <PostElement post={post}></PostElement>
                    }
                )}
            </div>
            <button className="LoadMoreButton">Load more</button>
        </div>
    );
}
