import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuBlogNavBar from '../components/MenuBlogNavBar/MenuBlogNavBar';
import MenuBlogList from '../components/MenuBlogList/MenuBlogList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { fetchMenuBlog, createMenuBlog, updateTopic } from '../MenuBlogActions';
import { getSearch, getCurrentPage } from '../MenuBlogReducer';
import { setNotify } from '../../App/AppActions';

class MenuBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateMenuBlog: false,
      isCreatingMenuBlog: false,

      name: '',
      title: '',
      metaKeyword: '',
      metaDescription: '',
      description: '',

      editMenuId: '',
      editMenuName: '',
      editMenuTitle: '',
      editMenuMetaKeyword: '',
      editMenuMetaDescription: '',
      editingMenu: false,
      isEdit: false,
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  onCreateMenuBlog = () => {
    this.setState({ isCreateMenuBlog: true });
  };
  hideCreateMenuBlog = () => {
    this.setState({ isCreateMenuBlog: false });
  };
  creatingMenuBlog = () => {
    const topic = {
      name: this.state.name,
      title: this.state.title,
      metaKeyword: this.state.metaKeyword,
      metaDescription: this.state.metaDescription,
    };
    this.setState({ isCreatingMenuBlog: true });
    this.props.dispatch(createMenuBlog(topic)).then((res) => {
      this.setState({ isCreatingMenuBlog: false, isCreateMenuBlog: false });
      this.props.dispatch(fetchMenuBlog(this.props.currentPage - 1))
    });
  };
  handleName = (event) => { this.setState({ name: event.target.value }); };
  handleTitle = (event) => { this.setState({ title: event.target.value }); };
  handleMetaKeyword = (event) => { this.setState({ metaKeyword: event.target.value }); };
  handleMetaDescription = (event) => { this.setState({ metaDescription: event.target.value }); };

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
      const menu = {
        id: this.state.editMenuId,
        name: this.state.editMenuName,
        title: this.state.editMenuTitle,
        metaKeyword: this.state.editMenuMetaKeyword,
        metaDescription: this.state.editMenuMetaDescription,
      };
      this.setState({ editingMenu: true });
      this.props.dispatch(updateTopic(menu)).then((res) => {
        if (res.topic === 'success') {
          this.setState({ editingMenu: false, editMenuName: '', editMenuId: '', isEdit: false });
          this.props.dispatch(fetchMenuBlog(this.props.currentPage - 1));
          this.props.dispatch(setNotify('Sửa tên Menu bài viết thành công'));
        } else {
          this.props.dispatch(setNotify('Sửa tên Menu bài viết không thành công'));
        }
      });
    }
  };
  render() {
    return (
      <div>
        <Row>
          <MenuBlogNavBar onCreateMenuBlog={this.onCreateMenuBlog}/>
        </Row>
        <Row style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <MenuBlogList onEdit={this.onEdit}/>
        </Row>

        <Modal
          show={this.state.isCreateMenuBlog}
          onHide={this.hideCreateMenuBlog}
        >
          <Modal.Header>
            <Modal.Title>Tạo danh mục mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Tên chuyên mục
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
            <Button onClick={this.hideCreateMenuBlog} disabled={this.state.isCreatingMenuBlog}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.creatingMenuBlog} disabled={this.state.isCreatingMenuBlog}>Tạo</Button>
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
                  Tên chuyên mục
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

MenuBlog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

MenuBlog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MenuBlog);
