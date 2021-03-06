import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuNewsNavBar from '../components/MenuNewsNavBar/MenuNewsNavBar';
import MenuNewsList from '../components/MenuNewsList/MenuNewsList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { fetchMenuNews, createMenuNews, updateCategory } from '../MenuNewsActions';
import { getSearch, getCurrentPage } from '../MenuNewsReducer';
import { setNotify } from '../../App/AppActions';

class MenuNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateMenuNews: false,
      isCreatingMenuNews: false,

      name: '',
      title: '',
      metaKeyword: '',
      metaDescription: '',

      isEdit: false,
      editMenuId: '',
      editMenuName: '',
      editMenuTitle: '',
      editMenuMetaKeyword: '',
      editMenuMetaDescription: '',
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  onCreateMenuNews = () => {
    this.setState({ isCreateMenuNews: true });
  };
  hideCreateMenuNews = () => {
    this.setState({ isCreateMenuNews: false });
  };
  creatingMenuNews = () => {
    const category = {
      name: this.state.name,
      title: this.state.title,
      metaKeyword: this.state.metaKeyword,
      metaDescription: this.state.metaDescription,
    };
    this.setState({ isCreatingMenuNews: true });
    this.props.dispatch(createMenuNews(category)).then((res) => {
      this.setState({
        isCreatingMenuNews: false,
        isCreateMenuNews: false,
        name: '',
        title: '',
        metaKeyword: '',
        metaDescription: '',
      });
      this.props.dispatch(fetchMenuNews(this.props.currentPage - 1));
    });
  };

  handleName = (event) => { this.setState({ name: event.target.value }); };
  handleTitle = (event) => { this.setState({ title: event.target.value }); };
  handleMetaDescription = (event) => { this.setState({ metaDescription: event.target.value }); };
  handleMetaKeyword = (event) => { this.setState({ metaKeyword: event.target.value }); };

  handleEditMenuName = (event) => {
    this.setState({ editMenuName: event.target.value });
  };
  handleEditMenuTitle = (event) => {
    this.setState({ editMenuTitle: event.target.value });
  };
  handleEditMetaKeyword  = (event) => {
    this.setState({ editMenuMetaKeyword: event.target.value });
  };
  handleEditMetaDescription = (event) => {
    this.setState({ editMenuMetaDescription: event.target.value });
  };
  onEdit = (editMenu) => {
    this.setState({
      isEdit: true,
      editMenuId: editMenu._id,
      editMenuName: editMenu.name,
      editMenuTitle: editMenu.title,
      editMetaKeyword: editMenu.metaKeyword,
      editMetaDescription: editMenu.metaDescription,
    });
  };
  hideEdit = () => {
    this.setState({ isEdit: false, editMenuId: '', editMenuName: '' });
  };
  onSubmitEdit = () => {
    if (this.state.editMenuId !=='' && this.state.editMenuName !== '') {
      const category = {
        id: this.state.editMenuId,
        name: this.state.editMenuName,
        title: this.state.editMenuTitle,
        metaKeyword: this.state.editMenuMetaKeyword,
        metaDescription: this.state.editMenuMetaDescription,
      };
      this.setState({ editingMenu: true });
      this.props.dispatch(updateCategory(category)).then((res) => {
        if (res.category === 'success') {
          this.setState({ editingMenu: false, editMenuName: '', editMenuId: '', isEdit: false });
          this.props.dispatch(fetchMenuNews(this.props.currentPage - 1));
          this.props.dispatch(setNotify('Sửa tên Menu danh mục thành công'));
        } else {
          this.props.dispatch(setNotify('Sửa tên Menu danh mục không thành công'));
        }
      });
    }
  };
  render() {
    return (
      <div>
        <Row>
          <MenuNewsNavBar onCreateMenuNews={this.onCreateMenuNews}/>
        </Row>
        <Row style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <MenuNewsList onEdit={this.onEdit} />
        </Row>

        <Modal
          show={this.state.isCreateMenuNews}
          onHide={this.hideCreateMenuNews}
        >
          <Modal.Header>
            <Modal.Title>Tạo danh mục mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} md={2}>
                  Tên danh mục
                </Col>
                <Col md={10}>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.handleName}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} md={2}>
                  Tiêu đề danh mục
                </Col>
                <Col md={10}>
                  <FormControl
                    type="text"
                    value={this.state.title}
                    onChange={this.handleTitle}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Meta Keyword
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.metaKeyword}
                    onChange={this.handleMetaKeyword}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Meta Description
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.metaDescription}
                    onChange={this.handleMetaDescription}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateMenuNews} disabled={this.state.isCreatingMenuNews}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.creatingMenuNews} disabled={this.state.isCreatingMenuNews}>Tạo</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isEdit}
          onHide={this.hideEdit}
        >
          <Modal.Header>
            <Modal.Title>Sửa Menu bài viết</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên danh mục
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.editMenuName}
                    onChange={this.handleEditMenuName}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tiêu đề danh mục
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.editMenuTitle}
                    onChange={this.handleEditMenuTitle}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Meta Keyword
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.editMenuMetaKeyword}
                    onChange={this.handleEditMetaKeyword}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Meta Description
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.editMenuMetaDescription}
                    onChange={this.handleEditMetaDescription}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEdit} disabled={this.state.editingMenu}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmitEdit} disabled={this.state.editingMenu}>Sửa</Button>
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
    currentPage: getCurrentPage(state),
  };
}

MenuNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

MenuNews.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuNews);
