import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import styles from '../../../../main.css';
import { setCurrentPage, fetchKeywords, setSearch } from '../../KeywordActions';
import { getCurrentPage, getKeywords, getSearch } from '../../KeywordReducer';

class KeywordNavBar extends Component {
  constructor(props) {
    super(props);
  }
  handleSearch = (event) => {
    this.props.dispatch(setSearch(event.target.value));
    this.props.dispatch(fetchKeywords(event.target.value, this.props.currentPage - 1));
  };
  handlePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchKeywords(eventKey - 1));
  };
  search = () => {
    this.props.dispatch(fetchKeywords(this.props.search, this.props.currentPage - 1));
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
              onChange={this.handleSearch}
            />
          </NavItem>
          <NavItem componentClass="span" className={styles.navPageItem}>
            <Pagination
              bsSize="small"
              first
              last
              boundaryLinks
              activePage={this.props.currentPage}
              items={(this.props.keywords.length === 0) ? 1 : Math.ceil(this.props.keywords.length / 10)}
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
    keywords: getKeywords(state),
  };
}

KeywordNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  keywords: PropTypes.array.isRequired,
};

KeywordNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(KeywordNavBar);
