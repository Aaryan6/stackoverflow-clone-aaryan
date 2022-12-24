import * as api from "../api/index";

export const sharePost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.sharePost(postData);
    dispatch({ type: "ADD_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();
    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    await api.likePost(postId);
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = (postId) => async (dispatch) => {
  try {
    await api.dislikePost(postId);
  } catch (error) {
    console.log(error);
  }
};

export const deletedPost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
  } catch (error) {
    console.log(error);
  }
};
