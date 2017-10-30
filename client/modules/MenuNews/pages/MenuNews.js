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

      title: '',
      metaKeyword: '',
      metaDescription: '',
      description: '',
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
      title: this.state.title,
      metaKeyword: this.state.metaKeyword,
      metaDescription: this.state.metaDescription,
      description: this.state.description,
    };
    this.setState({ isCreatingMenuNews: true });
    this.props.dispatch(createMenuNews(category)).then((res) => {
      this.setState({
        isCreatingMenuNews: false,
        isCreateMenuNews: false,
        title: '',
        metaKeyword: '',
        metaDescription: '',
        description: '',
      });
      this.props.dispatch(fetchMenuNews(this.props.currentPage - 1));
    });
  };

  handleTitle = (event) => { this.setState({ title: event.target.value }); };
  handleMetaDescription = (event) => { this.setState({ metaDescription: event.target.value }); };
  handleMetaKeyword = (event) => { this.setState({ metaKeyword: event.target.value }); };
  handleDescription = (event) => { this.setState({ description: event.target.value }); };

  handleEditMenuName = (event) => {
    this.setState({ editMenuName: event.target.value });
  };
  onEdit = (editMenu) => {
    this.setState({ isEdit: true, editMenuId: editMenu._id, editMenuName: editMenu.title });
  };
  hideEdit = () => {
    this.setState({ isEdit: false, editMenuId: '', editMenuName: '' });
  };
  onSubmitEdit = () => {
    if (this.state.editMenuId !=='' && this.state.editMenuName !== '') {
      const category = {
        title: this.state.editMenuName,
        id: this.state.editMenuId,
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
        <Row>
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
                <Col componentClass={ControlLabel} sm={2}>
                  Tên danh mục
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.title}
                    onChange={this.handleTitle}
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
