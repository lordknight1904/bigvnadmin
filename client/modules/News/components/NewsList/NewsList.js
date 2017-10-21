import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Checkbox, Glyphicon, OverlayTrigger, Tooltip, DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchNews, toggleNews, vipNews } from '../../NewsActions';
import { getCurrentPage, getNews, getCategory } from '../../NewsReducer';
import { getId } from '../../../Login/LoginReducer';
// import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
class NewList extends Component {
  constructor(props) {
    super(props);
  }
  onToggle = (id) => {
    const news = {
      id,
    };
    this.props.dispatch(toggleNews(news)).then(() => {
      if (this.props.category !== 'Chọn danh mục') {
        this.props.dispatch(fetchNews(this.props.category, this.props.currentPage - 1));
      } else {
        this.props.dispatch(fetchNews('', this.props.currentPage - 1));
      }
    });
  };
  onVip = (id, event) => {
    const news = {
      id,
      vip: event
    };
    this.props.dispatch(vipNews(news)).then(() => {
      if (this.props.category !== 'Chọn danh mục') {
        this.props.dispatch(fetchNews(this.props.category, this.props.currentPage - 1));
      } else {
        this.props.dispatch(fetchNews('', this.props.currentPage - 1));
      }
    });
  };
  render() {
    const seoTooltip = (
      <Tooltip id="tooltip" label="seoTooltip">Thông tin SEO</Tooltip>
    );
    const infoTooltip = (
      <Tooltip id="tooltip" label="infoTooltip">Preview tin</Tooltip>
    );
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Đã duyệt</th>
            <th>VIP</th>
            <th className={styles.tableButtonCol}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.news.map((n, index) => {
            const date = new Date(n.dateCreated);
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{n.title}</td>
                <td>{time}</td>
                <td>
                  <Checkbox checked={n.approved} onChange={() => this.onToggle(n._id)} />
                </td>
                <td>
                  <DropdownButton title={n.vip} id="bg-nested-dropdown" disabled={!n.approved}>
                    <MenuItem onClick={() => this.onVip(n._id, 'none')} >None</MenuItem>
                    <MenuItem onClick={() => this.onVip(n._id, 'category')} >Category</MenuItem>
                    <MenuItem onClick={() => this.onVip(n._id, 'all')} >All</MenuItem>
                  </DropdownButton>
                </td>
                <td>
                  <OverlayTrigger placement="left" overlay={seoTooltip}>
                    <Button onClick={() => this.props.onSEO(n)} ><Glyphicon glyph="glyphicon glyphicon-cog" /></Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={infoTooltip}>
                    <Button onClick={() => this.props.onInfo(n)} ><Glyphicon glyph="glyphicon glyphicon-file" /></Button>
                  </OverlayTrigger>
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
    news: getNews(state),
    currentPage: getCurrentPage(state),
    category: getCategory(state),
    id: getId(state),
  };
}

NewList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSEO: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  news: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

NewList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NewList);
