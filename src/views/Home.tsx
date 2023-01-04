import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ObjectContext, Post, User} from "../helpers/interfaces";
import './Home.css';
import PostElement from "./PostElement";
import {useOutletContext} from "react-router-dom";
import {REACT_APP_API_URL} from "../react-app-env.d";
import Recommendations from "./Recommendations";
export default function Home() {

    const objectContext: ObjectContext = useOutletContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState<string>('');
    const [recommendations, setRecommendations] = useState<User[]>([]);

    // how it works exactly?
    axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token.length > 0 ? objectContext.loggedUser.jwt_token : '');

    const getLatestPosts = () => {
        axios.post(`${REACT_APP_API_URL}/post/latest`).then(
            (response: AxiosResponse<Post[]>) => {
                setPosts(response.data);
                getRecommendations();
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
            (response: AxiosResponse<Post[]>) => {
                // how to map to correct interface type?
                setPosts((response.data).concat(posts));
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
            (response: AxiosResponse<Post[]>) => {
                // how to map to correct interface type?
                setPosts(posts.concat(response.data));
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

    const likePost = (id: number) => {
        return axios.post(`${REACT_APP_API_URL}/post/like`, {
            post_id: id
        }).then(
            (response: AxiosResponse<any>) => {
                return response.status === 201;
            }
        )
            .catch((error) => {
                console.error('An error has occurred during liking a post:', error);
                return false;
            });
    }

    const dislikePost = (id: number) => {
        return axios.post(`${REACT_APP_API_URL}/post/dislike`, {
            post_id: id
        }).then(
            (response: AxiosResponse<any>) => {
                return response.status === 201;
            }
        )
            .catch((error) => {
                console.error('An error has occurred during disliking a post:', error);
                return false;
            });
    }

    const getRecommendations = () => {
        axios.get(`${REACT_APP_API_URL}/follows/recommendations`, {})
            .then(
            (response: AxiosResponse<User[]>) => {
                if (response.status === 200)
                {
                    setRecommendations(response.data);
                }
            }
        )
            .catch((error) => {
                console.error('An error has occurred during getting recommendations:', error);
            });
    }

    const followUser = (id: number) => {
        axios.post(`${REACT_APP_API_URL}/follows/follow`, {
            leader_id: id
        })
            .then(
                (response: AxiosResponse<any>) => {
                    console.log('resp2', response);
                }
            )
            .catch((error) => {
                console.error('An error has occurred during setting a follow for an user:', error);
            });
    }

    const unfollowUser = (id: number) => {
        axios.post(`${REACT_APP_API_URL}/follows/disfollow`, {
            leader_id: id
        })
            .then(
                (response: AxiosResponse<any>) => {
                    console.log('unfollow resp', response);
                }
            )
            .catch((error) => {
                console.error('An error has occurred during setting a unfollow for an user:', error);
            });
    }

    useEffect(() => {
        getLatestPosts();
        // getRecommendations();
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
                        <button className="Button PrimaryButton">Add</button>
                    </form>
                </div>
            }
            {objectContext.loggedUser.jwt_token.length > 0 &&
                <Recommendations recommendations={recommendations} followUser={(id) => followUser(id)} />
            }
            <div className="PostList">
                <h2>Posts</h2>
                {posts.map(
                    (post: Post) => {
                        return <PostElement post={post} key={post.id}
                                            deletePost={(id) => deletePost(id)}
                                            likePost={(id) => likePost(id)}
                                            dislikePost={(id) => dislikePost(id)}
                                            unfollow={(id) => unfollowUser(id)}
                        />
                    }
                )}
            </div>
            <button className="Button PrimaryButton LoadMoreButton" onClick={getOlderPosts}>Load more</button>
        </div>
    );
}
