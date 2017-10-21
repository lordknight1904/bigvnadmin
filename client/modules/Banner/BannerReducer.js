// Import Actions
import { ACTIONS } from './BannerActions';
// Initial State
const initialState = {
  search: '',
  currentPage: 1,
  maxPage: 0,
  banners: [],
};

const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BANNER_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_BANNER_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_BANNERS:
      return { ...state, banners: action.banners };
    default:
      return state;
  }
};

export const getSearch = state => state.banner.search;
export const getCurrentPage = state => state.banner.currentPage;
export const getBanners = state => state.banner.banners;

export default BannerReducer;

