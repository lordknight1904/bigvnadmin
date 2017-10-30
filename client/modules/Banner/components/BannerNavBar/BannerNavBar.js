import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import styles from '../../../../main.css';
import { setCurrentPage, fetchBanners, setSearch } from '../../BannerActions';
import { getCurrentPage, getBanners, getSearch } from '../../BannerReducer';

class BannerNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldeSearch = (event) => {
    this.props.dispatch(setSearch(event.target.value));
    this.props.dispatch(fetchBanners(event.target.value, this.props.currentPage -1));
  };
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchBanners(eventKey - 1));
  };
  search = () => {
    this.props.dispatch(fetchBanners(this.props.search, this.props.currentPage -1));
  };
  render() {
    return (
      <Navbar className={styles.cointain}>
        <Nav>
          <NavItem className={styles.navPageItem}>
            <FormControl
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={this.props.search}
              onChange={this.hanldeSearch}
            />
          </NavItem>
          <NavItem componentClass="span" className={styles.navPageItem}>
            <Pagination
              bsSize="small"
              first
              last
              boundaryLinks
              activePage={this.props.currentPage}
              items={(this.props.banners.length === 0) ? 1 : Math.ceil(this.props.banners.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
              bsClass={`pagination pagination-sm ${styles.pageInfo}`}
            />
          </NavItem>
          <NavItem className={styles.navPageItem}>
            <Button bsStyle="success" onClick={this.search}>Tìm kiếm</Button>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem className={styles.navPageItem}>
            <Button bsStyle="success" onClick={this.props.onCreate}>Tạo mới</Button>
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
    currentPage: getCurrentPage(state),
    banners: getBanners(state),
  };
}

BannerNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  banners: PropTypes.array.isRequired,
};

BannerNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BannerNavBar);
