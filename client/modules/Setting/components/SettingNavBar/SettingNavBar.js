import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button } from 'react-bootstrap';
import { setSearch, setCurrentPage, fetchSettings } from '../../SettingActions';
import { getCurrentPage, getSettings } from '../../SettingReducer';
import styles from '../../../../main.css';
class SettingNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchSettings(eventKey - 1));
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
              items={(this.props.settings.length === 0) ? 1 : Math.ceil(this.props.settings.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
              bsClass={`pagination pagination-sm ${styles.pageInfo}`}
            />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem className={styles.navPageItem}>
            <Button bsStyle="success" onClick={this.props.onCreateSetting}>Tạo mới</Button>
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
    settings: getSettings(state),
  };
}

SettingNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onCreateSetting: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  settings: PropTypes.array.isRequired,
};

SettingNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(SettingNavBar);
