// Import Actions
import { ACTIONS } from './MenuBlogActions';
// Initial State
const initialState = {
  currentPage: 1,
  maxPage: 0,
  menuBlogs: [],
};

const MenuBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MENU_BLOG_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_MENU_BLOGS:
      return { ...state, menuBlogs: action.menuBlogs };
    default:
      return state;
  }
};

export const getCurrentPage = state => state.menuBlog.currentPage;
export const getMenuBlogs= state => state.menuBlog.menuBlogs;

export default MenuBlogReducer;

