import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import styles from '../../../../main.css';
import { setSearch, setCurrentPage, fetchCities } from '../../CityActions';
import { getCurrentPage, getCities } from '../../CityReducer';

class CityNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchCities(eventKey - 1));
  };
  render() {
    return (
      <Navbar className={styles.cointain}>
        <Nav>
          <NavItem componentClass="span" className={styles.navPageItem}>
            <Pagination
              bsSize="small"
              first
              last
              boundaryLinks
              activePage={this.props.currentPage}
              items={(this.props.cities.length === 0) ? 1 : Math.ceil(this.props.cities.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
              bsClass={`pagination pagination-sm ${styles.pageInfo}`}
            />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem className={styles.navPageItem}>
            <Button bsStyle="success" onClick={this.props.onCreateCity}>Tạo mới</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentPage: getCurrentPage(state),
    cities: getCities(state),
  };
}

CityNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateCity: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
};

CityNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CityNavBar);
