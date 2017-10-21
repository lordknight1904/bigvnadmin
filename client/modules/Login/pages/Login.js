import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { loginRequest } from '../LoginActions';
// import {  } from '../LoginReducer';
import { fetchCities } from '../../City/CityActions';
import styles from '../../../main.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameError: '',
      passwordError: '',
      isSigningIn: false,
      error: '',
    };
  }
  onSigningIn = () => {
    const admin = {
      userName: this.state.userName,
      password: this.state.password,
    };
    this.setState({ isSigningIn: true });
    this.props.dispatch(loginRequest(admin)).then((res) => {
      const response = res ? res.code : '';
      switch (response) {
        case 'login fail': {
          this.setState({ error: 'Không thể đăng nhập.', isSigningIn: false });
          break;
        }
        case 'success': {
          this.context.router.push('/home');
          this.props.dispatch(fetchCities(0));
          break;
        }
        default: {
          break;
        }
      }
    });
  };
  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.onSigningIn();
    }
  };
  handleUserName = (event) => {
    if (event.target.value.trim() === '') {
      this.setState({ userName: event.target.value.trim(), userNameError: 'Trường này không được trống.' });
    } else {
      this.setState({ userName: event.target.value.trim(), userNameError: '' });
    }
  };
  handlePassword = (event) => {
    if (event.target.value.trim() === '') {
      this.setState({ password: event.target.value.trim(), passwordError: 'Trường này không được trống.' });
    } else {
      this.setState({ password: event.target.value.trim(), passwordError: '' });
    }
  };
  handleUserNameBlur = (event) => {
    if (event.target.value.trim() === '') {
      this.setState({ userNameError: 'Trường này không được trống.' });
    } else {
      this.setState({ userNameError: '' });
    }
  };
  handlePasswordBlur = (event) => {
    if (event.target.value.trim() === '') {
      this.setState({ passwordError: 'Trườg này không được trống.' });
    } else {
      this.setState({ passwordError: '' });
    }
  };
  render() {
    return (
      <Col xs={4} xsOffset={4} style={{ top: '35%' }}>
        <div className={`panel panel-default ${styles.loginPanel}`} >
          <div className={`panel-heading ${styles.headerLogin}`}><h2>Đăng nhập</h2></div>
          <Form horizontal className="panel-body">
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Tài khoản
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text"
                  value={this.state.userName}
                  onChange={this.handleUserName}
                  onBlur={this.handleUserNameBlur}
                  onKeyDown={this.onKeyDown}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Mật khẩu
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  onBlur={this.handlePasswordBlur}
                  onKeyDown={this.onKeyDown}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={8}>
                <button disabled={this.state.isSigningIn} onClick={this.onSigningIn} className={styles.inputRegistryButton}>
                  ĐĂNG NHẬP
                </button>
              </Col>
            </FormGroup>

            <FormGroup controlId="error" validationState="error" >
              <Col sm={6} smOffset={3} >
                <HelpBlock>{this.state.error}</HelpBlock>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Col>
    );
  }
}
// Retrieve data from store as props
function mapStateToProps() {
  return {
  };
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Login.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Login);
