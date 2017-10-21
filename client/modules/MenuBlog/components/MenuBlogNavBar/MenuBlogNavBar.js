import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import styles from './MenuBlogNavBar.css';
import { fetchMenuBlog } from '../../MenuBlogActions';
import { getCurrentPage, getMenuBlogs } from '../../MenuBlogReducer';

class MenuBlogNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchMenuBlog(eventKey - 1));
  };
  search = () => {
    this.props.dispatch(fetchMenuBlog(this.props.currentPage -1));
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
              items={ (this.props.menuBlogs.length === 0) ? 1 : Math.ceil(this.props.menuBlogs.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
            />
          </NavItem>
          <NavItem>
            <Button bsStyle="success" onClick={this.search}>Tìm kiếm</Button>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <Button bsStyle="success" onClick={this.props.onCreateMenuBlog}>Tạo mới</Button>
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
    menuBlogs: getMenuBlogs(state),
  };
}

MenuBlogNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateMenuBlog: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  menuBlogs: PropTypes.array.isRequired,
};

MenuBlogNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuBlogNavBar);
