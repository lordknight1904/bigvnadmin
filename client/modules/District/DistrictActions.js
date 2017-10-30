import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_DISTRICT_CURRENT_PAGE: 'SET_DISTRICT_CURRENT_PAGE',
  SET_DISTRICTS: 'SET_DISTRICTS',
  SET_DISTRICT_CITY_ID: 'SET_DISTRICT_CITY_ID',
  SET_DISTRICT_CITIES: 'SET_DISTRICT_CITIES',
  SET_DISTRICT_CITY_NAME: 'SET_DISTRICT_CITY_NAME',
};

export function setCityId(cityId) {
  return {
    type: ACTIONS.SET_DISTRICT_CITY_ID,
    cityId
  };
}
export function setCityName(name) {
  return {
    type: ACTIONS.SET_DISTRICT_CITY_NAME,
    name
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_DISTRICT_CURRENT_PAGE,
    page
  };
}

export function setCities(cities) {
  return {
    type: ACTIONS.SET_DISTRICT_CITIES,
    cities
  };
}
export function fetchCitiesAll() {
  return (dispatch) => {
    return callApi('cityAll', 'get', '' ).then(res => {
      dispatch(setCities(res.cities));
    });
  };
}

export function setDistricts(districts) {
  return {
    type: ACTIONS.SET_DISTRICTS,
    districts
  };
}
export function fetchDistricts(cityId, page) {
  return (dispatch) => {
    return callApi(`district/${cityId}?page=${page}`, 'get', '' ).then(res => {
      console.log(res);
      dispatch(setDistricts(res.districts));
    });
  };
}

export function toggleDistrict(district) {
  return () => {
    return callApi('district/toggle', 'post', '', {district}).then(res => {
      return res;
    });
  };
}
export function createDistrict(district) {
  return () => {
    return callApi('district', 'post', '', {district}).then(res => {
      return res;
    });
  };
}
export function editDistrict(district) {
  return () => {
    return callApi('district', 'put', '', {district}).then(res => {
      return res;
    });
  };
}
