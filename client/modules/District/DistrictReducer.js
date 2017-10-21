// Import Actions
import { ACTIONS } from './DistrictActions';
// Initial State
const initialState = {
  currentPage: 1,
  districts: [],
  cities: [],
  cityId: '',
  cityName: 'Chọn Tỉnh/Thành',
};

const DistrictReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_DISTRICT_CITY_NAME:
      return { ...state, cityName: action.name };
    case ACTIONS.SET_DISTRICT_CITIES:
      return { ...state, cities: action.cities };
    case ACTIONS.SET_DISTRICT_CITY_ID:
      return { ...state, cityId: action.cityId };
    case ACTIONS.SET_DISTRICT_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_DISTRICTS:
      return { ...state, districts: action.districts };
    default:
      return state;
  }
};

export const getCurrentPage = state => state.district.currentPage;
export const getDistricts = state => state.district.districts;
export const getCities = state => state.district.cities;
export const getCityId = state => state.district.cityId;
export const getCityName = state => state.district.cityName;

export default DistrictReducer;

