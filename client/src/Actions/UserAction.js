import * as userApi from "../api/UserRequest";

// export const getUser = (id) => async(dispatch) =>{
//   dispatch({type:"GET_USER"} , id)
//   const data = await userApi.getUser(id)
//   console.log(data);

// }

export const updateUser = (userData, id) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await userApi.updateUser(userData, id);
    dispatch({ type: "UPDATING_SUCCSESS", data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (personId, personData) => async (dispatch) => {
  userApi.followUser(personData, personId);
  dispatch({ type: "FOLLOW_USER", data: personId });
};

export const unFollowUser = (personId, personData) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: personId });
  userApi.unFollowUser(personData, personId);
};
