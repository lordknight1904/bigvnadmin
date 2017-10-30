import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DistrictNavBar from '../components/DistrictNavBar/DistrictNavBar';
import DistrictList from '../components/DistrictList/DistrictList';
import { getId } from '../../Login/LoginReducer';
import { Modal, Button, Form, FormGroup, FormControl, Col, Row, ControlLabel, Panel, HelpBlock } from 'react-bootstrap';
import { createDistrict, fetchDistricts, fetchCitiesAll, editDistrict } from '../DistrictActions';
import { getCurrentPage, getCityId } from '../DistrictReducer';
import { setNotify } from '../../App/AppActions';
import { getCities } from '../../City/CityReducer';

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      idSelected: '',
      show: false,
      message: '',

      districtName: '',
      cityId: '',
      createDistrict: false,
      creatingDistrict: false,

      editDistrictId: '',
      editDistrictName: '',
      editingDistrict: false,
      isEdit: false,
    }
  }
  componentWillMount() {
    if (this.props.id === '') {
      this.context.router.push('/');
    } else {
      this.props.dispatch(fetchCitiesAll());
    }
  }
  showDialog = (type, id) => {
    this.setState({ show: true, type, idSelected: id });
  };

  onCreateDistrict = () => {
    this.setState({ createDistrict: true });
  };
  hideCreateDistrict = () => {
    this.setState({ createDistrict: false });
  };
  handleDistrictName = (event) => {
    this.setState({ districtName: event.target.value });
  };
  handleEditDistrictName = (event) => {
    this.setState({ editDistrictName: event.target.value });
  };
  onSubmit = () => {
    if (this.state.districtName.trim() === '') {
      this.props.dispatch(setNotify('Tên Tỉnh/Thành không được trống'));
      return;
    }
    const district = {
      cityId: this.state.cityId,
      name: this.state.districtName,
    };
    this.setState({ createDistrict: true });
    this.props.dispatch(createDistrict(district)).then(() => {
      if (this.props.cityId && this.props.cityId !== '') {
        this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
      }
      this.setState({ creatingDistrict: false, createDistrict: false  });
    });
  };
  onCity = (event) => {
    this.setState({ cityId: event.target.value });
  };
  onEdit = (editDistrict) => {
    this.setState({ isEdit: true, editDistrictId: editDistrict._id, editDistrictName: editDistrict.name });
  };
  hideEdit = () => {
    this.setState({ isEdit: false, editDistrictId: '', editDistrictName: '' });
  };
  onSubmitEdit = () => {
    if (this.state.editDistrictId !=='' && this.state.editDistrictName !== '') {
      const district = {
        name: this.state.editDistrictName,
        id: this.state.editDistrictId,
      };
      this.setState({ editingDistrict: true });
      this.props.dispatch(editDistrict(district)).then((res) => {
        if (res.district === 'success') {
          this.setState({ editingDistrict: false, editDistrictName: '', editDistrictId: '', isEdit: false });
          this.props.dispatch(fetchDistricts(this.props.cityId, this.props.currentPage - 1));
          this.props.dispatch(setNotify('Sửa tên Quận/Huyện thành công'));
        } else {
          this.props.dispatch(setNotify('Sửa tên Quận/Huyện không thành công'));
        }
      });
    }
  };
  render() {
    return (
      <div>
        <Row>
          <DistrictNavBar onCreateDistrict={this.onCreateDistrict} />
        </Row>
        <Row>
          <DistrictList showDialog={this.showDialog} onEdit={this.onEdit} />
        </Row>

        <Modal
          show={this.state.createDistrict}
          onHide={this.hideCreateDistrict}
        >
          <Modal.Header>
            <Modal.Title>Thêm Quận/Huyện mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Thuộc Tỉnh/Thành
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" onChange={this.onCity} >
                    <option value=''>Chọn Tỉnh/Thành</option>
                    {
                      this.props.cities.map((city, index) => (
                        <option key={index} value={city._id}>{city.name}</option>
                      ))
                    }
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên Quận/huyện
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.districtName}
                    onChange={this.handleDistrictName}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideCreateDistrict} disabled={this.state.creatingDistrict}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmit} disabled={this.state.creatingDistrict}>Tạo</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isEdit}
          onHide={this.hideEdit}
        >
          <Modal.Header>
            <Modal.Title>Sửa Quận/Huyện</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Tên Quận/Huyện
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.editDistrictName}
                    onChange={this.handleEditDistrictName}
                  />
                </Col>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEdit} disabled={this.state.editingDistrict}>Hủy</Button>
            <Button bsStyle="primary" onClick={this.onSubmitEdit} disabled={this.state.editingDistrict}>Sửa</Button>
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
    cityId: getCityId(state),
    currentPage: getCurrentPage(state),
    cities: getCities(state),
  };
}

District.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
};

District.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(District);
