/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import login from './modules/Login/LoginReducer';
import admin from './modules/Admin/AdminReducer';
import user from './modules/User/UserReducer';
import city from './modules/City/CityReducer';
import district from './modules/District/DistrictReducer';
import ward from './modules/Ward/WardReducer';
import news from './modules/News/NewsReducer';
import banner from './modules/Banner/BannerReducer';
import menuNews from './modules/MenuNews/MenuNewsReducer';
import menuBlog from './modules/MenuBlog/MenuBlogReducer';
import blog from './modules/Blog/BlogReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  login,
  admin,
  user,
  city,
  district,
  ward,
  news,
  banner,
  menuNews,
  menuBlog,
  blog,
});
