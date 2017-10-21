import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_USER_SEARCH: 'SET_USER_SEARCH',
  SET_USER_CURRENT_PAGE: 'SET_USER_CURRENT_PAGE',
  SET_USER_MAX_PAGE: 'SET_USER_MAX_PAGE',
  SET_USER: 'SET_USER',
};
export function setSearch(search) {
  return {
    type: ACTIONS.SET_USER_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_USER_CURRENT_PAGE,
    page
  };
}
export function setMaxPage(page) {
  return {
    type: ACTIONS.SET_USER_MAX_PAGE,
    page
  };
}
export function setUser(users) {
  return {
    type: ACTIONS.SET_USER,
    users
  };
}

export function fetchUserSearch(search, page) {
  return (dispatch) => {
    return callApi(`user?search=${search}&page=${page}`, 'get', '' ).then(res => {
      dispatch(setUser(res.users));
    });
  };
}
export function toggleBlogger(user) {
  return () => {
    return callApi('user/blogger', 'post', '', {user}).then(res => {
      return res;
    });
  };
}
export function toggleNewser(user) {
  return () => {
    return callApi('user/newser', 'post', '', {user}).then(res => {
      return res;
    });
  };
}
