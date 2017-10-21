// Import Actions
import { ACTIONS } from './WardActions';
// Initial State
const initialState = {
  currentPage: 1,
  wards: [],
  cities: [],
  cityId: '',
  cityName: 'Chọn Tỉnh/Thành',
  districts: [],
  districtId: '',
  districtName: 'Chọn Quận/Huyện',
};

const WardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_WARDS_CITIES:
      return { ...state, cities: action.cities };
    case ACTIONS.SET_WARDS_DISTRICT_NAME:
      return { ...state, districtName: action.name };
    case ACTIONS.SET_WARDS_CITY_NAME:
      return { ...state, cityName: action.name };
    case ACTIONS.SET_WARDS_DISTRICTS:
      return { ...state, districts: action.districts };
    case ACTIONS.SET_WARD_DISTRICT_ID:
      return { ...state, districtId: action.districtId };
    case ACTIONS.SET_WARD_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_WARDS:
      return { ...state, wards: action.wards };
    default:
      return state;
  }
};

export const getCurrentPage = state => state.ward.currentPage;
export const getWards = state => state.ward.wards;
export const getDistrictId = state => state.ward.districtId;
export const getCityName = state => state.ward.cityName;
export const getDistrictName = state => state.ward.districtName;
export const getWardDistricts = state => state.ward.districts;
export const getWardCities = state => state.ward.cities;

export default WardReducer;

