/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Login/pages/Login');
  require('./modules/Home/pages/Home');
  require('./modules/Admin/pages/Admin');
  require('./modules/User/pages/User');
  require('./modules/City/pages/City');
  require('./modules/District/pages/District');
  require('./modules/Ward/pages/Ward');
  require('./modules/News/pages/News');
  require('./modules/Banner/pages/Banner');
  require('./modules/MenuNews/pages/MenuNews');
  require('./modules/MenuBlog/pages/MenuBlog');
  require('./modules/Blog/pages/Blog');
  require('./modules/Setting/pages/Setting');
  require('./modules/Keyword/pages/Keyword');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Login/pages/Login').default);
        });
      }}
    />
    <Route
      path="/keyword"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Keyword/pages/Keyword.js').default);
        });
      }}
    />
    <Route
      path="/setting"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Setting/pages/Setting').default);
        });
      }}
    />
    <Route
      path="/menublog"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/MenuBlog/pages/MenuBlog').default);
        });
      }}
    />
    <Route
      path="/menunews"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/MenuNews/pages/MenuNews').default);
        });
      }}
    />
    <Route
      path="/banner"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Banner/pages/Banner').default);
        });
      }}
    />
    <Route
      path="/blog"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Blog/pages/Blog').default);
        });
      }}
    />
    <Route
      path="/news"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/News/pages/News').default);
        });
      }}
    />
    <Route
      path="/city"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/City/pages/City').default);
        });
      }}
    />
    <Route
      path="/district"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/District/pages/District').default);
        });
      }}
    />
    <Route
      path="/ward"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Ward/pages/Ward').default);
        });
      }}
    />
    <Route
      path="/home"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/News/pages/News').default);
        });
      }}
    />
    <Route
      path="/admin"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Admin/pages/Admin').default);
        });
      }}
    />
    <Route
      path="/user"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/User').default);
        });
      }}
    />
  </Route>
);
