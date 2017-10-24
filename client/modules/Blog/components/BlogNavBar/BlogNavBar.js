import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Pagination, FormControl, Button, NavDropdown } from 'react-bootstrap';
import styles from './BlogNavBar.css';
import { fetchBlog, setCurrentPage, setTopic } from '../../BlogActions';
import { getCurrentPage, getTopic, getTopics, getBlogs } from '../../BlogReducer';

class BlogNavBar extends Component {
  constructor(props) {
    super(props);
  }
  hanldePage = (eventKey) => {
    this.props.dispatch(setCurrentPage(eventKey - 1));
    this.props.dispatch(fetchBlog(eventKey - 1));
  };
  chooseTopic = (topic) => {
    this.props.dispatch(setTopic(topic.title));
    this.props.dispatch(fetchBlog(topic._id, 0));
  };
  render() {
    return (
      <Navbar className={styles.cointain}>
        <Nav>
          <NavItem componentClass="span">
            <Pagination
              bsSize="small"
              first
              last
              boundaryLinks
              activePage={this.props.currentPage}
              items={ (this.props.blogs.length === 0) ? 1 : Math.ceil(this.props.blogs.length / 10)}
              maxButtons={5}
              onSelect={this.hanldePage}
            />
          </NavItem>
        </Nav>
        <Nav>
          <NavDropdown title={this.props.topic} id="basic-nav-dropdown">
            {
              this.props.topics.map((topic, index) => (
                <MenuItem key={index} onClick={() => this.chooseTopic(topic)}>{topic.title}</MenuItem>
              ))
            }
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentPage: getCurrentPage(state),
    topics: getTopics(state),
    blogs: getBlogs(state),
    topic: getTopic(state),
  };
}

BlogNavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  blogs: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  topic: PropTypes.string.isRequired,
};

BlogNavBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(BlogNavBar);
