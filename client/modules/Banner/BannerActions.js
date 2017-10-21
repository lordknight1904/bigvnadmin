import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_BANNER_SEARCH: 'SET_BANNER_SEARCH',
  SET_BANNER_CURRENT_PAGE: 'SET_BANNER_CURRENT_PAGE',
  SET_BANNERS: 'SET_BANNERS',
};
export function setSearch(search) {
  return {
    type: ACTIONS.SET_BANNER_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_BANNER_CURRENT_PAGE,
    page
  };
}
export function setBanners(banners) {
  return {
    type: ACTIONS.SET_BANNERS,
    banners
  };
}

export function fetchBanners(search, page) {
  return (dispatch) => {
    return callApi(`banners?search=${search}&page=${page}`, 'get', '' ).then(res => {
      dispatch(setBanners(res.banners));
    });
  };
}

export function createBanner(banner) {
  return () => {
    return callApi('banner', 'post', '', {banner} ).then(res => {
      return res;
    });
  };
}

export function uploadBanner(base64image, id) {
  return () => {
    const file = {
      base64image,
      id
    };
    return callApi('banner/photo', 'post', '', { file }).then((res) => {
      return res;
    });
  };
}

export function toggleBanner(banner) {
  return () => {
    return callApi('banner/toggle', 'post', '', {banner}).then(res => {
      return res;
    });
  };
}
