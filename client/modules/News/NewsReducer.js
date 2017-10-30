// Import Actions
import { ACTIONS } from './NewsActions';
// Initial State
const initialState = {
  search: '',
  news: [],
  categories: [],
  category: 'Chọn danh mục',
  currentPage: 1,
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_NEWS_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_NEWS_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_NEWS:
      return { ...state, news: action.news };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.category };
    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
};

export const getSearch = state => state.news.search;
export const getCurrentPage = state => state.news.currentPage;
export const getCategories = state => state.news.categories;
export const getCategory = state => state.news.category;
export const getNews = state => state.news.news;

export default NewsReducer;

