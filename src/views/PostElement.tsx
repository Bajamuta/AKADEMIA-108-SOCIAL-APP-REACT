import React, {useState} from "react";
import {ObjectContext, Post, User} from "../helpers/interfaces";
import './PostElement.css';
import {useOutletContext} from "react-router-dom";
import {datePipe} from "../helpers/dateHelpers";

interface PostProps {
    post: Post,
    deletePost: () => void
}

export default function PostElement(props: PostProps) {

    const objectContext: ObjectContext = useOutletContext();
    const userLikedInit: User | undefined = props.post.likes.find((user: User) => user.username === objectContext.loggedUser.username);

    const [likesCount, setLikesCount] = useState<number>(props.post.likes.length);
    const [dateOfPost, setDateOfPost] = useState<string>(datePipe(props.post.created_at));
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(!!userLikedInit);

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
                        <button className="Button DangerButton" onClick={() => setModalVisible(true)}>Delete</button>
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
                            props.deletePost();
                        }}>DELETE</button>
                    </div>
                </div>
            }
        </div>
    );
}
