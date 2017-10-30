import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_WARD_CURRENT_PAGE: 'SET_WARD_CURRENT_PAGE',
  SET_WARDS: 'SET_WARDS',
  SET_WARD_DISTRICT_ID: 'SET_WARD_DISTRICT_ID',
  SET_WARDS_DISTRICTS: 'SET_WARDS_DISTRICTS',
  SET_WARDS_CITY_NAME: 'SET_WARDS_CITY_NAME',
  SET_WARDS_DISTRICT_NAME: 'SET_WARDS_DISTRICT_NAME',
  SET_WARDS_CITIES: 'SET_WARDS_CITIES',
};

export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_WARD_CURRENT_PAGE,
    page
  };
}
export function setWards(wards) {
  return {
    type: ACTIONS.SET_WARDS,
    wards
  };
}

export function setDistrictName(name) {
  return {
    type: ACTIONS.SET_WARDS_DISTRICT_NAME,
    name
  };
}
export function setDistrictId(districtId) {
  return {
    type: ACTIONS.SET_WARD_DISTRICT_ID,
    districtId
  };
}
export function setCityName(name) {
  return {
    type: ACTIONS.SET_WARDS_CITY_NAME,
    name
  };
}

export function setWardDistricts(districts) {
  return {
    type: ACTIONS.SET_WARDS_DISTRICTS,
    districts
  };
}
export function fetchDistricts(cityId, none) {
  return (dispatch) => {
    return callApi(`district/${cityId}`, 'get', '' ).then(res => {
      if (none) dispatch(setWardDistricts(res.districts));
      return res;
    });
  };
}

export function setWardCities(cities) {
  return {
    type: ACTIONS.SET_WARDS_CITIES,
    cities
  };
}
export function fetchDistrictsAll() {
  return (dispatch) => {
    return callApi(`cityAll`, 'get', '' ).then(res => {
      dispatch(setWardCities(res.cities));
    });
  };
}

export function fetchWards(districtId, page) {
  return (dispatch) => {
    return callApi(`ward/${districtId}?page=${page}`, 'get', '' ).then(res => {
      dispatch(setWards(res.wards));
    });
  };
}

export function toggleWard(ward) {
  return () => {
    return callApi('ward/toggle', 'post', '', {ward}).then(res => {
      return res;
    });
  };
}
export function createWard(ward) {
  return () => {
    return callApi('ward', 'post', '', {ward}).then(res => {
      console.log(res);
      return res;
    });
  };
}

export function editWard(ward) {
  return () => {
    return callApi('ward', 'put', '', {ward}).then(res => {
      return res;
    });
  };
}
