import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewsNavBar from '../components/NewsNavBar/NewsNavBar';
import NewsList from '../components/NewsList/NewsList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { fetchNews, fetchCategories } from '../NewsActions';
import {  } from '../NewsReducer';
import { setNotify } from '../../App/AppActions';
import Preview from '../components/Preview/Preview';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSEO: false,
      seo: {},
      isInfo: false,
      info: {},
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    } else {
      this.props.dispatch(fetchNews('', 0));
      this.props.dispatch(fetchCategories());
    }
  }
  onSEO = (seo) => {
    this.setState({ isSEO: true, seo });
  };
  hideSEO = () => {
    this.setState({ isSEO: false, seo: {} });
  };
  onInfo = (info) => {
    this.setState({ isInfo: true, info });
  };
  hideInfo = () => {
    this.setState({ isInfo: false, info: {} });
  };
  render() {
    return (
      <div>
        <Row>
          <NewsNavBar/>
        </Row>
        <Row>
          <NewsList onSEO={this.onSEO} onInfo={this.onInfo} />
        </Row>

        <Modal
          show={this.state.isSEO}
          onHide={this.hideSEO}
        >
          <Modal.Header>
            <Modal.Title>Link SEO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            LINK: {this.state.seo.alias}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideSEO}>Thoát</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.isInfo}
          onHide={this.hideInfo}
        >
          <Modal.Header>
            <Modal.Title>Preview Tin</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: '80%' }}>
            <Preview info={this.state.info}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideInfo}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    id: getId(state),
  };
}

News.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

News.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(News);
