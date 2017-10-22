// Import Actions
import { ACTIONS } from './BlogActions';
// Initial State
const initialState = {
  blogs: [],
  topics: [],
  topic: 'Chọn danh mục',
  currentPage: 1,
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BLOG_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_BLOG_BLOGS:
      return { ...state, blogs: action.blogs };
    case ACTIONS.SET_BLOG_TOPIC:
      return { ...state, topic: action.topic };
    case ACTIONS.SET_BLOG_TOPICS:
      return { ...state, topics: action.topics };
    default:
      return state;
  }
};

export const getCurrentPage = state => state.blog.currentPage;
export const getTopics = state => state.blog.topics;
export const getTopic = state => state.blog.topic;
export const getBlogs = state => state.blog.blogs;

export default BlogReducer;

