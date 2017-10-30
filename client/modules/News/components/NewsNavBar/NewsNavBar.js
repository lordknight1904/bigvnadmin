import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button, NavDropdown } from 'react-bootstrap';
import styles from './NewsNavBar.css';
import { fetchNews, setCurrentPage, setCategory, setSearch } from '../../NewsActions';
import { getCurrentPage, getCategory, getCategories, getNews, getSearch } from '../../NewsReducer';

class NewsNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchNews(this.props.search, this.props.category !== 'Chọn danh mục' ? this.props.category : '', eventKey - 1));
  };
  chooseCate = (cate) => {
    this.props.dispatch(setCategory(cate.title));
    this.props.dispatch(fetchNews(this.props.search, cate._id, 0));
  };
  hanldeSearch = (event) => {
    this.props.dispatch(setSearch(event.target.value));
    this.props.dispatch(fetchNews(event.target.value, this.props.category !== 'Chọn danh mục' ? this.props.category : '', this.props.currentPage -1));
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
              items={ (this.props.news.length === 0) ? 1 : Math.ceil(this.props.news.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
            />
          </NavItem>
        </Nav>
        <Nav>
          <NavDropdown title={this.props.category} id="basic-nav-dropdown">
            {
              this.props.categories.map((cate, index) => (
                <MenuItem key={index} onClick={() => this.chooseCate(cate)}>{cate.title}</MenuItem>
              ))
            }
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentPage: getCurrentPage(state),
    categories: getCategories(state),
    search: getSearch(state),
    news: getNews(state),
    category: getCategory(state),
  };
}

NewsNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  news: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

NewsNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NewsNavBar);
