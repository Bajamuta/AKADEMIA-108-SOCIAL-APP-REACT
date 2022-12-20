import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ObjectContext, Post} from "../interfaces";
import './Home.css';
import PostElement from "./PostElement";
import {API_URL} from "../index";
import {useOutletContext} from "react-router-dom";
export default function Home() {

    const obj: ObjectContext = useOutletContext();
    const [posts, setPosts] = useState<Post[]>([]);

    const getLatestPosts = () => {
        axios.post(`${API_URL}/post/latest`).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                setPosts(response.data as Post[]);
            }
        )
            .catch((error) => {
                console.error('An error has occured:', error);
            })
    }

    const getNextPosts = () => {
        axios.post(`${API_URL}/post/older-then`, {
            date: posts[posts.length - 1].created_at
        }).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                setPosts(posts.concat(response.data as Post[]));
            }
        )
            .catch((error) => {
                console.error('An error has occured:', error);
            })
    }

    useEffect(() => {
        getLatestPosts();
    }, []);

    return (
        <div className="HomeContainer">
            {obj.loggedUser.jwt_token.length > 0 &&
                <div className="NewPostContainer">
                    <textarea rows={3} className="NewPostTextarea" placeholder="Write new post"/>
                    <button className="NewPostAddButton">Add</button>
                </div>
            }
            <div className="PostList">
                <h2>Posts</h2>
                {posts.map(
                    (post: Post) => {
                        return <PostElement post={post} key={post.id}/>
                    }
                )}
            </div>
            <button className="LoadMoreButton" onClick={getNextPosts}>Load more</button>
        </div>
    );
}
