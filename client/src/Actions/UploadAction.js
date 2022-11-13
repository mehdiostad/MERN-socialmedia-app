import * as UploadRequest from "../api/UploadRequst";

export const uploadImage = (data) => async (dispatch) => {
  try {
      await UploadRequest.uploadImage(data);
      
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async(dispatch) => {
  dispatch({ type: "UPLOAD_START" });

  try {
    const newPost = await UploadRequest.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS" , data: newPost.data});
  } catch (error) {
      dispatch({ type: "UPLOAD_FAIL" });
      console.log(error);
  }
};
