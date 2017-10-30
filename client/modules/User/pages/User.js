import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavBar from '../components/UserNavBar/UserNavBar';
import UserList from '../components/UserList/UserList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { getSearch, getCurrentPage } from '../UserReducer';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      register: false,
      userName: '',
      password: '',
      role: 'admin',
      userNameError: '',
      passwordError: '',
      isSigningIn: false,
      error: '',
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };

  onRegister = () => {
    this.setState({ register: true });
  };
  render() {
    return (
      <div>
        <Row>
          <UserNavBar onRegister={this.onRegister} />
        </Row>
        <Row>
          <UserList showDialog={this.showDialog} />
        </Row>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    id: getId(state),
    search: getSearch(state),
    currentPage: getCurrentPage(state),
  };
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

User.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(User);
