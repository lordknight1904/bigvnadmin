import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Checkbox, Button } from 'react-bootstrap';
import { fetchMenuBlog, toggleTopic } from '../../MenuBlogActions';
import { getMenuBlogs, getCurrentPage } from '../../MenuBlogReducer';
import { getId } from '../../../Login/LoginReducer';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';
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
    });
  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tiêu đề</th>
            <th>Alias</th>
            <th>Ngày tạo</th>
            <th style={{ width: '10%' }}>Sửa</th>
            <th className={styles.tableButtonCol}>Khóa</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.menuBlogs.map((menu, index) => {
            return (
              <tr key={index}>
                <td>{menu.name}</td>
                <td>{menu.title}</td>
                <td>{menu.alias}</td>
                <td>{dateFormat(menu.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td>
                  <Button onClick={() => this.props.onEdit(menu)}>Sửa</Button>
                </td>
                <td>
                  <Checkbox checked={menu.disable} onChange={() => this.onToggle(menu._id)} />
                </td>
              </tr>
            );
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
  onEdit: PropTypes.func.isRequired,
  menuBlogs: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

MenuBlogList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuBlogList);
