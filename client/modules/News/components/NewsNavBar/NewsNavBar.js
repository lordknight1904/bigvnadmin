import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button, NavDropdown } from 'react-bootstrap';
import styles from './NewsNavBar.css';
import { fetchNews, setCurrentPage, setCategory } from '../../NewsActions';
import { getCurrentPage, getCategory, getCategories, getNews } from '../../NewsReducer';

class NewsNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchNews(eventKey - 1));
  };
  chooseCate = (cate) => {
    this.props.dispatch(setCategory(cate.title));
    this.props.dispatch(fetchNews(cate._id, 0));
  };
  render() {
    return (
      <Navbar className={styles.cointain}>
        <Nav>
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
        <Nav pullRight>
          <NavItem>
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
    categories: getCategories(state),
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
};

NewsNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NewsNavBar);
