import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserName, getId } from '../../../Login/LoginReducer';
import { logout } from '../../../Login/LoginActions';
import { Tab, Row, Col, Nav, NavItem, NavDropdown, MenuItem } from'react-bootstrap';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 'news',
    };
  }
  handleSelect = (eventKey) => {
    if (eventKey !== 'logOut') {
      this.setState({ selected: eventKey });
      this.context.router.push(`/${eventKey}`);
    } else {
      this.props.dispatch(logout());
    }
  };
  render(){
    return (
      <Nav bsStyle="tabs" activeKey={this.state.selected} onSelect={this.handleSelect}>
        <NavDropdown title="Duyệt tin" id="basic-nav-dropdown">
          <MenuItem eventKey="news">Rao vặt</MenuItem>
          <MenuItem eventKey="blog">Blog</MenuItem>
        </NavDropdown>
        <NavItem eventKey="admin">
          Quản trị viên
        </NavItem>
        <NavItem eventKey="user">
          Người dùng
        </NavItem>
        <NavDropdown title="Địa điểm" id="basic-nav-dropdown">
          <MenuItem eventKey="city">City</MenuItem>
          <MenuItem eventKey="district">District</MenuItem>
          <MenuItem eventKey="ward">Ward</MenuItem>
        </NavDropdown>
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <MenuItem eventKey="menunews">Rao vặt</MenuItem>
          <MenuItem eventKey="menublog">Blog</MenuItem>
        </NavDropdown>
        <NavItem eventKey="banner">
          Quảng cáo
        </NavItem>
        <NavItem eventKey="setting">
          Cấu hình
        </NavItem>
        <NavItem eventKey="logOut">
          Đăng xuất
        </NavItem>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    // userName: getUserName(state),
    // id: getId(state),
  };
}
Menu.propTypes = {
  dispatch: PropTypes.func,
  // userName: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
};
Menu.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Menu);
