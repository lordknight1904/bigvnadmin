// Import Actions
import { ACTIONS } from './CityActions';
// Initial State
const initialState = {
  search: '',
  currentPage: 1,
  cities: [],
};

const CityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CITY_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_CITY_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_CITIES:
      return { ...state, cities: action.cities };
    default:
      return state;
  }
};

export const getSearch = state => state.city.search;
export const getCurrentPage = state => state.city.currentPage;
export const getCities = state => state.city.cities;

export default CityReducer;

