// Import Actions
import { ACTIONS } from './UserActions';
// Initial State
const initialState = {
  search: '',
  currentPage: 1,
  maxPage: 0,
  users: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_USER_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_USER_MAX_PAGE:
      return { ...state, maxPage: action.page };
    case ACTIONS.SET_USER:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

export const getSearch = state => state.user.search;
export const getCurrentPage = state => state.user.currentPage;
export const getMaxPage = state => state.user.maxPage;
export const getUsers = state => state.user.users;

export default UserReducer;

