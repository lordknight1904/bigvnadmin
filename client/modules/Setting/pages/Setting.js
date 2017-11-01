import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingNavBar from '../components/SettingNavBar/SettingNavBar';
import SettingList from '../components/SettingList/SettingList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel } from 'react-bootstrap';
import { createSetting, fetchSettings, modifySetting } from '../SettingActions';
import { getCurrentPage } from '../SettingReducer';
import { setNotify } from '../../App/AppActions';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      settingName: '',
      value: '',
      createSetting: false,
      creatingSetting: false,

      modifyId: '',
      modifyName: '',
      modifyValue: '',
      modifySetting: false,
      modifyingSetting: false,
    };
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    }
  }
  onSubmit = () => {
    if (this.state.settingName.trim() === '') {
      this.props.dispatch(setNotify('Tên Cấu hình không được trống'));
      return;
    }
    if (this.state.value.trim() === '') {
      this.props.dispatch(setNotify('Giá trị Cấu hình không được trống'));
      return;
    }
    const setting = {
      name: this.state.settingName,
      value: this.state.value,
    };
    this.setState({ createSetting: true });
    this.props.dispatch(createSetting(setting)).then((res) => {
      console.log(res);
      this.props.dispatch(fetchSettings(this.props.currentPage - 1));
      this.setState({
        creatingSetting: false,
        createSetting: false,
        name: '',
        value: '',
      });
    });
  };
  onCreateSetting = () => {
    this.setState({ createSetting: true });
  };
  hideCreateSetting = () => {
    this.setState({ createSetting: false });
  };
  handleSettingName = (event) => {
    this.setState({ settingName: event.target.value.trim() });
  };
  handleSettingValue = (event) => {
    this.setState({ value: event.target.value });
  };

  onModify = () => {
    const setting = {
      id: this.state.modifyId,
      value: this.state.modifyValue,
    };
    this.setState({ modifyingSetting: true });
    this.props.dispatch(modifySetting(setting)).then((res) => {
      this.props.dispatch(fetchSettings(this.props.currentPage - 1));
      this.setState({ modifyingSetting: false, modifySetting: false, });
    });
  };
  hideModifySetting = () => {
    this.setState({ modifySetting: false });
  };
  handleModifyValue = (event) => {
    this.setState({ modifyValue: event.target.value });
  };
  modifyDialog = (setting) => {
    this.setState({ modifySetting: true, modifyId: setting._id, modifyName: setting.name, modifyValue: setting.value });
  };
  render() {
    return (
      <div>
        <Row>
          <SettingNavBar onCreateSetting={this.onCreateSetting} />
        </Row>
        <Row style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <SettingList modifyDialog={this.modifyDialog} />
        </Row>

        <Modal
          show={this.state.createSetting}
          onHide={this.hideCreateSetting}
        >
          <Modal.Header>
            <Modal.Title>Thêm cấu hình mới</Modal.Title>
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
                    value={this.state.settingName}
                    onChange={this.handleSettingName}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Giá trị
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    onChange={this.handleSettingValue}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateSetting} disabled={this.state.creatingSetting}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.creatingSetting}>Tạo</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modifySetting}
          onHide={this.hideModifySetting}
        >
          <Modal.Header>
            <Modal.Title>Chỉnh sửa cấu hình</Modal.Title>
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
                    defaultValue={this.state.modifyName}
                    disabled
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Giá trị
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.modifyValue}
                    onChange={this.handleModifyValue}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModifySetting} disabled={this.state.modifyingSetting}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onModify} disabled={this.state.modifyingSetting}>Sửa</Button>
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
Setting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
Setting.contextTypes = {
  router: PropTypes.object,
};
export default connect(mapStateToProps)(Setting);
