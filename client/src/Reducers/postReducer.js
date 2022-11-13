const postReducer = (
  state = {
    posts:null,
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return {
        ...state,
        uploading: true,
      };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return {
        ...state,
        error: true,
        uploading: false,
      };

    case "RETREIVING_START": 
    return{
      ...state,
      loading: true,
      error:false
    }  
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        loading:false,
        posts: action.data,
        error:false
      }
      case "RETREIVING_FAIL":
        return{
          ...state,
          loading:false,
          error:true
        }
    default:
      return state;
  }
};

export default postReducer;