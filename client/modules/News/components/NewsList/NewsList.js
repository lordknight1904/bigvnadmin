import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Checkbox, Glyphicon, OverlayTrigger, Tooltip, DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchNews, toggleNews, vipNews } from '../../NewsActions';
import { getCurrentPage, getNews, getCategory } from '../../NewsReducer';
import { getId } from '../../../Login/LoginReducer';
import dateFormat from 'dateformat';
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
        this.props.dispatch(fetchNews('', this.props.category, this.props.currentPage - 1));
      } else {
        this.props.dispatch(fetchNews('', '', this.props.currentPage - 1));
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
        this.props.dispatch(fetchNews('', this.props.category, this.props.currentPage - 1));
      } else {
        this.props.dispatch(fetchNews('', '', this.props.currentPage - 1));
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
      <table className={`table table-bordered table-striped ${styles.table}`}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Tiêu đề</th>
            <th style={{ width: '10%' }}>Preview</th>
            <th style={{ width: '20%' }}>Ngày tạo</th>
            <th style={{ width: '10%' }}>Đã duyệt</th>
            <th style={{ width: '10%' }}>VIP</th>
            <th style={{ width: '10%' }} className={styles.tableButtonCol}>Alias</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.news.map((n, index) => {
            const titleTooltip = (
              <Tooltip id="tooltip" label="titleTooltip">{n.title}</Tooltip>
            );
            return (
              <tr key={index}>
                <td className={styles.titleOverFlow} style={{ width: '40%' }}>
                  <OverlayTrigger placement="top" overlay={titleTooltip}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.title}</p>
                  </OverlayTrigger>
                </td>
                <td style={{ width: '10%' }}>
                  <OverlayTrigger placement="top" overlay={infoTooltip}>
                    <Button onClick={() => this.props.onInfo(n)} ><Glyphicon glyph="glyphicon glyphicon-file" /></Button>
                  </OverlayTrigger>
                </td>
                <td style={{ width: '20%' }}>{dateFormat(n.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td style={{ width: '10%' }}>
                  <Checkbox checked={n.approved} onChange={() => this.onToggle(n._id)} />
                </td>
                <td style={{ width: '10%' }}>
                  <DropdownButton title={n.vip} id="bg-nested-dropdown" disabled={!n.approved}>
                    <MenuItem onClick={() => this.onVip(n._id, 'none')} >None</MenuItem>
                    <MenuItem onClick={() => this.onVip(n._id, 'category')} >Category</MenuItem>
                    <MenuItem onClick={() => this.onVip(n._id, 'all')} >All</MenuItem>
                  </DropdownButton>
                </td>
                <td style={{ width: '10%' }}>
                  <OverlayTrigger placement="left" overlay={seoTooltip}>
                    <Button onClick={() => this.props.onSEO(n)} ><Glyphicon glyph="glyphicon glyphicon-cog" /></Button>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
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
