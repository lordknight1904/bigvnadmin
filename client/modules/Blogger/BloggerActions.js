import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_TOPIC: 'SET_TOPIC',
  SET_BLOGS: 'SET_BLOGS'
};

export function setTopic(topics) {
  return {
    type: ACTIONS.SET_TOPIC,
    topics
  };
}

export function fetchTopics() {
  return (dispatch) => {
    return callApi('topics', 'get', '' ).then(res => {
      dispatch(setTopic(res.topics));
    });
  };
}
export function uploadImage(base64image) {
  return () => {
    const file = {
      base64image,
    };
    return callApi('blog/photo', 'post', '', { file }).then((res) => {
      return res;
    });
  };
}

export function postBlog(blog) {
  return () => {
    return callApi('blog', 'post', '', {blog}).then(res => {
      return res;
    });
  };
}

export function setBlogs(blogs) {
  return {
    type: ACTIONS.SET_BLOGS,
    blogs
  };
}
export function fetchBlogs(page) {
  return (dispatch) => {
    return callApi(`blog?page=${page}`, 'get', '').then(res => {
      dispatch(setBlogs(res.blogs));
    });
  };
}
