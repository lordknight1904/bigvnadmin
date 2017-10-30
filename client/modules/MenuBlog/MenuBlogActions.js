import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_MENU_BLOG_CURRENT_PAGE: 'SET_MENU_BLOG_CURRENT_PAGE',
  SET_MENU_BLOGS: 'SET_MENU_BLOGS',
};
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_MENU_BLOG_CURRENT_PAGE,
    page
  };
}
export function setMenuBlogs(menuBlogs) {
  return {
    type: ACTIONS.SET_MENU_BLOGS,
    menuBlogs
  };
}

export function fetchMenuBlog(page) {
  return (dispatch) => {
    return callApi(`topics?page=${page}`, 'get', '' ).then(res => {
      dispatch(setMenuBlogs(res.topics));
    });
  };
}

export function createMenuBlog(topic) {
  return () => {
    return callApi('topic', 'post', '', {topic} ).then(res => {
      return res;
    });
  };
}
export function toggleTopic(topic) {
  return () => {
    return callApi('topic/toggle', 'post', '', {topic}).then(res => {
      return res;
    });
  };
}
export function updateTopic(topic) {
  return () => {
    return callApi('topic', 'put', '', {topic}).then(res => {
      return res;
    });
  };
}
