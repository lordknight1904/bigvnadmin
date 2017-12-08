import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_KEYWORD_SEARCH: 'SET_KEYWORD_SEARCH',
  SET_KEYWORD_CURRENT_PAGE: 'SET_KEYWORD_CURRENT_PAGE',
  SET_KEYWORDS: 'SET_KEYWORDS',
};
export function setSearch(search) {
  return {
    type: ACTIONS.SET_KEYWORD_SEARCH,
    search,
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_KEYWORD_CURRENT_PAGE,
    page,
  };
}
export function setKeywords(keywords) {
  return {
    type: ACTIONS.SET_KEYWORDS,
    keywords,
  };
}

export function fetchKeywords(search, page) {
  return (dispatch) => {
    return callApi(`keyword?search=${search}&page=${page}`, 'get', '').then(res => {
      dispatch(setKeywords(res.keywords));
    });
  };
}

export function toggleKeyword(keyword) {
  return () => {
    return callApi('keyword', 'put', '', { keyword }).then(res => {
      return res;
    });
  };
}
