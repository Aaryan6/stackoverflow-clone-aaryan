import React, { useEffect, useState } from "react";
import "./Community.css";
import Poster from "../../assets/community-bg.png";
import Logo from "../../assets/icon.png";
import AboutCommunity from "./AboutCommunity";
import Post from "../../components/Post/Post";
import { GrAdd, GrClose } from "react-icons/gr";
import Modal from "react-modal";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts, sharePost } from "../../actions/post";
import SuggestionBox from "../../components/SuggestionBox/SuggestionBox";

const CommunityHome = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const PostsList = useSelector((state) => state.postReducer);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    setAllPosts(PostsList.data);
  }, [refresh, PostsList]);
  return (
    <div className="community-container">
      <ModelBox
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <div className="add-post-button" onClick={() => setIsOpen(true)}>
        <GrAdd className="add-button" />
      </div>
      <div className="wrapper">
        <div className="community-poster">
          <img src={Poster} alt="" />
        </div>
        <div className="community-header">
          <div className="community-profile-image">
            <img src={Logo} alt="" />
          </div>
          <span className="title">Stack Overflow Community</span>
        </div>
        <div className="tab-bar">
          <span>Posts</span>
          <span>Videos</span>
          <span>About</span>
        </div>
        {/* --- posts --- */}
        <div className="community-body">
          <div className="left-sidebar">
            <AboutCommunity />
            <SuggestionBox />
          </div>
          <div className="posts">
            {allPosts?.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModelBox = ({ modalIsOpen, setIsOpen, setRefresh, refresh }) => {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPerc, setVideoPerc] = useState(0);
  const [imagePerc, setImagePerc] = useState(0);
  const [desc, setDesc] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const dispatch = useDispatch();

  let subtitle;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageType"
          ? setImagePerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    imageFile && uploadFile(imageFile, "imageType");
    setVideoFile(null);
    setVideoPerc(0);
  }, [imageFile]);

  useEffect(() => {
    videoFile && uploadFile(videoFile, "videoType");
    setImageFile(null);
    setImagePerc(0);
  }, [videoFile]);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    dispatch(sharePost({ desc, imageUrl: fileUrl }));
    setIsOpen(false);
    dispatch(fetchAllPosts());
    setRefresh(!refresh);
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    dispatch(sharePost({ desc, videoUrl: fileUrl }));
    setIsOpen(false);
    dispatch(fetchAllPosts());
    setRefresh(!refresh);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="sharepost-container">
        <GrClose className="close-icon" onClick={closeModal} />
        <div className="wrapper">
          <div className="title">Create Post</div>
          <form
            action=""
            onSubmit={imagePerc > 0 ? handleSubmitImage : handleSubmitVideo}
          >
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type something..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <div className="share-buttons">
              <div className="upload-button">
                <button>Upload Image</button>
                {imagePerc > 0 ? (
                  "Uploading: " + imagePerc + "%"
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                )}
              </div>
              <div className="upload-button">
                <button>Upload Video</button>
                {videoPerc > 0 ? (
                  "Uploading: " + videoPerc + "%"
                ) : (
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                )}
              </div>
            </div>
            <button type="submit">Share</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
