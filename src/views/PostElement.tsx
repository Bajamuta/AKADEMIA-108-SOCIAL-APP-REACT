import React, {useState} from "react";
import {ObjectContext, Post, User} from "../helpers/interfaces";
import './PostElement.css';
import {useOutletContext} from "react-router-dom";
import {datePipe} from "../helpers/dateHelpers";

interface PostProps {
    post: Post,
    deletePost: (id: number) => void,
    likePost: (id: number) => Promise<boolean>,
    dislikePost: (id: number) => Promise<boolean>,
    unfollow: (id: number) => any
}

export default function PostElement(props: PostProps) {

    const objectContext: ObjectContext = useOutletContext();
    const userLikedInit: User | undefined = props.post.likes.find((user: User) => user.username === objectContext.loggedUser.username);
    const dateOfPost: string = datePipe(props.post.created_at);

    const [likesCount, setLikesCount] = useState<number>(props.post.likes.length);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(!!userLikedInit);
    const [userFollowed, setUserFollowed] = useState<boolean>(false);

    const LikePost = () => {
        props.likePost(props.post.id).then(
            (result: boolean) => {
                if (result)
                {
                    setUserLiked(true);
                    setLikesCount(likesCount + 1);
                }
            }
        )
    }

    const DislikePost = () => {
        props.dislikePost(props.post.id).then(
            (result: boolean) => {
                if (result)
                {
                    setUserLiked(false);
                    setLikesCount(likesCount - 1);
                }
            }
        );
    }

    return (
        <div className="PostsContainer" key={props.post.id}>
            <div className="SinglePost">
                <div className="SinglePostHeader">
                    <img src={props.post.user?.avatar_url} alt="user avatar"/>
                    <h3>{props.post.user?.username}</h3>
                    {
                        objectContext.loggedUser.username !== props.post.user?.username &&
                        <button type="button" className="Button SecondaryButton" onClick={props.unfollow(props.post?.user?.id!)}>Unfollow</button>
                    }
                    <span className="SinglePostDate">created at: {dateOfPost}</span>
                </div>
                <div className="SinglePostBody">
                    <p key={props.post.id}>{props.post.content}</p>
                </div>
                <div className="SinglePostFooter">
                    <span>Likes: {likesCount}</span>
                    {
                        objectContext.loggedUser.username === props.post.user?.username &&
                        <button className="Button DangerButton" onClick={() => setModalVisible(true)}>Delete</button>
                    }
                    {
                        objectContext.loggedUser.username !== props.post.user?.username && !userLiked &&
                        <button className="Button PrimaryButton" onClick={LikePost}>Like</button>
                    }
                    {
                        objectContext.loggedUser.username !== props.post.user?.username && userLiked &&
                        <button className="Button SecondaryButton" onClick={DislikePost}>Dislike</button>
                    }
                </div>
            </div>
            {modalVisible &&
                <div className="SinglePostDeleteConfirm">
                    <p className="FontBold FontUppercase">Are you sure?</p>
                    <div className="DeleteConfirmButtonsContainer">
                        <button className="Button PrimaryButton" onClick={() => setModalVisible(false)}>CANCEL</button>
                        <button className="Button DangerButton" onClick={() => {
                            setModalVisible(false);
                            props.deletePost(props.post.id);
                        }}>DELETE</button>
                    </div>
                </div>
            }
        </div>
    );
}
