import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BannerNavBar from '../components/BannerNavBar/BannerNavBar';
import BannerList from '../components/BannerList/BannerList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { deleteAdmin, recoverAdmin, createBanner, fetchBanners, uploadBanner } from '../BannerActions';
import { getSearch, getCurrentPage } from '../BannerReducer';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false,
      isCreating: false,

      description: '',
      name: '',
      link: '',
      imageDirectory: '',
      imagePreview: '',

      isPreview: false,
      preview: '',
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };
  onCreate = () => {
    this.setState({ isCreate: true });
  };
  hideCreate = () => {
    this.setState({ isCreate: false });
  };
  onSubmit = () => {
    if (this.state.name === '' ||
        this.state.description === '' ||
        this.state.link === ''
    ) return;
    const banner = {
      name: this.state.name,
      description: this.state.description,
      link: this.state.link,
      base64image: this.state.imagePreview,
    };
    this.props.dispatch(createBanner(banner)).then((res) => {
      this.setState({
        description: '',
        name: '',
        link: '',
        imageDirectory: '',
        imagePreview: '',
        isCreate: false
      });
      this.props.dispatch(fetchBanners(this.props.search, this.props.currentPage - 1));
    });
  };
  handleName = (event) => { this.setState({ name: event.target.value }); };
  handleLink = (event) => { this.setState({ link: event.target.value }); };
  handleDescription = (event) => { this.setState({ description: event.target.value }); };
  onUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let base64image = null;
    reader.onload = (readerEvt) => {
      base64image = readerEvt.target.result;
    };
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreview: base64image,
      });
    };
    reader.readAsDataURL(file);
  };
  setPreview = (preview) => {
    this.setState({ preview, isPreview: true });
  };
  hidePreview = () => {
    this.setState({ isPreview: false });
  };
  render() {
    return (
      <div>
        <Row>
          <BannerNavBar onCreate={this.onCreate} />
        </Row>
        <Row style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <BannerList setPreview={this.setPreview} />
        </Row>

        <Modal
          show={this.state.isCreate}
          onHide={this.hideCreate}
        >
          <Modal.Header>
            <Modal.Title>Tạo Banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Tên
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.handleName}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Link
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.link}
                    onChange={this.handleLink}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Mô tả
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.description}
                    onChange={this.handleDescription}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Hình ảnh
                </Col>
                <Col sm={10}>
                  <Button block style={{ padding: '0', zIndex: '-1' }}>
                    <label htmlFor="createBannerFileUpload" style={{ width: '100%', padding: '6px 12px', zIndex: '1' }}>
                      Chọn hình
                    </label>
                  </Button>
                  <input id="createBannerFileUpload" accept="image/jpeg, image/png" type="file" style={{ display: 'none' }} onChange={this.onUpload} />
                </Col>
                {
                  (this.state.imagePreview !== '') ? (
                    <div style={{ display: 'block', textAlign: 'center' }}>
                      <img width={300} height={300} src={this.state.imagePreview} />
                    </div>
                  ) : ''
                }
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreate}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit}>Tạo</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isPreview}
          onHide={this.hidePreview}
        >
          <Modal.Header>
            <Modal.Title>Preview hình</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img role="presentation" style={{ width: '100%' }} src={`/banner/${this.state.preview}`} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hidePreview}>Thoát</Button>
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
    search: getSearch(state),
    currentPage: getCurrentPage(state),
  };
}

Banner.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

Banner.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Banner);
