import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, Button, Table, Checkbox, Glyphicon, OverlayTrigger, Tooltip, DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchBlog, toggleBlog } from '../../BlogActions';
import { getCurrentPage, getBlogs, getTopic } from '../../BlogReducer';
import { getId } from '../../../Login/LoginReducer';
import { setNotify } from '../../../App/AppActions';

class BlogList extends Component {
  constructor(props) {
    super(props);
  }
  onToggle = (id) => {
    const blog = {
      id,
    };
    this.props.dispatch(toggleBlog(blog)).then(()  => {
      if (this.props.topic !== 'Chọn danh mục') {
        this.props.dispatch(fetchBlog(this.props.topic, this.props.currentPage - 1));
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
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>disable</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.blogs.map((n, index) => {
            const date = new Date(n.dateCreated);
            const hours =  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const time = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`;
            return (
              <tr key={index}>
                <td>{n.title}</td>
                <td>{time}</td>
                <td>
                  <Checkbox checked={n.disable} onChange={() => this.onToggle(n._id)} />
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
