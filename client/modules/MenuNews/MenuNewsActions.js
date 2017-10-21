import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_MENU_NEWS_CURRENT_PAGE: 'SET_MENU_NEWS_CURRENT_PAGE',
  SET_MENU_NEWS: 'SET_MENU_NEWS',
};
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_MENU_NEWS_CURRENT_PAGE,
    page
  };
}
export function setMenuNews(menuNews) {
  return {
    type: ACTIONS.SET_MENU_NEWS,
    menuNews
  };
}

export function fetchMenuNews(page) {
  return (dispatch) => {
    return callApi(`categories?page=${page}`, 'get', '' ).then(res => {
      dispatch(setMenuNews(res.categories));
    });
  };
}

export function createMenuNews(category) {
  return () => {
    return callApi('category', 'post', '', {category} ).then(res => {
      return res;
    });
  };
}
