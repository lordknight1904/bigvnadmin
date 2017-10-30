import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button, NavDropdown, DropdownButton } from 'react-bootstrap';
import styles from '../../../../main.css';
import { setCurrentPage, fetchWards, setDistrictId, fetchDistricts, setCityName, setDistrictName, setWards } from '../../WardActions';
import { getCurrentPage, getWards, getDistrictName, getCityName, getWardDistricts } from '../../WardReducer';
import { getCities } from '../../../City/CityReducer';

class WardNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    if (this.props.cityId !== ' ') {
      this.props.dispatch(fetchWards(this.props.districtId, eventKey - 1));
    }
  };
  chooseCity = (city) => {
    this.props.dispatch(setCityName(city.name));
    this.props.dispatch(setWards([]));
    this.props.dispatch(fetchDistricts(city._id, true));
    this.props.dispatch(setDistrictName('Chọn Quận/Huyện'));
  };
  chooseDistrict = (district) => {
    this.props.dispatch(setDistrictName(district.name));
    this.props.dispatch(setDistrictId(district._id));
    this.props.dispatch(fetchWards(district._id));
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
              items={(this.props.districts.length === 0) ? 1 : Math.ceil(this.props.districts.length / 10)}
              maxButtons={5}
              bsClass={`pagination pagination-sm ${styles.pageInfo}`}
              onSelect={this.hanldePage}
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
        <Nav>
          <DropdownButton title={this.props.districtName} id="basic-nav-dropdown" className={styles.navPageItem}>
            {
              this.props.districts.map((district, index) => (
                <MenuItem key={index} onClick={() => this.chooseDistrict(district)}>{district.name}</MenuItem>
              ))
            }
          </DropdownButton>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <Button bsStyle="success" onClick={this.props.onCreateWard}>Tạo mới</Button>
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
    districts: getWardDistricts(state),
    wards: getWards(state),
    districtName: getDistrictName(state),
    cityName: getCityName(state),
  };
}

WardNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateWard: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
  wards: PropTypes.array.isRequired,
  districtName: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
};

WardNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(WardNavBar);
