import callApi from '../../util/apiCaller';
// Export Constants
export const ACTIONS = {
  SET_NEWS_SEARCH: 'SET_NEWS_SEARCH',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_NEWS_CURRENT_PAGE: 'SET_NEWS_CURRENT_PAGE',
  SET_NEWS: 'SET_NEWS',
};

export function setSearch(search) {
  return {
    type: ACTIONS.SET_NEWS_SEARCH,
    search
  };
}
export function setCurrentPage(page) {
  return {
    type: ACTIONS.SET_NEWS_CURRENT_PAGE,
    page
  };
}

export function setNews(news) {
  return {
    type: ACTIONS.SET_NEWS,
    news
  };
}
export function fetchNews(search, category, page) {
  return (dispatch) => {
    return callApi(`news?search=${search}&category=${category}&page=${page}`, 'get', '' ).then(res => {
      console.log(`news?search=${search}&category=${category}&page=${page}`);
      dispatch(setNews(res.news));
    });
  };
}

export function setCategory(category) {
  return {
    type: ACTIONS.SET_CATEGORY,
    category
  };
}
export function setCategories(categories) {
  return {
    type: ACTIONS.SET_CATEGORIES,
    categories
  };
}
export function fetchCategories() {
  return (dispatch) => {
    return callApi('categories', 'get', '' ).then(res => {
      dispatch(setCategories(res.categories));
    });
  };
}

export function toggleNews(news) {
  return () => {
    return callApi('news/toggle', 'post', '', {news} ).then(res => {
      return res;
    });
  };
}
export function vipNews(news) {
  return () => {
    return callApi('news/vip', 'post', '', {news} ).then(res => {
      return res;
    });
  };
}
