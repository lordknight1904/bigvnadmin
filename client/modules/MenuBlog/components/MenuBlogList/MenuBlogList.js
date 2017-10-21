import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table, Checkbox } from 'react-bootstrap';
import { fetchMenuBlog, toggleTopic } from '../../MenuBlogActions';
import { getMenuBlogs, getCurrentPage } from '../../MenuBlogReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';

class MenuBlogList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchMenuBlog(this.props.currentPage - 1));
  }
  onToggle = (id) => {
    const topic = {
      id
    };
    this.props.dispatch(toggleTopic(topic)).then(() => {
      this.props.dispatch(fetchMenuBlog(this.props.currentPage - 1));
    })
  };
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Alias</th>
          <th>Ngày tạo</th>
          <th>Thao tác</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.menuBlogs.map((menu, index) => {
            const date = new Date(menu.dateCreated);
            const hours =  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{menu.title}</td>
                <td>{menu.alias}</td>
                <td>{time}</td>
                <td>
                  <Checkbox checked={menu.disable} onChange={() => this.onToggle(menu._id)} />
                </td>
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
    menuBlogs: getMenuBlogs(state),
    currentPage: getCurrentPage(state),
    id: getId(state),
  };
}

MenuBlogList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  menuBlogs: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

MenuBlogList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuBlogList);
