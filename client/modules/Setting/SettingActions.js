import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_SETTING_SEARCH: 'SET_SETTING_SEARCH',
  SET_SETTING_CURRENT_PAGE: 'SET_SETTING_CURRENT_PAGE',
  SET_SETTINGS: 'SET_SETTINGS',
};
export function setSearch(search) {
  return {
    type: ACTIONS.SET_SETTING_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_SETTING_CURRENT_PAGE,
    page
  };
}
export function setSettings(settings) {
  return {
    type: ACTIONS.SET_SETTINGS,
    settings
  };
}

export function fetchSettings(page) {
  return (dispatch) => {
    return callApi(`settings?page=${page}`, 'get', '' ).then(res => {
      dispatch(setSettings(res.settings));
    });
  };
}

export function createSetting(setting) {
  return () => {
    return callApi('setting', 'post', '', {setting}).then(res => {
      return res;
    });
  };
}

export function toggleSetting(setting) {
  return () => {
    return callApi('setting/toggle', 'post', '', {setting}).then(res => {
      return res;
    });
  };
}
export function modifySetting(setting) {
  return () => {
    return callApi('setting', 'put', '', {setting}).then(res => {
      return res;
    });
  };
}
