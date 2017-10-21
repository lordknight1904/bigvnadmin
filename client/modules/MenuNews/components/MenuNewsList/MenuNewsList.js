import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table } from 'react-bootstrap';
import { fetchMenuNews } from '../../MenuNewsActions';
import { getMenuNews, getCurrentPage } from '../../MenuNewsReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
class MenuNewsList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchMenuNews(this.props.currentPage - 1));
  }
  onToggle = () => {

  };
  render() {
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tiêu đề</th>
            <th>alias</th>
            <th>Mô tả</th>
            <th>status</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.menuNews.map((menu, index) => {
            const date = new Date(menu.createTime);
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{menu.term_id}</td>
                <td>{menu.title}</td>
                <td>{menu.alias}</td>
                <td>{menu.description}</td>
                <td>{menu.status}</td>
                <td>{time}</td>
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
    menuNews: getMenuNews(state),
    currentPage: getCurrentPage(state),
    id: getId(state),
  };
}

MenuNewsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  menuNews: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

MenuNewsList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuNewsList);
