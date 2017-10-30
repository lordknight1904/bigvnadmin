import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button, NavDropdown, DropdownButton } from 'react-bootstrap';
import styles from '../../../../main.css';
import { setCurrentPage, fetchDistricts, setCityId, setCityName } from '../../DistrictActions';
import { getCurrentPage, getDistricts, getCities, getCityName } from '../../DistrictReducer';

class DistrictNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    if (this.props.cityId !== ' ') {
      this.props.dispatch(fetchDistricts(this.props.cityId, eventKey - 1));
    }
  };
  chooseCity = (city) => {
    this.props.dispatch(setCityName(city.name));
    this.props.dispatch(setCityId(city._id));
    this.props.dispatch(fetchDistricts(city._id, this.props.currentPage - 1))
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
              items={ (this.props.districts.length === 0) ? 1 : Math.ceil(this.props.districts.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
              bsClass={`pagination pagination-sm ${styles.pageInfo}`}
            />
          </NavItem>
        </Nav>
        <Nav>
          <DropdownButton title={this.props.cityName} id="basic-nav-dropdown" className={styles.navPageItem}>
            {
              this.props.cities.map((city, index) => (
                <MenuItem key={index} onClick={() => this.chooseCity(city)}>{city.name}</MenuItem>
              ))
            }
          </DropdownButton>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <Button bsStyle="success" onClick={this.props.onCreateDistrict}>Tạo mới</Button>
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
    districts: getDistricts(state),
    cities: getCities(state),
    cityName: getCityName(state),
  };
}

DistrictNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateDistrict: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  districts: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  cityName: PropTypes.string.isRequired,
};

DistrictNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(DistrictNavBar);
