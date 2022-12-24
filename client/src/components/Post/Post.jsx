import React, { useEffect, useState } from "react";
import "./Post.css";
import { SlOptions } from "react-icons/sl";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import NoAvatar from "../../assets/noavatar.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletedPost, dislikePost, likePost } from "../../actions/post";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [liked, setLiked] = useState(
    post.likes.includes(currentUser?.result._id)
  );
  const [showOption, setShowOption] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    users.filter((u) => u._id === post?.userId && setUser(u));
  }, [post]);

  const setLikePost = (id) => {
    setLiked(true);
    dispatch(likePost(id));
  };

  const setdisLikePost = (id) => {
    setLiked(false);
    dispatch(dislikePost(id));
  };

  const deletePost = (id) => {
    dispatch(deletedPost(id));
    setDeleted(true);
  };

  return (
    <div className="post-container" style={{ display: deleted && "none" }}>
      <div className="header">
        <div className="left-header">
          <img src={NoAvatar} alt="profile" />
          <div className="text">
            <span>
              <Link
                to={`/profile/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {user?.name}
              </Link>
            </span>
            <span>5 days ago</span>
          </div>
        </div>
        {/* --- delete option --- */}
        <div className="option">
          <SlOptions
            onClick={() => setShowOption(!showOption)}
            style={{ cursor: "pointer", marginRight: "5px" }}
          />
          {post.userId === currentUser?.result._id && showOption && (
            <div className="option_box">
              <span onClick={() => deletePost(post._id)}>Delete</span>
            </div>
          )}
        </div>
      </div>
      <div className="post-file-box">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="post" className="post-file" />
        ) : (
          post.videoUrl && (
            <video
              src={post.videoUrl}
              alt="post"
              controls
              className="post-file"
            />
          )
        )}
        {post?.desc && (
          <p className="desc">
            <span>{user?.name}</span>
            {": "}
            {post.desc}
          </p>
        )}
      </div>
      <div className="footer">
        {liked ? (
          <AiFillLike
            className="like-button"
            onClick={() => setdisLikePost(post._id)}
          />
        ) : (
          <AiOutlineLike onClick={() => setLikePost(post._id)} />
        )}
        <GoComment />
        <CiShare2 />
      </div>
    </div>
  );
};

export default Post;
