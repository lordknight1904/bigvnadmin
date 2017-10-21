// Import Actions
import { ACTIONS } from './MenuNewsActions';
// Initial State
const initialState = {
  currentPage: 1,
  maxPage: 0,
  menuNews: [],
};

const MenuNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MENU_NEWS_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_MENU_NEWS:
      return { ...state, menuNews: action.menuNews };
    default:
      return state;
  }
};

export const getCurrentPage = state => state.menuNews.currentPage;
export const getMenuNews= state => state.menuNews.menuNews;

export default MenuNewsReducer;

