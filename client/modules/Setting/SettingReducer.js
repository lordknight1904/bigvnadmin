// Import Actions
import { ACTIONS } from './SettingActions';
// Initial State
const initialState = {
  search: '',
  currentPage: 1,
  settings: [],
};

const SettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_SETTING_SEARCH:
      return { ...state, search: action.search };
    case ACTIONS.SET_SETTING_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case ACTIONS.SET_SETTINGS:
      return { ...state, settings: action.settings };
    default:
      return state;
  }
};

export const getSearch = state => state.setting.search;
export const getCurrentPage = state => state.setting.currentPage;
export const getSettings = state => state.setting.settings;

export default SettingReducer;

