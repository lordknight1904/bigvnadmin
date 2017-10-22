// Import Actions
import { ACTIONS } from './BloggerActions';
// Initial State
const initialState = {
  topics: [],
  blogs: [],
};

const BloggerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TOPIC:
      return { ...state, topics: action.topics };
    case ACTIONS.SET_BLOGS:
      return { ...state, blogs: action.blogs };
    default:
      return state;
  }
};

export const getTopics = state => state.blogger.topics;
export const getBlogs = state => state.blogger.blogs;

export default BloggerReducer;

