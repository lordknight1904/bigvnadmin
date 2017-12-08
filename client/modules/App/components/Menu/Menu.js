import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserName, getId } from '../../../Login/LoginReducer';
import { logout } from '../../../Login/LoginActions';
import { Tab, Row, Col, Nav, NavItem, NavDropdown, MenuItem } from'react-bootstrap';
import styles from '../../App.css';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 'news',
      approvedNews: false,
    };
  }
  handleSelect = (eventKey) => {
    if (eventKey === 'approvedNews') {
      this.setState({ approvedNews: true, places: false, menu: false });
      return;
    }
    if (eventKey === 'places') {
      this.setState({ approvedNews: false, places: true, menu: false });
      return;
    }
    if (eventKey === 'menu') {
      this.setState({ approvedNews: false, places: false, menu: true });
      return;
    }
    if (eventKey !== 'logOut') {
      this.setState({ selected: eventKey });
      this.context.router.push(`/${eventKey}`);
    } else {
      this.setState({ approvedNews: false, places: false, menu: false });
      this.props.dispatch(logout());
    }
  };
  render(){
    return (
      <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect} bsClass={`nav ${styles.sideMenu}`} style={{ backgroundColor: '#2E363F', color: 'white' }}>
        <NavItem eventKey="approvedNews">
          Duyệt tin
        </NavItem>
        {
          this.state.approvedNews ? ( <MenuItem className={styles.subMenu} eventKey="news">Rao vặt</MenuItem> ) : ''
        }
        {
          this.state.approvedNews ? ( <MenuItem className={styles.subMenu} eventKey="blog">Blog</MenuItem> ) : ''
        }
        <NavItem eventKey="admin">
          Quản trị viên
        </NavItem>
        <NavItem eventKey="user">
          Người dùng
        </NavItem>

        <NavItem eventKey="places">
          Địa điểm
        </NavItem>
        {
          this.state.places ? ( <MenuItem className={styles.subMenu} eventKey="city">City</MenuItem> ) : ''
        }
        {
          this.state.places ? ( <MenuItem className={styles.subMenu} eventKey="district">District</MenuItem> ) : ''
        }
        {
          this.state.places ? ( <MenuItem className={styles.subMenu} eventKey="ward">Ward</MenuItem> ) : ''
        }

        <NavItem eventKey="menu">
          Menu
        </NavItem>
        {
          this.state.menu ? ( <MenuItem className={styles.subMenu} eventKey="menunews">Rao vặt</MenuItem> ) : ''
        }
        {
          this.state.menu ? ( <MenuItem className={styles.subMenu} eventKey="menublog">Blog</MenuItem> ) : ''
        }

        <NavItem eventKey="keyword">
          Từ khóa
        </NavItem>
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
