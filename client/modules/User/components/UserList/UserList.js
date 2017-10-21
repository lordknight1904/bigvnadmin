import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table, Checkbox } from 'react-bootstrap';
import { fetchUserSearch, toggleBlogger, toggleNewser } from '../../UserActions';
import { getUsers, getSearch, getCurrentPage } from '../../UserReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';

class UserList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchUserSearch(this.props.search, this.props.currentPage - 1));
  }
  onBlogger = (id) => {
    const user = {
      id,
    };
    this.props.dispatch(toggleBlogger(user)).then(() => {
      this.props.dispatch(fetchUserSearch(this.props.search, this.props.currentPage - 1));
    });
  };
  onNewser = (id) => {
    const user = {
      id,
    };
    this.props.dispatch(toggleNewser(user)).then(() => {
      this.props.dispatch(fetchUserSearch(this.props.search, this.props.currentPage - 1));
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Tên tài khoản</th>
          <th>Tên người dùng</th>
          <th>Liên kết Fb</th>
          <th>Liên kết G+</th>
          <th>Newser</th>
          <th>Blogger</th>
          <th>Ngày tạo</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.users.map((a, index) => {
            const date = new Date(a.dateCreated);
            const hours =  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{a.userName}</td>
                <td>{a.fullName}</td>
                <td>
                  <Checkbox checked={a.facebookId !== ''} readOnly />
                </td>
                <td>
                  <Checkbox checked={a.googleId !== ''} readOnly />
                </td>
                <td>
                  <Checkbox checked={a.newser} onClick={() => this.onNewser(a._id)} />
                </td>
                <td>
                  <Checkbox checked={a.blogger} onClick={() => this.onBlogger(a._id)} />
                </td>
                <td>{time}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    search: getSearch(state),
    id: getId(state),
  };
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

  showDialog: PropTypes.func.isRequired,
};

UserList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(UserList);
