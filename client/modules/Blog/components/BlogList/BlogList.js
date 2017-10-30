import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table, Checkbox, Glyphicon, OverlayTrigger, Tooltip, DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchBlog, toggleBlog } from '../../BlogActions';
import { getCurrentPage, getBlogs, getTopic } from '../../BlogReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';
import styles from '../../../../main.css';
import dateFormat from 'dateformat';

class BlogList extends Component {
  constructor(props) {
    super(props);
  }
  onToggle = (id) => {
    const news = {
      id,
    };
    this.props.dispatch(toggleBlog(news)).then(()  => {
      if (this.props.topic !== 'Chọn danh mục') {
        this.props.dispatch(fetchBlog('', this.props.topic, this.props.currentPage - 1));
      } else {
        this.props.dispatch(fetchBlog('', this.props.currentPage - 1));
      }
    });
  };
  render() {
    const seoTooltip = (
      <Tooltip id="tooltip" label='seoTooltip'>Thông tin SEO</Tooltip>
    );
    const infoTooltip = (
      <Tooltip id="tooltip" label='infoTooltip'>Preview tin</Tooltip>
    );
    return (
      <Table striped bordered condensed hover className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Tiêu đề</th>
            <th style={{ width: '15%' }}>Preview</th>
            <th style={{ width: '20%' }}>Ngày tạo</th>
            <th style={{ width: '10%' }}>Đã duyệt</th>
            <th style={{ width: '15%' }}>Alias</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.blogs.map((n, index) => {
            const titleTooltip = (
              <Tooltip id="tooltip" label="titleTooltip">{n.title}</Tooltip>
            );
            return (
              <tr key={index}>
                <td style={{ width: '40%' }}  className={styles.titleOverFlow} >
                  <OverlayTrigger placement="top" overlay={titleTooltip}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.title}</p>
                  </OverlayTrigger>
                </td>
                <td className="text-center">
                  <OverlayTrigger placement="top" overlay={infoTooltip}>
                    <Button onClick={() => this.props.onInfo(n)} ><Glyphicon glyph="glyphicon glyphicon-file" /></Button>
                  </OverlayTrigger>
                </td>
                <td style={{ width: '20%' }}>{dateFormat(n.dateCreated, 'dd/mm/yyyy HH:mm')}</td>
                <td className="text-center">
                  <Checkbox checked={n.approved} onChange={() => this.onToggle(n._id)} />
                </td>
                <td className="text-center">
                  <OverlayTrigger placement="left" overlay={seoTooltip}>
                    <Button onClick={() => this.props.onSEO(n)} ><Glyphicon glyph="glyphicon glyphicon-cog" /></Button>
                  </OverlayTrigger>
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
    blogs: getBlogs(state),
    currentPage: getCurrentPage(state),
    topic: getTopic(state),
    id: getId(state),
  };
}

BlogList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSEO: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

BlogList.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BlogList);
