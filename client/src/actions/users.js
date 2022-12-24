import * as api from "../api";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    await api.followUser(userId);
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  try {
    await api.unfollowUser(userId);
  } catch (error) {
    console.log(error);
  }
};
