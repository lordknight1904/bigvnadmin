// Import Actions
import { ACTIONS } from './AppActions';

// Initial State
const initialState = {
  isNotify: false,
  message: '',

  cities: [],
  cityId: '',
  districtId: '',
  wardId: '',
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_NOTIFY:
      return { ...state, isNotify: true, message: action.message };
    case ACTIONS.CLOSE_NOTIFY:
      return { ...state, isNotify: false, message: '' };
    default:
      return state;
  }
};

export const getIsNotify = state => state.app.isNotify;
export const getMessage = state => state.app.message;
// Export Reducer
export default AppReducer;
