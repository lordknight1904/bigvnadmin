// Import Actions
import { ACTIONS } from './KeywordActions';
// Initial State
const initialState = {
  search: '',
  currentPage: 1,
  maxPage: 0,
  keywords: [],
};

const KeywordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_KEYWORD_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_KEYWORD_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_KEYWORDS:
      return { ...state, keywords: action.keywords };
    default:
      return state;
  }
};

export const getSearch = state => state.keyword.search;
export const getCurrentPage = state => state.keyword.currentPage;
export const getKeywords = state => state.keyword.keywords;

export default KeywordReducer;

