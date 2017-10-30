import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { getId } from '../Login/LoginReducer';
import Login from '../Login/pages/Login';
import Menu from './components/Menu/Menu';
import { Modal, Col, Row } from 'react-bootstrap';

import { closeNotify } from './AppActions';
import { getIsNotify, getMessage, getCoin } from './AppReducer';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    this.muiThemeSetting = getMuiTheme(null, { userAgent: 'all' });
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }
  onHide = () => {
    this.props.dispatch(closeNotify());
  };
  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiThemeSetting}>
        <div>
          {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
          <div>
            <Helmet
              title="Admin"
              titleTemplate=""
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />
            {
              (this.props.id === '') ? (
                <div className={styles.container}>
                  <Col md={12} style={{ height: '90vh' }}>
                    <Login />
                  </Col>
                </div>
              ) : (
                <div className={styles.container}>
                  <Col md={12}>
                    <Menu />
                  </Col>
                  <Col md={12}>
                    {this.props.children}
                  </Col>
                </div>
              )
            }
            <Modal show={this.props.isNotify} onHide={this.onHide}>
              <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.props.message}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isNotify: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isNotify: getIsNotify(store),
    message: getMessage(store),
    id: getId(store),
  };
}

export default connect(mapStateToProps)(App);
