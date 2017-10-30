import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_BLOG_SEARCH: 'SET_BLOG_SEARCH',
  SET_BLOG_TOPIC: 'SET_BLOG_TOPIC',
  SET_BLOG_TOPICS: 'SET_BLOG_TOPICS',
  SET_BLOG_CURRENT_PAGE: 'SET_BLOG_CURRENT_PAGE',
  SET_BLOG_BLOGS: 'SET_BLOG_BLOGS',
};

export function setSearch(search) {
  return {
    type: ACTIONS.SET_BLOG_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_BLOG_CURRENT_PAGE,
    page
  };
}

export function setBlogs(blogs) {
  return {
    type: ACTIONS.SET_BLOG_BLOGS,
    blogs
  };
}
export function fetchBlog(search, topic, page) {
  return (dispatch) => {
    return callApi(`blogs?topic=${topic}&search=${search}&page=${page}`, 'get', '' ).then(res => {
      console.log(`blogs?topic=${topic}&search=${search}&page=${page}`);
      dispatch(setBlogs(res.blogs));
    });
  };
}

export function setTopic(topic) {
  return {
    type: ACTIONS.SET_BLOG_TOPIC,
    topic
  };
}
export function setTopics(topics) {
  return {
    type: ACTIONS.SET_BLOG_TOPICS,
    topics
  };
}
export function fetchTopics() {
  return (dispatch) => {
    return callApi('topics', 'get', '' ).then(res => {
      dispatch(setTopics(res.topics));
    });
  };
}

export function toggleBlog(news) {
  return () => {
    return callApi('news/toggle', 'post', '', {news} ).then(res => {
      console.log(res);
      return res;
    });
  };
}
