import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import { fetchMenuNews, setCurrentPage } from '../../MenuNewsActions';
import { getCurrentPage, getMenuNews } from '../../MenuNewsReducer';
import styles from '../../../../main.css';
class MenuNewsNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchMenuNews(eventKey - 1));
  };
  search = () => {
    this.props.dispatch(fetchMenuNews(this.props.currentPage -1));
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
              items={(this.props.menuNews.length === 0) ? 1 : Math.ceil(this.props.menuNews.length / 10)}
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
            <Button bsStyle="success" onClick={this.props.onCreateMenuNews}>Tạo mới</Button>
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
    menuNews: getMenuNews(state),
  };
}

MenuNewsNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateMenuNews: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  menuNews: PropTypes.array.isRequired,
};

MenuNewsNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuNewsNavBar);
