import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ObjectContext, Post} from "../helpers/interfaces";
import './Home.css';
import PostElement from "./PostElement";
import {useOutletContext} from "react-router-dom";
import {REACT_APP_API_URL} from "../react-app-env.d";
export default function Home() {

    const objectContext: ObjectContext = useOutletContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState<string>('');

    // how it works exactly?
    axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token.length > 0 ? objectContext.loggedUser.jwt_token : '');

    const getLatestPosts = () => {
        axios.post(`${REACT_APP_API_URL}/post/latest`).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                setPosts(response.data as Post[]);
            }
        )
            .catch((error) => {
                console.error('An error has occured:', error);
            })
    }

    const getNewestPosts = () => {
        axios.post(`${REACT_APP_API_URL}/post/newer-then`, {
            date: posts[0].created_at
        }).then(
            (response: AxiosResponse<any>) => {
                // how to map to correct interface type?
                setPosts((response.data as Post[]).concat(posts));
            }
        )
            .catch((error) => {
                console.error('An error has occured:', error);
            })
    }

    const getOlderPosts = () => {
        axios.post(`${REACT_APP_API_URL}/post/older-then`, {
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

    const addNewPost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${REACT_APP_API_URL}/post/add`, {
            content: newPostContent
        }).then(
            (response: AxiosResponse<any>) => {
                if(response.status === 200) {
                    setNewPostContent('');
                    getNewestPosts();
                }
            }
        )
            .catch((error) => {
                console.error('An error has occurred during adding new post:', error);
            })
    }

    const deletePost = (id: number) => {
        axios.post(`${REACT_APP_API_URL}/post/delete`, {
            post_id: id
        }).then(
            (response: AxiosResponse<any>) => {
                if(response.status === 200) {
                    getLatestPosts();
                }
            }
        )
            .catch((error) => {
                console.error('An error has occurred during deleting the post:', error);
            })
    }

    useEffect(() => {
        getLatestPosts();
    }, []);

    return (
        <div className="HomeContainer">
            {objectContext.loggedUser.jwt_token.length > 0 &&
                <div className="NewPostContainer">
                    <form className="NewPostForm" onSubmit={(event: FormEvent<HTMLFormElement>) => addNewPost(event)}>
                        <textarea rows={3}
                                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                                  value={newPostContent}
                                  className="NewPostTextarea"
                                  placeholder="Write new post"/>
                        <button className="NewPostAddButton">Add</button>
                    </form>
                </div>
            }
            <div className="PostList">
                <h2>Posts</h2>
                {posts.map(
                    (post: Post) => {
                        return <PostElement post={post} key={post.id} deletePost={() => deletePost(post.id)}/>
                    }
                )}
            </div>
            <button className="LoadMoreButton" onClick={getOlderPosts}>Load more</button>
        </div>
    );
}
