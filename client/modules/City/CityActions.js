import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_CITY_SEARCH: 'SET_CITY_SEARCH',
  SET_CITY_CURRENT_PAGE: 'SET_CITY_CURRENT_PAGE',
  SET_CITIES: 'SET_CITIES',
};
export function setSearch(search) {
  return {
    type: ACTIONS.SET_CITY_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_CITY_CURRENT_PAGE,
    page
  };
}
export function setCities(cities) {
  return {
    type: ACTIONS.SET_CITIES,
    cities
  };
}

export function fetchCities(page) {
  return (dispatch) => {
    return callApi(`city?page=${page}`, 'get', '' ).then(res => {
      dispatch(setCities(res.cities));
    });
  };
}

export function toggleCity(city) {
  return () => {
    return callApi('city/toggle', 'post', '', {city}).then(res => {
      return res;
    });
  };
}
export function createCity(city) {
  return () => {
    return callApi('city', 'post', '', {city}).then(res => {
      return res;
    });
  };
}
export function editCity(city) {
  return () => {
    return callApi('city', 'put', '', {city}).then(res => {
      return res;
    });
  };
}
