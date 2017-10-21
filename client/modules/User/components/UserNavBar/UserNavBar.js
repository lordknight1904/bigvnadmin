import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import styles from './UserNavBar.css';
import { setSearch, setMaxPage, setCurrentPage, fetchUserSearch } from '../../UserActions';
import { getCurrentPage, getMaxPage, getSearch, getUsers } from '../../UserReducer';

class UserNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldeSearch = (event) => {
    this.props.dispatch(setSearch(event.target.value));
    this.props.dispatch(fetchUserSearch(event.target.value, this.props.currentPage -1));
  };
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchUserSearch(this.props.search, eventKey - 1));
  };
  search = () => {
    this.props.dispatch(fetchUserSearch(this.props.search, this.props.currentPage -1));
  };
  render() {
    return (
      <Navbar className={styles.cointain}>
        <Nav>
          <NavItem>
            <FormControl
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={this.props.search}
              onChange={this.hanldeSearch}
            />
          </NavItem>
          <NavItem componentClass="span">
            <Pagination
              bsSize="small"
              first
              last
              boundaryLinks
              activePage={this.props.currentPage}
              items={ (this.props.users.length === 0) ? 1 : Math.ceil(this.props.users.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
            />
          </NavItem>
          <NavItem>
            <Button bsStyle="success" onClick={this.search}>Tìm kiếm</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    search: getSearch(state),
    maxPage: getMaxPage(state),
    currentPage: getCurrentPage(state),
    users: getUsers(state),
  };
}

UserNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  maxPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
};

UserNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(UserNavBar);
